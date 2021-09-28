<template>
  <teleport :to="teleportTo || 'body'">
    <transition
      name="q-fade-up"
      @after-leave="afterLeave"
    >
      <div
        v-show="isShown"
        ref="messageBox"
        class="q-message-box-container"
        :class="wrapClass"
        :style="[wrapStyle, { zIndex }]"
        tabindex="-1"
        @keyup.esc="emitCloseEvent"
      >
        <div class="q-message-box-container__shadow" />

        <q-scrollbar
          theme="secondary"
          class="q-message-box-container__scrollbar"
          view-class="q-message-box-container__view"
          visible
        >
          <div
            v-if="closeOnClickShadow"
            class="q-message-box-container__clickable-shadow"
            @click="emitCloseEvent"
          />

          <div class="q-message-box-container__container">
            <button
              type="button"
              class="q-message-box-container__close q-icon-close"
              @click="emitCloseEvent"
            />

            <component
              :is="preparedContent.component"
              v-bind="preparedContent.props"
              v-on="preparedContent.listeners"
            />
          </div>
        </q-scrollbar>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  onMounted,
  nextTick,
  provide,
  onBeforeUnmount
} from 'vue';
import type { PropType } from 'vue';

import QScrollbar from '@/qComponents/QScrollbar';
import { isServer } from '@/qComponents/constants/isServer';
import { getConfig } from '@/qComponents/config';

import type { Nullable } from '#/helpers';

import { QMessageBoxContent } from '../QMessageBoxContent';
import { QMessageBoxAction } from '../constants';
import type { QMessageBoxEvent } from '../types';

import { isExternalComponent, isInternalComponent } from './utils';
import type {
  QMessageBoxComponent,
  QMessageBoxContainerPropContent,
  QMessageBoxContainerPropWrapClass,
  QMessageBoxContainerPropWrapStyle,
  QMessageBoxContainerPropBeforeClose,
  QMessageBoxContainerPropTeleportTo,
  QMessageBoxContainerProps,
  QMessageBoxContainerProvider,
  QMessageBoxContainerInstance
} from './types';

export default defineComponent({
  name: 'QMessageBoxContainer',
  componentName: 'QMessageBoxContainer',

  components: {
    QScrollbar
  },

  props: {
    content: {
      type: [Object, Function] as PropType<QMessageBoxContainerPropContent>,
      required: true
    },
    /**
     * whether QMessageBox can be closed by clicking the mask
     */
    closeOnClickShadow: {
      type: Boolean,
      default: true
    },
    /**
     * whether to distinguish canceling and closing the QMessageBox
     */
    distinguishCancelAndClose: {
      type: Boolean,
      default: false
    },
    /**
     * cancel focus on document.activeElement after QDrawer was closed
     */
    preventFocusAfterClosing: {
      type: Boolean,
      default: false
    },
    /**
     * class list of the QMessageBox
     */
    wrapClass: {
      type: [
        String,
        Object,
        Array
      ] as PropType<QMessageBoxContainerPropWrapClass>,
      default: null
    },
    /**
     * style list of the QMessageBox
     */
    wrapStyle: {
      type: [
        String,
        Object,
        Array
      ] as PropType<QMessageBoxContainerPropWrapStyle>,
      default: null
    },
    /**
     * callback before QMessageBox closes, and it will prevent QMessageBox from closing
     */
    beforeClose: {
      type: Function as unknown as PropType<QMessageBoxContainerPropBeforeClose>,
      default: null
    },
    /**
     * Specifies a target element where QMessageBox will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [
        String,
        isServer ? Object : HTMLElement
      ] as PropType<QMessageBoxContainerPropTeleportTo>,
      default: null
    }
  },

  emits: ['done', 'remove'],

  setup(props: QMessageBoxContainerProps, ctx): QMessageBoxContainerInstance {
    const instance = getCurrentInstance();

    const messageBox = ref<Nullable<HTMLElement>>(null);
    const isShown = ref<boolean>(false);
    const zIndex = getConfig('nextZIndex');

    const preparedContent = computed<QMessageBoxComponent>(() => {
      if (isExternalComponent(props.content)) {
        return { props: {}, listeners: {}, ...props.content };
      }

      if (isInternalComponent(props.content)) {
        return {
          component: QMessageBoxContent,
          props: props.content,
          listeners: {}
        };
      }

      return { component: props.content, props: {}, listeners: {} };
    });

    const elementToFocusAfterClosing: Nullable<HTMLElement> =
      document.activeElement as Nullable<HTMLElement>;

    const handleDocumentFocus = (e: FocusEvent): void => {
      const messageBoxValue = messageBox.value;
      if (
        messageBoxValue &&
        !messageBoxValue.contains(e.target as HTMLElement)
      ) {
        messageBoxValue.focus();
      }
    };

    const afterLeave = (): void => {
      ctx.emit('remove');
    };

    const commitBeforeClose = async (
      action: QMessageBoxAction
    ): Promise<boolean> => {
      let isReadyToClose = true;

      if (typeof props.beforeClose === 'function') {
        isReadyToClose = await props.beforeClose(action);
      }

      return isReadyToClose;
    };

    const emitDoneEvent = async ({
      action,
      payload = null
    }: QMessageBoxEvent): Promise<void> => {
      const isDone = await commitBeforeClose(action);

      if (isDone) ctx.emit('done', { action, payload });

      isShown.value = false;
    };

    const emitCloseEvent = (): void => {
      emitDoneEvent({
        action: props.distinguishCancelAndClose
          ? QMessageBoxAction.close
          : QMessageBoxAction.cancel
      });
    };

    onMounted(async () => {
      document.body.appendChild(instance?.vnode.el as Node);
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('focus', handleDocumentFocus, true);

      await nextTick();
      isShown.value = true;
      await nextTick();
      messageBox.value?.focus();
    });

    onBeforeUnmount(() => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('focus', handleDocumentFocus, true);
      if (!props.preventFocusAfterClosing) elementToFocusAfterClosing?.focus();
    });

    provide<QMessageBoxContainerProvider>('qMessageBoxContainer', {
      emitDoneEvent,
      emitCloseEvent
    });

    return {
      messageBox,
      zIndex,
      isShown,
      preparedContent,
      afterLeave,
      emitCloseEvent
    };
  }
});
</script>

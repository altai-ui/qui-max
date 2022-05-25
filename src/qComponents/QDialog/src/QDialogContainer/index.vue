<template>
  <teleport :to="teleportTo || 'body'">
    <transition
      name="q-fade-up"
      @after-leave="afterLeave"
    >
      <div
        v-show="isShown"
        class="q-dialog-container"
        :style="dialogStyle"
      >
        <div
          ref="dialog"
          tabindex="-1"
          class="q-dialog-container__wrapper"
          :class="customClass"
          @keyup.esc="emitCloseEvent"
        >
          <div class="q-dialog-container__content">
            <component
              :is="preparedContent.component"
              v-bind="preparedContent.props"
              v-on="preparedContent.listeners"
            />
          </div>
        </div>
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
  provide,
  nextTick,
  onMounted,
  onBeforeUnmount
} from 'vue';
import type { PropType } from 'vue';

import { getConfig } from '@/qComponents/config';
import { isServer } from '@/qComponents/constants/isServer';

import type { Nullable } from '#/helpers';

import { QDialogAction } from '../constants';
import type { QDialogComponent, QDialogEvent } from '../types';

import type {
  QDialogContainerPropContent,
  QDialogContainerPropBeforeClose,
  QDialogContainerPropTeleportTo,
  QDialogContainerProps,
  QDialogContainerInstance,
  QDialogContainerProvider
} from './types';
import { isExternalComponent } from './utils';

export default defineComponent({
  name: 'QDialogContainer',
  componentName: 'QDialogContainer',

  props: {
    content: {
      type: [Object, Function] as PropType<QDialogContainerPropContent>,
      required: true
    },
    /**
     * offset from top border of parent relative element
     */
    offsetTop: {
      type: [String, Number],
      default: null
    },
    /**
     * whether to distinguish canceling and closing the QDialog
     */
    distinguishCancelAndClose: {
      type: Boolean,
      default: false
    },
    /**
     * cancel focus on document.activeElement after QDialog was closed
     */
    preventFocusAfterClosing: {
      type: Boolean,
      default: false
    },
    /**
     * Extra class names for QDialog's wrapper
     */
    customClass: {
      type: String,
      default: null
    },
    /**
     * callback before QDialog closes, and it will prevent QDialog from closing
     */
    beforeClose: {
      type: Function as unknown as PropType<QDialogContainerPropBeforeClose>,
      default: null
    },
    /**
     * Specifies a target element where QDialog will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [
        String,
        isServer ? Object : HTMLElement
      ] as PropType<QDialogContainerPropTeleportTo>,
      default: null
    }
  },

  emits: ['done', 'remove'],

  setup(props: QDialogContainerProps, ctx): QDialogContainerInstance {
    const instance = getCurrentInstance();

    const dialog = ref<Nullable<HTMLElement>>(null);
    const isShown = ref<boolean>(false);
    const zIndex = getConfig('nextZIndex');

    const dialogStyle = computed<Record<string, Nullable<number | string>>>(
      () => ({
        zIndex,
        top: Number(props.offsetTop)
          ? `${Number(props.offsetTop)}px`
          : props.offsetTop
      })
    );

    const preparedContent = computed<QDialogComponent>(() => {
      if (isExternalComponent(props.content)) {
        return { props: {}, listeners: {}, ...props.content };
      }

      return { component: props.content, props: {}, listeners: {} };
    });

    const elementToFocusAfterClosing: Nullable<HTMLElement> =
      document.activeElement as Nullable<HTMLElement>;

    const handleDocumentFocus = (event: FocusEvent): void => {
      const dialogValue = dialog.value;
      if (dialogValue && !dialogValue.contains(event.target as HTMLElement)) {
        dialogValue.focus();
      }
    };

    const afterLeave = (): void => {
      ctx.emit('remove');
    };

    const commitBeforeClose = async (
      action: QDialogAction
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
    }: QDialogEvent): Promise<void> => {
      const isDone = await commitBeforeClose(action);

      if (isDone) ctx.emit('done', { action, payload });

      isShown.value = false;
    };

    const emitCloseEvent = (): void => {
      emitDoneEvent({
        action: props.distinguishCancelAndClose
          ? QDialogAction.close
          : QDialogAction.cancel
      });
    };

    onMounted(async () => {
      document.body.appendChild(instance?.vnode.el as Node);
      document.body.style.overflow = 'hidden';
      document.addEventListener('focus', handleDocumentFocus, true);

      await nextTick();
      isShown.value = true;
      await nextTick();
      dialog.value?.focus();
    });

    onBeforeUnmount(() => {
      document.body.style.overflow = '';
      document.removeEventListener('focus', handleDocumentFocus, true);
      if (!props.preventFocusAfterClosing) elementToFocusAfterClosing?.focus();
    });

    provide<QDialogContainerProvider>('qDialogContainer', {
      emitDoneEvent,
      emitCloseEvent
    });

    return {
      dialog,
      zIndex,
      isShown,
      dialogStyle,
      preparedContent,
      afterLeave,
      emitCloseEvent
    };
  }
});
</script>

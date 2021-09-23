<template>
  <teleport :to="teleportTo || 'body'">
    <transition
      name="q-fade-up"
      @after-leave="afterLeave"
    >
      <div
        v-show="isShown"
        class="q-dialog"
        :style="dialogStyle"
      >
        <div
          v-if="closeOnClickShadow"
          class="q-dialog__clickable-shadow"
          @click="emitCloseEvent"
        />

        <div
          ref="dialog"
          tabindex="-1"
          :style="containerStyle"
          class="q-dialog__container"
          :class="customClass"
          @keyup.esc="emitCloseEvent"
        >
          <div class="q-dialog__inner">
            <component
              :is="preparedContent.component"
              v-bind="preparedContent.props"
              v-on="preparedContent.listeners"
              @done="closeDialog"
            />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref
} from 'vue';
import type { PropType } from 'vue';

import { isServer } from '@/qComponents/constants/isServer';

import QButton from '@/qComponents/QButton';
import QScrollbar from '@/qComponents/QScrollbar';
import { getConfig } from '@/qComponents/config';
import type { Nullable } from '#/helpers';

import { QDialogAction } from '../constants';
import type { QDialogEvent } from '../types';

import { isExternalComponent } from './utils';
import type {
  QDialogContainerPropContent,
  QDialogContainerPropTeleportTo,
  QDialogContainerPropBeforeClose,
  QDialogContainerProps,
  QDialogContainerInstance,
  QDialogComponent,
  QDialogContainerProvider
} from './types';

const REMOVE_EVENT = 'remove';
const DONE_EVENT = 'done';

export default defineComponent({
  name: 'QDialogContainer',
  componentName: 'QDialogContainer',

  components: { QButton, QScrollbar },

  props: {
    content: {
      type: [Object, Function] as PropType<QDialogContainerPropContent>,
      required: true
    },
    /**
     * width of QDialog
     */
    width: {
      type: [String, Number],
      default: null
    },
    /**
     * offset from top border of parent relative element
     */
    offsetTop: {
      type: [String, Number],
      default: null
    },
    /**
     * closes QDialog by click on shadow layer
     */
    closeOnClickShadow: {
      type: Boolean,
      default: true
    },
    /**
     * whether to distinguish canceling and closing the QDialog
     */
    distinguishCancelAndClose: {
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
     * Specifies a target element where QDialog will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [
        String,
        isServer ? Object : HTMLElement
      ] as PropType<QDialogContainerPropTeleportTo>,
      default: null
    },
    /**
     * callback before QDialog closes, and it will prevent QDialog from closing
     */
    beforeClose: {
      type: Function as unknown as PropType<QDialogContainerPropBeforeClose>,
      default: null
    }
  },

  emits: [REMOVE_EVENT, DONE_EVENT],

  setup(props: QDialogContainerProps, ctx): QDialogContainerInstance {
    const instance = getCurrentInstance();

    const dialog = ref<Nullable<HTMLElement>>(null);
    const zIndex = getConfig('nextZIndex');
    const isShown = ref<boolean>(false);

    const dialogStyle = computed<Record<string, Nullable<number | string>>>(
      () => ({
        zIndex,
        top: Number(props.offsetTop)
          ? `${Number(props.offsetTop)}px`
          : props.offsetTop
      })
    );

    const containerStyle = computed<Record<string, Nullable<string | number>>>(
      () => ({
        width: Number(props.width) ? `${Number(props.width)}px` : props.width
      })
    );

    const preparedContent = computed<QDialogComponent>(() => {
      if (isExternalComponent(props.content)) {
        return {
          props: {},
          listeners: {},
          ...props.content
        };
      }

      return {
        component: props.content,
        props: {},
        listeners: {}
      };
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
      ctx.emit(REMOVE_EVENT);
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

    const closeDialog = async ({
      action,
      payload = null
    }: QDialogEvent): Promise<void> => {
      const isDone = await commitBeforeClose(action);

      if (isDone) ctx.emit(DONE_EVENT, { action, payload });

      isShown.value = false;
    };

    const emitCloseEvent = (): void => {
      closeDialog({
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
      elementToFocusAfterClosing?.focus();
    });

    provide<QDialogContainerProvider>('qDialogContainer', { emitCloseEvent });

    return {
      dialog,
      zIndex,
      isShown,
      dialogStyle,
      containerStyle,
      preparedContent,
      afterLeave,
      closeDialog,
      emitCloseEvent
    };
  }
});
</script>

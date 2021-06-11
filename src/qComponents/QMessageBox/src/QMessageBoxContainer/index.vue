<template>
  <transition
    name="q-fade-up"
    @after-leave="handleAfterLeave"
  >
    <div
      v-show="isShown"
      ref="messageBox"
      class="q-message-box"
      :class="wrapClass"
      :style="[wrapStyle, { zIndex }]"
      tabindex="-1"
      @keyup.esc="emitCloseEvent"
    >
      <div class="q-message-box__shadow" />

      <q-scrollbar
        theme="secondary"
        class="q-message-box__scrollbar"
        view-class="q-message-box__view"
        visible
      >
        <div
          v-if="closeOnClickShadow"
          class="q-message-box__clickable-shadow"
          @click="emitCloseEvent"
        />

        <div class="q-message-box__container">
          <button
            type="button"
            class="q-message-box__close q-icon-close"
            @click="emitCloseEvent"
          />

          <div class="q-message-box__title">
            {{ title }}
          </div>

          content
        </div>
      </q-scrollbar>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  onMounted,
  nextTick
} from 'vue';
import type { PropType } from 'vue';

import QScrollbar from '@/qComponents/QScrollbar';
import { getConfig } from '@/qComponents/config';

import { QMessageBoxAction } from '../constants';
import type { QMessageBoxEvent } from '../types';
import type {
  QMessageBoxContainerPropContent,
  QMessageBoxContainerPropWrapClass,
  QMessageBoxContainerPropWrapStyle,
  QMessageBoxContainerProps,
  QMessageBoxContainerInstance
} from './types';

const REMOVE_EVENT = 'remove';
const DONE_EVENT = 'done';

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
     * title of the QMessageBox
     */
    title: {
      type: String,
      default: null
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
    }
  },

  emits: [DONE_EVENT, REMOVE_EVENT],

  setup(props: QMessageBoxContainerProps, ctx): QMessageBoxContainerInstance {
    const instance = getCurrentInstance();

    const isShown = ref<boolean>(false);
    const messageBox = ref<HTMLElement | null>(null);
    const zIndex = getConfig('nextZIndex');

    const elementToFocusAfterClosing: HTMLElement | null =
      document.activeElement as HTMLElement | null;

    const handleAfterLeave = (): void => {
      ctx.emit(REMOVE_EVENT);
    };

    const handleDocumentFocus = (e: FocusEvent): void => {
      const messageBoxValue = messageBox.value;
      if (
        messageBoxValue &&
        !messageBoxValue.contains(e.target as HTMLElement)
      ) {
        messageBoxValue.focus();
      }
    };

    const closeBox = async ({
      action,
      payload = null
    }: QMessageBoxEvent): Promise<void> => {
      // let isReadyToClose = true;

      // if (typeof props.beforeClose === 'function') {
      //   isReadyToClose = await props.beforeClose({
      //     action,
      //     payload,
      //     ctx: {
      //       isConfirmBtnLoading,
      //       isCancelBtnLoading
      //     }
      //   });
      // }

      // if (isReadyToClose) {
      ctx.emit(DONE_EVENT, { action, payload });

      isShown.value = false;

      await nextTick();

      document.removeEventListener('focus', handleDocumentFocus, true);
      elementToFocusAfterClosing?.focus();
      // }
    };

    const emitCloseEvent = (): void => {
      closeBox({
        action: props.distinguishCancelAndClose
          ? QMessageBoxAction.close
          : QMessageBoxAction.cancel
      });
    };

    onMounted(async () => {
      document.body.appendChild(instance?.vnode.el as Node);

      await nextTick();
      isShown.value = true;
      await nextTick();
      messageBox.value?.focus();
    });

    return {
      messageBox,
      zIndex,
      isShown,
      emitCloseEvent,
      handleAfterLeave
    };
  }
});
</script>

<template>
  <teleport to="body">
    <transition
      name="q-msgbox-fade"
      @after-leave="handleAfterLeave"
    >
      <div
        v-show="modelValue"
        ref="messageBox"
        class="q-message-box"
        :class="wrapClass"
        :style="[wrapStyle, { zIndex: wrapZIndex }]"
        tabindex="-1"
        @keyup.esc="closeBox"
      >
        <div class="q-message-box__shadow" />

        <q-scrollbar
          v-if="isRendered"
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
            <div class="q-message-box__title">
              <slot name="title">{{ title }}</slot>
            </div>

            <button
              type="button"
              class="q-message-box__close q-icon-close"
              @click="emitCloseEvent"
            />

            <slot>
              <div class="q-message-box__content">
                <slot name="content">
                  <div
                    v-if="message || $slots.message"
                    class="q-message-box__message"
                  >
                    <slot name="message">{{ message }}</slot>
                  </div>

                  <div
                    v-if="submessage || $slots.submessage"
                    class="q-message-box__submessage"
                  >
                    <slot name="submessage">{{ submessage }}</slot>
                  </div>
                </slot>
              </div>

              <div
                v-if="isActionsSectionShown || $slots.actions"
                class="q-message-box__actions"
              >
                <slot name="actions">
                  <q-button
                    v-if="confirmButtonText"
                    :loading="isConfirmBtnLoading"
                    :disabled="isCancelBtnLoading"
                    @click="handleConfirmBtnClick"
                  >
                    {{ confirmButtonText }}
                  </q-button>

                  <q-button
                    v-if="cancelButtonText"
                    theme="secondary"
                    :loading="isCancelBtnLoading"
                    :disabled="isConfirmBtnLoading"
                    @click="handleCancelBtnClick"
                  >
                    {{ cancelButtonText }}
                  </q-button>
                </slot>
              </div>
            </slot>
          </div>
        </q-scrollbar>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
  PropType
} from 'vue';

import { getConfig } from '@/qComponents/config';

import type { QMessageBoxEvent, QMessageBoxBeforeClose } from './types';

const UPDATE_MODEL_EVENT = 'update:modelValue';
const CONFIRM_EVENT = 'confirm';
const CLOSE_EVENT = 'close';
const CANCEL_EVENT = 'cancel';

export default defineComponent({
  name: 'QMessageBox',
  componentName: 'QMessageBox',

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    /**
     * z-index of the QMessageBox
     */
    zIndex: {
      type: Number,
      default: null
    },
    /**
     * title of the QMessageBox
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * content of the QMessageBox
     */
    message: {
      type: String,
      default: ''
    },
    /**
     * subcontent of the QMessageBox
     */
    submessage: {
      type: String,
      default: ''
    },
    /**
     * text content of confirm button
     */
    confirmButtonText: {
      type: String,
      default: null
    },
    /**
     * text content of cancel button
     */
    cancelButtonText: {
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
     * callback before QMessageBox closes, and it will prevent QMessageBox from closing
     */
    beforeClose: {
      type: Function as PropType<
        (arg0: QMessageBoxBeforeClose) => Promise<boolean>
      >,
      default: null
    },
    /**
     * class list of the QMessageBox
     */
    wrapClass: {
      type: [String, Object, Array],
      default: null
    },
    /**
     * style list of the QMessageBox
     */
    wrapStyle: {
      type: [String, Object, Array],
      default: null
    }
  },

  emits: [UPDATE_MODEL_EVENT, CONFIRM_EVENT, CLOSE_EVENT, CANCEL_EVENT],

  setup(props, { emit }) {
    const isRendered = ref(false);
    const wrapZIndex = ref(props.zIndex);

    const isConfirmBtnLoading = ref(false);
    const isCancelBtnLoading = ref(false);
    const messageBox = ref<HTMLElement | null>(null);

    let elementToFocusAfterClosing: HTMLElement | null = null;

    const isActionsSectionShown = computed(
      () => Boolean(props.confirmButtonText) || Boolean(props.cancelButtonText)
    );

    watch(
      () => props.modelValue,
      newValue => {
        if (!newValue) return;

        isRendered.value = true;
        if (!props.zIndex) wrapZIndex.value = getConfig('nextZIndex') ?? 2000;

        elementToFocusAfterClosing = document.activeElement as HTMLElement;

        nextTick().then(() => {
          messageBox.value?.focus();
        });
      },
      { immediate: true }
    );

    const handleAfterLeave = () => {
      isRendered.value = false;
    };

    const handleDocumentFocus = (event: FocusEvent) => {
      const messageBoxValue = messageBox.value;
      if (
        messageBoxValue &&
        !messageBoxValue.contains(event.target as HTMLElement)
      ) {
        messageBoxValue.focus();
      }
    };

    const closeBox = async ({ action, payload = null }: QMessageBoxEvent) => {
      let isReadyToClose = true;

      if (typeof props.beforeClose === 'function') {
        isReadyToClose = await props.beforeClose({
          action,
          payload,
          ctx: {
            isConfirmBtnLoading,
            isCancelBtnLoading
          }
        });
      }

      if (isReadyToClose) {
        emit(action, payload);
        document.removeEventListener('focus', handleDocumentFocus, true);

        emit(UPDATE_MODEL_EVENT, false);

        nextTick().then(() => {
          elementToFocusAfterClosing?.focus();
        });
      }
    };

    const handleConfirmBtnClick = () => {
      closeBox({ action: CONFIRM_EVENT });
    };

    const handleCancelBtnClick = () => {
      closeBox({ action: CANCEL_EVENT });
    };

    const emitCloseEvent = () => {
      closeBox({
        action: props.distinguishCancelAndClose ? CLOSE_EVENT : CANCEL_EVENT
      });
    };

    onMounted(() => {
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('focus', handleDocumentFocus, true);
    });

    onBeforeUnmount(() => {
      document.documentElement.style.overflow = '';
    });

    return {
      wrapZIndex,
      isRendered,
      messageBox,
      isConfirmBtnLoading,
      isCancelBtnLoading,
      isActionsSectionShown,
      closeBox,
      handleAfterLeave,
      handleConfirmBtnClick,
      handleCancelBtnClick,
      emitCloseEvent
    };
  }
});
</script>

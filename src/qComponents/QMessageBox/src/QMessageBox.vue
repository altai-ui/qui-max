<template>
  <transition name="q-msgbox-fade">
    <div
      v-show="isShown"
      ref="messageBox"
      class="q-message-box"
      :class="wrapClass"
      :style="[wrapStyle, { zIndex: wrapZIndex }]"
      tabindex="-1"
      @keyup.esc="closeBox"
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
          <div class="q-message-box__title">
            {{ title }}
          </div>

          <button
            class="q-message-box__close q-icon-close"
            @click="emitCloseEvent"
          />
          <message-box-content
            v-if="isComponentUsed"
            v-bind="componentProps"
            @close="closeBox"
          />
          <template v-else>
            <div class="q-message-box__content">
              <template v-if="message">
                <div
                  v-if="!dangerouslyUseHTMLString"
                  class="q-message-box__message"
                >
                  {{ message }}
                </div>
                <div
                  v-else
                  class="q-message-box__message"
                  v-html="message"
                />
              </template>

              <div
                v-if="submessage"
                class="q-message-box__submessage"
              >
                {{ submessage }}
              </div>
            </div>

            <div
              v-if="isActionsSectionShown"
              class="q-message-box__actions"
            >
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
            </div>
          </template>
        </div>
      </q-scrollbar>
    </div>
  </transition>

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

import QButton from '@/qComponents/QButton';
import QScrollbar from '@/qComponents/QScrollbar';
import { getConfig } from '@/qComponents/config';

import type { QMessageBoxEvent, QMessageBoxBeforeClose } from './types';

export default defineComponent({
  name: 'QMessageBox',
  componentName: 'QMessageBox',

  components: {
    QButton,
    QScrollbar
  },

  props: {
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
     * whether message is treated as HTML string
     */
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: false
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
     * pass props to child component
     */
    componentProps: {
      type: Object,
      default: () => ({})
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

  setup(props) {
    const isShown = ref(false);
    const isComponentUsed = ref(false);
    const isConfirmBtnLoading = ref(false);
    const isCancelBtnLoading = ref(false);
    const messageBox = ref<HTMLElement | null>(null);
    const callback = ref<((arg0: QMessageBoxEvent) => void) | null>(null);

    let elementToFocusAfterClosing: HTMLElement | null = null;

    const isActionsSectionShown = computed(
      () => Boolean(props.confirmButtonText) || Boolean(props.cancelButtonText)
    );

    watch(
      () => isShown,
      current => {
        if (!current.value) return;

        console.log(document.activeElement);
        elementToFocusAfterClosing = document.activeElement as HTMLElement;

        nextTick().then(() => {
          messageBox.value?.focus();
        });
      },
      { immediate: true }
    );

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
        if (callback.value) callback.value({ action, payload });
        document.removeEventListener('focus', handleDocumentFocus, true);

        isShown.value = false;

        nextTick().then(() => {
          elementToFocusAfterClosing?.focus();
        });
      }
    };

    const handleConfirmBtnClick = () => {
      closeBox({ action: 'confirm' });
    };

    const handleCancelBtnClick = () => {
      closeBox({ action: 'cancel' });
    };

    const emitCloseEvent = () => {
      closeBox({
        action: props.distinguishCancelAndClose ? 'close' : 'cancel'
      });
    };

    onMounted(() => {
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('focus', handleDocumentFocus, true);
    });

    onBeforeUnmount(() => {
      document.documentElement.style.overflow = '';
    });

    const wrapZIndex = props.zIndex ?? getConfig('nextZIndex') ?? 2000;

    return {
      wrapZIndex,
      messageBox,
      isShown,
      isComponentUsed,
      isConfirmBtnLoading,
      isCancelBtnLoading,
      isActionsSectionShown,
      closeBox,
      handleConfirmBtnClick,
      handleCancelBtnClick,
      emitCloseEvent
    };
  }
});
</script>

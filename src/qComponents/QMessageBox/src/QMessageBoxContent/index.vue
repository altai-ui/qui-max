<template>
  <div class="q-message-box__title">
    <slot name="title">{{ title }}</slot>
  </div>

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
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import QButton from '@/qComponents/QButton';

import { QMessageBoxAction } from '../constants';

import type {
  QMessageBoxContentProps,
  QMessageBoxContentInstance
} from './types';

const DONE_EVENT = 'done';

export default defineComponent({
  name: 'QMessageBoxContent',
  componentName: 'QMessageBoxContent',

  components: { QButton },
  props: {
    /**
     * title of the QMessageBox
     */
    title: {
      type: String,
      default: null
    },
    /**
     * content of the QMessageBox
     */
    message: {
      type: String,
      default: null
    },
    /**
     * subcontent of the QMessageBox
     */
    submessage: {
      type: String,
      default: null
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
    }
  },

  emits: [DONE_EVENT],

  setup(props: QMessageBoxContentProps, ctx): QMessageBoxContentInstance {
    const isConfirmBtnLoading = ref<boolean>(false);
    const isCancelBtnLoading = ref<boolean>(false);

    const isActionsSectionShown = computed<boolean>(
      () => Boolean(props.confirmButtonText) || Boolean(props.cancelButtonText)
    );

    const handleConfirmBtnClick = (): void => {
      ctx.emit(DONE_EVENT, { action: QMessageBoxAction.confirm });
    };

    const handleCancelBtnClick = (): void => {
      ctx.emit(DONE_EVENT, { action: QMessageBoxAction.cancel });
    };

    return {
      isConfirmBtnLoading,
      isCancelBtnLoading,
      isActionsSectionShown,
      handleConfirmBtnClick,
      handleCancelBtnClick
    };
  }
});
</script>

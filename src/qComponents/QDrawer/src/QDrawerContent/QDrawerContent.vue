<template>
  <div class="q-drawer-content">
    <div class="q-drawer-content__title">
      <slot name="title">{{ title }}</slot>
    </div>

    <slot>
      <div class="q-drawer-content__content">
        <slot name="content">
          <div
            v-if="info || $slots.info"
            class="q-drawer-content__info"
          >
            <slot name="info">{{ info }}</slot>
          </div>
        </slot>
      </div>

      <div
        v-if="isActionsVisible || $slots.actions"
        class="q-drawer-content__actions"
      >
        <slot name="actions">
          <q-button
            theme="primary"
            @click="handleConfirmClick"
          >{{
            confirmButtonText
          }}</q-button>

          <q-button
            theme="secondary"
            @click="handleCancelClick"
          >{{
            cancelButtonText
          }}</q-button>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import QButton from '@/qComponents/QButton';

import type {
  QDrawerContentInstance,
  QDrawerParams
} from '@/qComponents/QDrawer/src/QDrawerContent';
import { QDrawerAction } from '@/qComponents/QDrawer/src/constants';
import { QDrawerContentPropBeforeClose } from './types';

export default defineComponent({
  name: 'QDrawerContent',
  componentName: 'QDrawerContent',

  components: { QButton },

  props: {
    title: {
      type: String,
      default: null
    },

    info: {
      type: String,
      default: null
    },

    confirmButtonText: {
      type: String,
      default: null
    },

    cancelButtonText: {
      type: String,
      default: null
    },

    beforeClose: {
      type: Function as unknown as PropType<QDrawerContentPropBeforeClose>,
      default: null
    }
  },

  emits: ['done'],

  setup(props: QDrawerParams, ctx): QDrawerContentInstance {
    const isActionsVisible = computed<boolean>(
      () => Boolean(props.confirmButtonText) || Boolean(props.cancelButtonText)
    );

    const commitBeforeClose = async (
      action: QDrawerAction
    ): Promise<boolean> => {
      let isReadyToClose = true;

      if (typeof props.beforeClose === 'function') {
        isReadyToClose = await props.beforeClose(action);
      }

      return isReadyToClose;
    };

    const handleConfirmClick = async (): Promise<void> => {
      const action = QDrawerAction.confirm;
      const isDone = await commitBeforeClose(action);

      if (isDone) ctx.emit('done', { action });
      // eslint-disable-next-line no-console
      console.log(action);
    };

    const handleCancelClick = async (): Promise<void> => {
      const action = QDrawerAction.cancel;
      const isDone = await commitBeforeClose(action);

      if (isDone) ctx.emit('done', { action });
      // eslint-disable-next-line no-console
      console.log(action);
    };

    return {
      isActionsVisible,
      handleConfirmClick,
      handleCancelClick
    };
  }
});
</script>

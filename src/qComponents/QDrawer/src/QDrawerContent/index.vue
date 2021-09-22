<template>
  <div class="q-drawer-content">
    <div class="q-drawer-content__header">
      <div class="q-drawer-content__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <button
        type="button"
        class="q-drawer-content__close q-icon-close"
        @click="handleClose"
      />
    </div>
    <q-scrollbar
      theme="secondary"
      class="q-drawer-content__scrollbar"
      view-class="q-drawer-content__view"
      visible
    >
      <div class="q-drawer-content__body">
        <slot />
      </div>
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import QScrollbar from '@/qComponents/QScrollbar';
import { QDrawerAction } from '../constants';
import type {
  QDrawerContentInstance,
  QDrawerContentPropBeforeClose,
  QDrawerContentProps
} from './types';

export default defineComponent({
  name: 'QDrawerContent',
  componentName: 'QDrawerContent',

  components: { QScrollbar },

  props: {
    title: {
      type: String,
      default: null
    },

    beforeClose: {
      type: Function as unknown as PropType<QDrawerContentPropBeforeClose>,
      default: null
    }
  },

  emits: ['done'],

  setup(props: QDrawerContentProps, ctx): QDrawerContentInstance {
    const commitBeforeClose = async (
      action: QDrawerAction
    ): Promise<boolean> => {
      let isReadyToClose = true;

      if (typeof props.beforeClose === 'function') {
        isReadyToClose = await props.beforeClose(action);
      }

      return isReadyToClose;
    };

    const handleClose = async (): Promise<void> => {
      const action = QDrawerAction.close;
      const isDone = await commitBeforeClose(action);

      if (isDone) ctx.emit('done', { action });
    };

    return {
      handleClose
    };
  }
});
</script>

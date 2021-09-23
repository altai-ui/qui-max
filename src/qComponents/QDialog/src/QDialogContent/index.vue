<template>
  <div class="q-dialog-content">
    <q-button
      class="q-dialog-content__close"
      circle
      theme="secondary"
      type="icon"
      icon="q-icon-close"
      @click="handleClose"
    />
    <div class="q-dialog-content__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <q-scrollbar
      theme="secondary"
      view-class="q-dialog-content__view"
    >
      <div class="q-dialog-content__body">
        <slot />
      </div>
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';

import QScrollbar from '@/qComponents/QScrollbar';
import QButton from '@/qComponents/QButton';

import { QDialogAction } from '../constants';

import type {
  QDialogContentProps,
  QDialogContentInstance,
  QDialogContentPropBeforeClose
} from './types';
import type { QDialogContainerProvider } from '../QDialogContainer/types';

export default defineComponent({
  name: 'QDialogContent',
  componentName: 'QDialogContent',

  components: { QScrollbar, QButton },

  props: {
    /**
     * title of the QDialog
     */
    title: {
      type: String,
      default: null
    },
    /**
     * callback before QDialog closes, and it will prevent QDialog from closing
     */
    beforeClose: {
      type: Function as unknown as PropType<QDialogContentPropBeforeClose>,
      default: null
    }
  },

  setup(props: QDialogContentProps): QDialogContentInstance {
    const commitBeforeClose = async (
      action: QDialogAction
    ): Promise<boolean> => {
      let isReadyToClose = true;

      if (typeof props.beforeClose === 'function') {
        isReadyToClose = await props.beforeClose(action);
      }

      return isReadyToClose;
    };

    const dialogContainer = inject<QDialogContainerProvider>(
      'QDialogContainer',
      {} as QDialogContainerProvider
    );

    const handleClose = async (): Promise<void> => {
      const action = QDialogAction.cancel;
      const isDone = await commitBeforeClose(action);

      if (isDone) dialogContainer?.emitCloseEvent();
    };

    return { handleClose };
  }
});
</script>

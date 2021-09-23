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
import { defineComponent, inject } from 'vue';
import { Nullable } from '#/helpers';

import QScrollbar from '@/qComponents/QScrollbar';
import QButton from '@/qComponents/QButton';

import type { QDialogContainerProvider } from '../QDialogContainer';
import type { QDialogContentInstance } from './types';

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
    }
  },

  setup(): QDialogContentInstance {
    const dialogContainer = inject<Nullable<QDialogContainerProvider>>(
      'qDialogContainer',
      null
    );

    const handleClose = async (): Promise<void> => {
      dialogContainer?.emitCloseEvent();
    };

    return { handleClose };
  }
});
</script>

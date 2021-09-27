<template>
  <q-button
    class="q-dialog-mobile-panel__close"
    circle
    theme="secondary"
    type="icon"
    icon="q-icon-close"
    @click="handleCloseBtnClick"
  />
  <component
    :is="panelComponent"
    :model-value="transformedToDate"
    class="q-dialog-mobile-panel__dialog-view"
    @pick="handlePick"
  />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

import { QButton } from '@/qComponents';

import { QDialogContent, QDialogAction } from '@/qComponents/QDialog';
import type { QDialogContainerProvider } from '@/qComponents/QDialog';
import type { MobilePanelInstance } from './types';
import type { QDatePickerPropModelValue, QDatePickerProvider } from '../types';

export default defineComponent({
  name: 'MobilePanel',

  components: { QDialogContent, QButton },

  emits: ['done'],

  setup(): MobilePanelInstance {
    const picker = inject<QDatePickerProvider>(
      'qDatePicker',
      {} as QDatePickerProvider
    );

    const dialog = inject<QDialogContainerProvider>(
      'qDialogContainer',
      {} as QDialogContainerProvider
    );

    const handlePick = (payload: QDatePickerPropModelValue): void => {
      dialog.emitDoneEvent({ action: QDialogAction.confirm, payload });
    };

    return {
      handleCloseBtnClick: dialog.emitCloseEvent,
      panelComponent: picker.panelComponent,
      transformedToDate: picker.transformedToDate,
      handlePick
    };
  }
});
</script>

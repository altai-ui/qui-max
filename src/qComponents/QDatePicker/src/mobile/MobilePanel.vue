<template>
  <q-button
    class="q-mobile-panel-close"
    circle
    theme="secondary"
    type="icon"
    icon="q-icon-close"
    @click="dialog.emitCloseEvent"
  />
  <component
    :is="picker.panelComponent.value"
    :model-value="picker.transformedToDate.value"
    class="q-picker-panel__dialog-view"
    @pick="handlePick"
  />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

import { QDialogContent, QDialogAction } from '@/qComponents/QDialog';

import type { QDialogContainerProvider } from '@/qComponents/QDialog';
import type { MobilePanelInstance } from './types';
import type { QDatePickerPropModelValue, QDatePickerProvider } from '../types';

export default defineComponent({
  name: 'MobilePanel',

  components: { QDialogContent },

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

    const handlePick = (val: QDatePickerPropModelValue): void => {
      dialog.close({ action: QDialogAction.confirm, payload: val });
    };

    return {
      dialog,
      picker,
      handlePick
    };
  }
});
</script>

<template>
  <q-dialog-content>
    <component
      :is="panelComponent"
      v-model="picker.transformedToDate.value"
      class="q-picker-panel__dialog-view"
      @pick="handleClick"
    />
  </q-dialog-content>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';

import { QDialogContent } from '@/qComponents/QDialog/src/QDialogContent';
import { QDialogAction } from '@/qComponents';
import type { QDatePickerPropModelValue, QDatePickerProvider } from '../types';
import type { QDialogContainerProvider } from '@/qComponents/QDialog/src/QDialogContainer';

import DatePanel from '../panel/Date/DatePanel.vue';
import DateRangePanel from '../panel/DateRange/DateRange.vue';
import MonthRangePanel from '../panel/MonthRange/MonthRange.vue';
import YearRangePanel from '../panel/YearRange/YearRange.vue';

export default defineComponent({
  name: 'MobilePanel',
  components: { QDialogContent },

  setup() {
    const picker = inject<QDatePickerProvider>(
      'qDatePicker',
      {} as QDatePickerProvider
    );

    const dialog = inject<QDialogContainerProvider>(
      'qDialogContainer',
      {} as QDialogContainerProvider
    );
    const panelComponent = computed<
      | typeof DateRangePanel
      | typeof MonthRangePanel
      | typeof YearRangePanel
      | typeof DatePanel
    >(() => {
      switch (picker.type.value) {
        case 'daterange':
          return DateRangePanel;
        case 'monthrange':
          return MonthRangePanel;
        case 'yearrange':
          return YearRangePanel;
        default:
          return DatePanel;
      }
    });

    const handleClick = (val: QDatePickerPropModelValue): void => {
      picker.handlePickClick(val);
      dialog.closeDialog({ action: QDialogAction.confirm, payload: val });
    };
    return {
      panelComponent,
      handleClick,
      picker
    };
  }
});
</script>

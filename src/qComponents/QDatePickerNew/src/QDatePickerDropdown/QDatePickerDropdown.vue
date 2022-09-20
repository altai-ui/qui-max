<template>
  <div class="q-date-picker-dropdown">
    <q-date-picker-panel
      :day="day"
      :month="month"
      :year="year"
      :view="view"
      @update:view="handleViewUpdate"
    >
      <component
        :is="component"
        :model-value="today"
      />
    </q-date-picker-panel>
  </div>
</template>

<script lang="ts">
import { addDays, getDate, getMonth, getYear } from 'date-fns';
import { computed, defineComponent, ref } from 'vue';

import { DatePickerPanelViewType } from '../constants';
import type { QDatePickerViewType } from '../types';

import QDatePickerPanel from './QDatePickerPanel';
import QDatePickerDayPanel from './QDatePickerPanel/QDatePiockerDayPanel';
import QDatePickerMonthPanel from './QDatePickerPanel/QDatePiockerMonthPanel';
import type { QDatePickerPanelComponent } from './types';

export default defineComponent({
  name: 'QDatePickerDropdown',

  componentName: 'QDatePickerDropdown',

  components: { QDatePickerDayPanel, QDatePickerPanel, QDatePickerMonthPanel },

  setup() {
    const today = addDays(new Date(), 1);
    const day = getDate(today);
    const year = getYear(today);
    const month = getMonth(today);

    const view = ref<QDatePickerViewType>(DatePickerPanelViewType.day);

    const component = computed<QDatePickerPanelComponent>(() => {
      // TODO: поменять кейс year, когда будет панель с годами
      switch (view.value) {
        case 'month':
          return QDatePickerMonthPanel;
        case 'day':
        case 'year':
          return QDatePickerDayPanel;
        default:
          return QDatePickerDayPanel;
      }
    });

    const handleViewUpdate = (value: QDatePickerViewType): void => {
      view.value = value;
    };

    return {
      component,
      today,
      day,
      year,
      month,
      view,
      handleViewUpdate
    };
  }
});
</script>

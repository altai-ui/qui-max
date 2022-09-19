<template>
  <div class="q-date-picker-dropdown">
    <q-date-picker-panel
      :day="day"
      :month="month"
      :year="year"
    >
      <component
        :is="QDatePickerDayPanel"
        :model-value="today"
      />
    </q-date-picker-panel>
  </div>
</template>

<script lang="ts">
import { addDays, getDate, getMonth, getYear } from 'date-fns';
import { defineComponent } from 'vue';

import QDatePickerPanel from './QDatePickerPanel';
import QDatePickerDayPanel from './QDatePickerPanel/QDatePiockerDayPanel';

export default defineComponent({
  name: 'QDatePickerDropdown',

  componentName: 'QDatePickerDropdown',

  components: { QDatePickerDayPanel, QDatePickerPanel },

  setup() {
    const today = addDays(new Date(), 1);
    const day = getDate(today);
    const year = getYear(today);
    const month = getMonth(today);

    return {
      QDatePickerDayPanel,
      today,
      day,
      year,
      month
    };
  }
});
</script>

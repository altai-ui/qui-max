<template>
  <div class="q-date-picker-year-panel">
    <table class="q-date-picker-year-panel__table">
      <tbody class="q-date-picker-year-panel__calendar">
        <tr
          v-for="row in rows"
          :key="row"
        >
          <td
            v-for="{ year, isToday, isSelected } in row"
            :key="year"
            class="q-date-picker-year-panel__cell"
          >
            <button
              class="q-date-picker-year-panel__year"
              :class="{
                'q-date-picker-year-panel__year_today': isToday,
                'q-date-picker-year-panel__year_selected': isSelected
              }"
            >
              {{ year }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { chunk, range } from 'lodash-es';
import { computed, defineComponent, PropType } from 'vue';

import type { QDatePickerYear, YearPanelPropModelValue } from './types';

export default defineComponent({
  name: 'QDatePickerDayPanel',

  componentName: 'QDatePickerDayPanel',

  props: {
    modelValue: {
      type: Date as PropType<YearPanelPropModelValue>,
      default: null
    }
  },

  setup() {
    const yearsArray = computed<QDatePickerYear[]>(() => {
      return range(2021, 2041).map(ye => ({ year: ye }));
    });

    const rows = computed<QDatePickerYear[][]>(() =>
      chunk(yearsArray.value, 4)
    );

    return {
      rows,
      daysArray: yearsArray
    };
  }
});
</script>

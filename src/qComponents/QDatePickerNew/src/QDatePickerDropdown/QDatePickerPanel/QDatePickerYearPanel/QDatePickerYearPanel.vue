<template>
  <div class="q-date-picker-year-panel">
    <table class="q-date-picker-year-panel__table">
      <tbody class="q-date-picker-year-panel__calendar">
        <tr
          v-for="row in rows"
          :key="row"
        >
          <td
            v-for="{ year, isCurrent, isSelected } in row"
            :key="year"
            class="q-date-picker-year-panel__cell"
          >
            <button
              class="q-date-picker-year-panel__year"
              :class="{
                'q-date-picker-year-panel__year_current': isCurrent,
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
import { addYears, getDecade } from 'date-fns';
import { chunk, range } from 'lodash-es';
import { computed, defineComponent, type PropType } from 'vue';

import type { QDatePickerYear, YearPanelPropModelValue } from './types';

const ADDITIONAL_YEARS_TO_DECADE = 18;

export default defineComponent({
  name: 'QDatePickerDayPanel',

  componentName: 'QDatePickerDayPanel',

  props: {
    modelValue: {
      type: Date as PropType<YearPanelPropModelValue>,
      default: null
    }
  },

  setup(props) {
    const yearsRange = computed<[number, number]>(() => {
      let date;

      if (!props.modelValue) date = new Date();
      else date = props.modelValue;

      const decade = getDecade(date);

      return [decade, addYears(date, ADDITIONAL_YEARS_TO_DECADE).getFullYear()];
    });

    const isCurrentYear = (year: number): boolean =>
      new Date().getFullYear() === year;
    const isSelected = (year: number): boolean =>
      props.modelValue?.getFullYear() === year;

    const yearsArray = computed<QDatePickerYear[]>(() => {
      return range(...yearsRange.value).map(ye => ({
        year: ye,
        isCurrent: isCurrentYear(ye),
        isSelected: isSelected(ye)
      }));
    });

    const rows = computed<QDatePickerYear[][]>(() =>
      chunk(yearsArray.value, 4)
    );

    return {
      rows
    };
  }
});
</script>

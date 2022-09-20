<template>
  <div class="q-date-picker-month-panel">
    <table class="q-date-picker-month-panel__table">
      <tbody class="q-date-picker-month-panel__calendar">
        <tr
          v-for="row in preparedRows"
          :key="row"
        >
          <td
            v-for="{ month, isSelected, isCurrent } in row"
            :key="month"
            class="q-date-picker-month-panel__cell"
          >
            <button
              class="q-date-picker-month-panel__month"
              :class="{
                'q-date-picker-month-panel__month_current': isCurrent,
                'q-date-picker-month-panel__month_selected': isSelected
              }"
            >
              {{ month }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { format } from 'date-fns';
import { chunk, range } from 'lodash-es';
import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';

import { getConfig } from '@/qComponents/config';

import { formatToLocalReadableString } from '../../../helpers';

import type { MonthPanelPropModelValue, QDatePickerMonth } from './types';

export default defineComponent({
  name: 'QDatePickerMonthPanel',

  componentName: 'QDatePickerMonthPanel',

  props: {
    modelValue: {
      type: Date as PropType<MonthPanelPropModelValue>,
      default: null
    }
  },

  setup(props) {
    const monthNames = range(12).map(monthIndex =>
      formatToLocalReadableString(
        new Date(new Date().getFullYear(), monthIndex, 1),
        'LLLL',
        getConfig('locale')
      ).toUpperCase()
    );

    const isCurrentMonth = (index: number): boolean => {
      if (!props.modelValue) return false;

      return (
        format(new Date(), 'LL.yyyy') ===
        format(
          new Date(
            props.modelValue.getFullYear(),
            index,
            props.modelValue.getDate()
          ),
          'LL.yyyy'
        )
      );
    };

    // TODO поправить функцию
    const isSelectedMonth = (index: number): boolean => {
      if (!props.modelValue) return false;

      return props.modelValue && props.modelValue.getMonth() === index;
    };

    const preparedRows = computed<QDatePickerMonth[][]>(() => {
      const months = monthNames.map((month, index) => ({
        month,
        isCurrent: isCurrentMonth(index),
        isSelected: isSelectedMonth(index)
      }));

      return chunk(months, 3);
    });

    return {
      preparedRows
    };
  }
});
</script>

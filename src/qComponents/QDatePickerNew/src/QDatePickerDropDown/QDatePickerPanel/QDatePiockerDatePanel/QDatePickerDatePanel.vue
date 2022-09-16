<template>
  <div class="q-date-picker-date-panel">
    <table cellspacing="0">
      <thead class="q-date-picker-date-panel__heading">
        <tr>
          <th
            v-for="name in dayNames"
            :key="name"
          >
            <div class="q-date-picker-date-panel__name">{{ name }}</div>
          </th>
        </tr>
      </thead>
      <tbody class="q-date-picker-date-panel__calendar">
        <tr
          v-for="row in rows"
          :key="row"
          class="q-date-picker-date-panel__row"
        >
          <td
            v-for="{ date, isAdditional } in row"
            :key="date"
            class="q-date-picker-date-panel__cell"
          >
            <div
              class="q-date-picker-date-panel__date"
              :class="{
                'q-date-picker-date-panel__date_additional': isAdditional
              }"
            >
              {{ date }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { endOfMonth, getDaysInMonth, startOfMonth } from 'date-fns';
import { chunk, range } from 'lodash-es';
import { computed, defineComponent } from 'vue';

import { DAYS_IN_WEEK, FIRST_DATE_OF_MONTH } from '../../../constants';

import { QDatePickerDay } from './types';

export default defineComponent({
  name: 'QDatePickerDatePanel',

  componentName: 'QDatePickerDatePanel',

  props: {
    day: {
      type: Number,
      default: null
    },
    month: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      default: null
    }
  },

  setup(props) {
    const dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

    const daysInMonth = computed<number>(() => getDaysInMonth(props.month));

    const firstDayInMonth = computed<number>(() =>
      startOfMonth(
        new Date(props.year, props.month, FIRST_DATE_OF_MONTH)
      ).getDay()
    );
    const lastDayInMonth = computed<number>(() =>
      endOfMonth(
        new Date(props.year, props.month, daysInMonth.value - 1)
      ).getDay()
    );

    const createAdditionalDaysArr = (
      days: number,
      slice: number[]
    ): QDatePickerDay[] =>
      range(days)
        .slice(...slice)
        .map(date => ({ date, isAdditional: true }));

    const prevMonthDays = computed<QDatePickerDay[]>(() => {
      if (!firstDayInMonth.value) return [];

      const numOfDays = DAYS_IN_WEEK - firstDayInMonth.value;

      const prevMonth = props.month === 0 ? 11 : props.month - 1;

      const daysInPrevMonth = getDaysInMonth(prevMonth);

      return createAdditionalDaysArr(daysInPrevMonth, [-numOfDays]);
    });

    const nextMonthDays = computed<QDatePickerDay[]>(() => {
      if (lastDayInMonth.value === 6) return [];

      const numOfDays = DAYS_IN_WEEK - lastDayInMonth.value;

      const nextMonth = props.month === 11 ? 0 : props.month + 1;

      const daysInNextMonth = getDaysInMonth(nextMonth);

      return createAdditionalDaysArr(daysInNextMonth, [0, numOfDays]);
    });

    const daysArray = computed<QDatePickerDay[]>(() => {
      const currentMonthDays: QDatePickerDay[] = range(
        1,
        daysInMonth.value
      ).map(date => ({ date }));

      return [
        ...prevMonthDays.value,
        ...currentMonthDays,
        ...nextMonthDays.value
      ];
    });

    const rows = computed<QDatePickerDay[][]>(() => chunk(daysArray.value, 7));

    return {
      dayNames,
      rows,
      daysArray
    };
  }
});
</script>

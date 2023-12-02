<template>
  <div class="q-date-picker-day-panel">
    <table class="q-date-picker-day-panel__table">
      <thead class="q-date-picker-day-panel__heading">
        <tr>
          <th
            v-for="name in dayNames"
            :key="name"
            class="q-date-picker-day-panel__cell q-date-picker-day-panel__cell_header"
          >
            <div class="q-date-picker-day-panel__name">{{ name }}</div>
          </th>
        </tr>
      </thead>
      <tbody class="q-date-picker-day-panel__calendar">
        <tr
          v-for="row in rows"
          :key="row"
        >
          <td
            v-for="{ date, isAdditional, isToday, isSelected } in row"
            :key="date"
            class="q-date-picker-day-panel__cell"
          >
            <button
              class="q-date-picker-day-panel__day"
              :class="{
                'q-date-picker-day-panel__day_additional': isAdditional,
                'q-date-picker-day-panel__day_today': isToday,
                'q-date-picker-day-panel__day_selected': isSelected
              }"
            >
              {{ date }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  endOfMonth,
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  getYear,
  Locale,
  startOfMonth
} from 'date-fns';
import { enGB as en, ru, zhHK as zh } from 'date-fns/locale';
import { chunk, range } from 'lodash-es';
import { computed, defineComponent, PropType } from 'vue';

import { getConfig } from '@/qComponents/config';

import { DAYS_IN_WEEK } from '../../../constants';

import type { QDatePickerDay, DatePanelPropModelValue } from './types';

const locales: Record<string, Locale> = { ru, en, zh };

export default defineComponent({
  name: 'QDatePickerDayPanel',

  componentName: 'QDatePickerDayPanel',

  props: {
    modelValue: {
      type: Date as PropType<DatePanelPropModelValue>,
      default: null
    }
  },

  setup(props) {
    const dayNames = computed<string[]>(() =>
      range(DAYS_IN_WEEK).map(day =>
        locales[getConfig('locale')]?.localize
          ?.day(day, { width: 'short' })
          .toUpperCase()
      )
    );

    const dateForeDisplaying = computed<Date>(
      () => props.modelValue ?? new Date()
    );

    const month = computed<number>(() => getMonth(dateForeDisplaying.value));
    const year = computed<number>(() => getYear(dateForeDisplaying.value));

    const daysInMonth = computed<number>(() =>
      getDaysInMonth(getMonth(dateForeDisplaying.value))
    );

    const firstDayInMonth = computed<number>(() =>
      startOfMonth(dateForeDisplaying.value).getDay()
    );
    const lastDayInMonth = computed<number>(() =>
      endOfMonth(dateForeDisplaying.value).getDay()
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

      const prevMonth =
        getMonth(dateForeDisplaying.value) === 0
          ? 11
          : getMonth(dateForeDisplaying.value) - 1;

      const daysInPrevMonth = getDaysInMonth(prevMonth);

      return createAdditionalDaysArr(daysInPrevMonth, [-numOfDays]);
    });

    const nextMonthDays = computed<QDatePickerDay[]>(() => {
      if (lastDayInMonth.value === 6) return [];

      const numOfDays = DAYS_IN_WEEK - lastDayInMonth.value;

      const nextMonth =
        getMonth(dateForeDisplaying.value) === 11
          ? 0
          : getMonth(dateForeDisplaying.value) + 1;

      const daysInNextMonth = getDaysInMonth(nextMonth);

      return createAdditionalDaysArr(daysInNextMonth, [0, numOfDays]);
    });

    const today = new Date();

    const isToday = (date: number): boolean =>
      format(today, 'dd.MM.yyyy') ===
      format(new Date(year.value, month.value, date), 'dd.MM.yyyy');
    const isSelected = (date: number): boolean =>
      getDate(dateForeDisplaying.value) === date;

    const daysArray = computed<QDatePickerDay[]>(() => {
      const currentMonthDays: QDatePickerDay[] = range(
        1,
        daysInMonth.value
      ).map(date => ({
        date,
        isToday: isToday(date),
        isSelected: isSelected(date)
      }));

      return [
        ...prevMonthDays.value,
        ...currentMonthDays,
        ...nextMonthDays.value
      ];
    });

    const rows = computed<QDatePickerDay[][]>(() => chunk(daysArray.value, 7));

    return {
      month,
      year,
      dayNames,
      rows,
      daysArray
    };
  }
});
</script>

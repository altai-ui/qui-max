<template>
  <table
    cellspacing="10"
    cellpadding="2"
    class="q-date-table"
  >
    <thead>
      <tr>
        <th
          v-for="day in days"
          :key="day"
          class="q-date-table__days"
        >
          {{ day }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, key) in rows"
        :key="key"
        class="q-date-table__row"
      >
        <td
          v-for="(cell, index) in row"
          :key="index"
          class="q-date-table__cell-wrapper"
        >
          <button
            :class="getCellClasses(cell)"
            type="button"
            tabindex="-1"
            @click="handleClick(cell)"
            @mouseenter="handleMouseMove(cell)"
          >
            {{ cell.text }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  isToday,
  Locale
} from 'date-fns';
import { throttle } from 'lodash-es';
import { ru, enGB as en } from 'date-fns/locale';
import { reactive, computed, PropType, inject, defineComponent } from 'vue';
import { getConfig } from '@/qComponents/config';
import { notNull } from '@/qComponents/helpers';
import { isDateInRangeInterval } from '../../helpers';
import type { DateTableInterface, DateTableState } from './DateTable';
import type { DateCellModel, RangeState, TableProps } from '../../Common';
import type { QDatePickerProvider } from '../../QDatePicker';
import checkDisabled from './checkDisabled';
import {
  DAYS_IN_WEEK,
  LAST_MONTH_IN_YEAR_INDEX,
  WEEK_FRONTIER
} from '../../panel/constants';

const locales: Record<string, Locale> = { ru, en };

export default defineComponent({
  name: 'QDatePickerDateTable',
  props: {
    year: {
      type: Number,
      default: new Date().getFullYear(),
      validator: notNull
    },
    month: {
      type: Number,
      default: new Date().getMonth(),
      validator: notNull
    },

    value: { type: Date, default: null },

    minDate: { type: Date, default: null },

    maxDate: { type: Date, default: null },

    rangeState: {
      type: Object as PropType<RangeState>,
      default: (): RangeState => ({
        hoveredDate: null,
        pickedDate: null,
        selecting: false
      })
    }
  },

  emits: ['pick', 'rangeSelecting'],

  setup(props: TableProps, ctx): DateTableInterface {
    const state = reactive<DateTableState>({
      lastRow: null,
      lastColumn: null,
      tableRows: [[], [], [], [], [], []]
    });

    const picker = inject<QDatePickerProvider>(
      'qDatePicker',
      {} as QDatePickerProvider
    );

    const offsetDay = computed<number>(() => {
      const firstDayOfWeek = picker.firstDayOfWeek.value;
      return firstDayOfWeek > WEEK_FRONTIER
        ? DAYS_IN_WEEK - firstDayOfWeek
        : -firstDayOfWeek;
    });

    const days = computed<string[]>(() => {
      const DAYS_OF_WEEK = [...Array(DAYS_IN_WEEK).keys()].map(i =>
        locales[getConfig('locale')]?.localize?.day(i, { width: 'short' })
      );

      const day = picker.firstDayOfWeek.value;
      return [...DAYS_OF_WEEK, ...DAYS_OF_WEEK].slice(day, day + DAYS_IN_WEEK);
    });

    const startMonthDate = computed<Date>(() =>
      startOfMonth(new Date(props.year, props.month, 1))
    );
    const endMonthDate = computed<Date>(() =>
      endOfMonth(new Date(props.year, props.month, 1))
    );

    const rows = computed<DateCellModel[][]>(() => {
      const date = new Date(props.year, props.month, 1);
      const firstDay = startMonthDate.value.getDay();
      const dateCountOfMonth = getDaysInMonth(date);
      const dateCountOfLastMonth = getDaysInMonth(
        new Date(
          props.year,
          props.month === 0 ? LAST_MONTH_IN_YEAR_INDEX : props.month - 1
        )
      );

      const offset = offsetDay.value;
      let count = 1;

      return state.tableRows.map((_, i) => {
        const newRow: DateCellModel[] = [];
        for (let j = 0; j < DAYS_IN_WEEK; j += 1) {
          const cell: DateCellModel = {
            row: i,
            column: j,
            type: 'normal',
            inRange: false,
            start: false,
            end: false,
            text: '',
            date: null,
            disabled: false
          };

          if (i === 0 || i === 1) {
            const numberOfDaysFromPreviousMonth =
              firstDay + offset < 0
                ? DAYS_IN_WEEK + firstDay + offset
                : firstDay + offset;

            if (j + i * DAYS_IN_WEEK >= numberOfDaysFromPreviousMonth) {
              cell.text = count;
              count += 1;
              cell.date = new Date(props.year, props.month, cell.text);
            } else {
              cell.text =
                dateCountOfLastMonth -
                (numberOfDaysFromPreviousMonth - (j % DAYS_IN_WEEK)) +
                1 +
                i * DAYS_IN_WEEK;
              cell.type = 'prev-month';
              cell.date = new Date(props.year, props.month - 1, cell.text);
            }
          } else if (count <= dateCountOfMonth) {
            cell.text = count;
            count += 1;
            cell.date = new Date(props.year, props.month, cell.text);
          } else {
            cell.text = count - dateCountOfMonth;
            count += 1;
            cell.type = 'next-month';
            cell.date = new Date(props.year, props.month + 1, cell.text);
          }

          if (props.minDate) {
            let minDateNum = props.minDate.getTime();
            let maxDateNum = props.maxDate?.getTime() ?? minDateNum;

            minDateNum = Math.min(minDateNum, maxDateNum);
            maxDateNum = Math.max(minDateNum, maxDateNum);

            cell.inRange = Boolean(
              minDateNum &&
                cell.date.getTime() >= minDateNum &&
                cell.date.getTime() <= maxDateNum
            );
          }

          if (isToday(cell.date)) {
            if (!['prev-month', 'next-month'].includes(cell.type)) {
              cell.type = 'today';
            }
          }

          cell.disabled = cell.date
            ? checkDisabled(cell.date, picker.disabledValues.value)
            : false;
          newRow.push(cell);
        }

        return newRow;
      });
    });

    const getCellClasses = (cell: DateCellModel): string[] => {
      const classes = ['cell', 'cell_date'];
      if (['today', 'prev-month', 'next-month'].includes(cell.type)) {
        classes.push(`cell_${cell.type}`);
      }

      if (
        ['normal', 'today'].includes(cell.type) &&
        props.value &&
        cell.date &&
        isSameDay(cell.date, props.value)
      ) {
        classes.push('cell_current');
      }

      if (
        cell.inRange ||
        (cell.date &&
          (isDateInRangeInterval(cell.date, props.rangeState) ||
            (picker.type.value === 'week' &&
              props.value &&
              isWithinInterval(cell.date, {
                start: startOfWeek(props.value, { weekStartsOn: 1 }),
                end: endOfWeek(props.value, { weekStartsOn: 1 })
              }))))
      ) {
        classes.push('cell_in-range');
      }

      if (cell.disabled) {
        classes.push('cell_disabled');
      }

      return classes;
    };

    const mouseMove = (cell: DateCellModel): void => {
      if (!props.rangeState.selecting || cell.disabled) return;
      ctx.emit('rangeSelecting', {
        selecting: true,
        hoveredDate: cell.date,
        pickedDate: props.minDate
      });
    };

    const handleMouseMove = throttle(mouseMove, 200);

    const handleClick = (cell: DateCellModel): void => {
      if (cell.disabled || cell.type === 'week') return;
      const newDate = cell.date;
      if (picker.type.value === 'daterange') {
        if (!props.rangeState.selecting) {
          ctx.emit('pick', {
            minDate: newDate,
            maxDate: null,
            rangeState: {
              pickedDate: newDate,
              hoveredDate: null,
              selecting: true
            }
          });
        } else {
          let dates;
          if (newDate && props.minDate && newDate >= props.minDate) {
            dates = { minDate: props.minDate, maxDate: newDate };
          } else {
            dates = { minDate: newDate, maxDate: props.minDate };
          }
          ctx.emit('pick', {
            ...dates,
            rangeState: {
              hoveredDate: null,
              pickedDate: null,
              selecting: false
            }
          });
        }
      } else if (picker.type.value === 'date') {
        ctx.emit('pick', newDate);
      } else if (picker.type.value === 'week') {
        const value = newDate
          ? startOfWeek(newDate, { weekStartsOn: 1 })
          : null;
        ctx.emit('pick', value);
      } else {
        ctx.emit('pick', newDate);
      }
    };

    return {
      state,
      offsetDay,
      days,
      rows,
      startMonthDate,
      endMonthDate,
      getCellClasses,
      handleMouseMove,
      handleClick
    };
  }
});
</script>

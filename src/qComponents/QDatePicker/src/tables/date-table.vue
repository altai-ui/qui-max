<template>
  <table
    cellspacing="10"
    cellpadding="2"
    class="q-date-table"
    @mousemove="handleMouseMove"
  >
    <thead>
      <tr>
        <th
          v-for="day in days"
          :key="day"
          class="q-date-table_days"
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
  isBefore,
  isAfter,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  isToday,
  isDate,
  Locale
} from 'date-fns';
import { ru, enGB as en } from 'date-fns/locale';
import { reactive, computed } from 'vue';
import { getConfig } from '@/qComponents/config';

import type { DateTableInterface, DateTableState, CellModel, RangeStateProp } from './types';

const locales: Record<string, Locale> = { ru, en };

const checkDisabled = (
  { date }: { date: null | Date },
  disabledValues: Record<string, Date>
): boolean => {
  if (!disabledValues) return false;
  const disabled = [];
  if (Array.isArray(disabledValues.ranges)) {
    disabledValues.ranges.forEach(({ start, end }) => {
      disabled.push(
        isWithinInterval(date, {
          start,
          end
        })
      );
    });
  }

  if (isDate(disabledValues.to) && disabledValues.to) {
    disabled.push(isBefore(date, disabledValues.to));
  }

  if (isDate(disabledValues.from) && disabledValues.from) {
    disabled.push(isAfter(date, disabledValues.from));
  }

  return disabled.some(Boolean);
};

export default {
  props: {
    firstDayOfWeek: {
      default: 1,
      type: Number
    },

    disabledValues: {
      type: Object,
      default: null
    },

    year: {
      type: Number,
      default: new Date().getFullYear()
    },
    month: {
      type: Number,
      default: new Date().getMonth()
    },

    modelValue: { type: Date, default: null },

    selectionMode: {
      type: String,
      default: 'date'
    },

    minDate: { type: Date, default: null },

    maxDate: { type: Date, default: null },

    rangeState: {
      type: Object,
      default: (): RangeStateProp => ({
        endDate: null,
        selecting: false
      })
    }
  },

  emits: ['changerange', 'pick'],

  setup(props, ctx): DateTableInterface {
    const state = reactive<DateTableState>({
      lastRow: null,
      lastColumn: null,
      tableRows: [[], [], [], [], [], []]
    });

    const offsetDay = computed(() => {
      const week = props.firstDayOfWeek;
      return week > 3 ? 7 - week : -week;
    });

    const days = computed(() => {
      const DAYS_OF_WEEK = [...Array(7).keys()].map(i => {
        return locales[getConfig('locale')]?.localize?.day(i, { width: 'short' });
      });

      const day = props.firstDayOfWeek;
      return [...DAYS_OF_WEEK, ...DAYS_OF_WEEK].slice(day, day + 7);
    });

    const startMonthDate = computed(() =>
      startOfMonth(new Date(props.year, props.month, 1))
    );
    const endMonthDate = computed(() =>
      endOfMonth(new Date(props.year, props.month, 1))
    );

    const rows = computed(() => {
      const date = new Date(props.year, props.month, 1);
      const firstDay = startMonthDate.value.getDay();
      const dateCountOfMonth = getDaysInMonth(date);
      const dateCountOfLastMonth = getDaysInMonth(
        new Date(props.year, props.month === 0 ? 11 : props.month - 1)
      );

      const offset = offsetDay.value;
      let count = 1;

      return state.tableRows.map((row, i) => {
        const newRow = [];
        for (let j = 0; j < 7; j += 1) {
          const cell: CellModel = {
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
              firstDay + offset < 0 ? 7 + firstDay + offset : firstDay + offset;

            if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
              cell.text = count;
              count += 1;
              cell.date = new Date(props.year, props.month, cell.text);
            } else {
              cell.text =
                dateCountOfLastMonth -
                (numberOfDaysFromPreviousMonth - (j % 7)) +
                1 +
                i * 7;
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

          let minDateNum = props.minDate?.getTime() ?? null;
          let maxDateNum = props.maxDate?.getTime() ?? minDateNum;
          if (props.rangeState.selecting) {
            maxDateNum = props.rangeState.endDate?.getTime() ?? null;
          }

          [minDateNum, maxDateNum] = [
            Math.min(minDateNum, maxDateNum),
            Math.max(minDateNum, maxDateNum)
          ];

          cell.inRange = Boolean(
            minDateNum &&
            cell.date.getTime() >= minDateNum &&
            cell.date.getTime() <= maxDateNum);

          if (isToday(cell.date)) {
            if (!['prev-month', 'next-month'].includes(cell.type)) {
              cell.type = 'today';
            }
          }

          cell.disabled = checkDisabled(cell, props.disabledValues);
          newRow.push(cell);
        }

        return newRow;
      });
    });

    const getCellClasses = (cell: CellModel): string[] => {
      const classes = ['cell', 'cell_date'];
      if (['today', 'prev-month', 'next-month'].includes(cell.type)) {
        classes.push(`cell_${cell.type}`);
      }

      if (
        ['normal', 'today'].includes(cell.type) &&
        props.modelValue && cell.date &&
        isSameDay(cell.date, props.modelValue)
      ) {
        classes.push('cell_current');
      }

      if (
        cell.inRange || (cell.date && (
        (props.minDate && isSameDay(cell.date, props.minDate)) ||
        (props.maxDate && isSameDay(cell.date, props.maxDate)) ||
        (props.selectionMode === 'week' &&
          props.modelValue &&
          isWithinInterval(cell.date, {
            start: startOfWeek(props.modelValue, { weekStartsOn: 1 }),
            end: endOfWeek(props.modelValue, { weekStartsOn: 1 })
          }))
        ))
      ) {
        classes.push('cell_in-range');
      }

      if (cell.disabled) {
        classes.push('cell_disabled');
      }

      return classes;
    };

    const handleMouseMove = (event: MouseEvent): void => {
      if (!props.rangeState.selecting) return;
      let target = event.target as HTMLElement;
      
      if (target.tagName === 'BUTTON') {
        target = target.parentNode;
      }

      if (target.tagName !== 'TD') return;

      const row = target.parentNode.rowIndex - 1;
      const column = target.cellIndex;
      // can not select disabled date
      if (rows.value[row]?.[column].disabled) return;

      // only update rangeState when mouse moves to a new cell
      // this avoids frequent Date object creation and improves performance
      if (row !== state.lastRow || column !== state.lastColumn) {
        state.lastRow = row;
        state.lastColumn = column;
        ctx.emit('changerange', {
          minDate: props.minDate,
          maxDate: props.maxDate,
          rangeState: {
            selecting: true,
            endDate: rows.value[row][column].date
          }
        });
      }
    };

    const handleClick = (cell: CellModel): void => {
      if (cell.disabled || cell.type === 'week') return;
      const newDate = cell.date;
      if (props.selectionMode === 'range') {
        if (!props.rangeState.selecting) {
          ctx.emit('pick', { minDate: newDate, maxDate: null, rangeState: {
            ...props.rangeState,
            selecting: true
          } });
        } else {
          let dates;
          if (newDate && newDate >= props.minDate) {
            dates = { minDate: props.minDate, maxDate: newDate };
          } else {
            dates = { minDate: newDate, maxDate: props.minDate };
          }
          ctx.emit('pick', { ...dates, rangeState: {
            ...props.rangeState,
            selecting: true
          } });
        }
      } else if (props.selectionMode === 'day') {
        ctx.emit('pick', newDate);
      } else if (props.selectionMode === 'datetime') {
        ctx.emit('pick', newDate, { hidePicker: false });
      } else if (props.selectionMode === 'week') {
        const value = newDate ? startOfWeek(newDate, { weekStartsOn: 1 }) : null;
        ctx.emit('pick', value);
      } else if (props.selectionMode === 'dates') {
        const value = props.modelValue || [];
        const newValue = [...value, newDate];
        ctx.emit('pick', newValue);
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
};
</script>

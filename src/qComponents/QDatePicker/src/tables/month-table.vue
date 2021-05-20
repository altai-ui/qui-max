<template>
  <table
    cellspacing="4"
    cellpadding="5"
    class="q-month-table"
    @mousemove="handleMouseMove"
  >
    <tr
      v-for="(row, index) in rows"
      :key="index"
    >
      <td
        v-for="(cell, key) in row"
        :key="key"
        class="q-month-table__cell-wrapper"
      >
        <button
          :class="getCellClasses(cell)"
          :disabled="cell.disabled"
          type="button"
          tabindex="-1"
          @click="handleMonthTableClick(cell)"
        >
          {{ getMonthName(cell.text) }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { startOfMonth, isSameMonth, isBefore, isAfter } from 'date-fns';
import { reactive, computed } from 'vue';
import { getConfig } from '@/qComponents/config';
import { formatLocalDate } from '../helpers';
import { RangeStateProp } from './types';

const checkDisabled = ({ date }: { date: Date }, disabledValues): boolean => {
  if (!disabledValues) return false;
  const disabled = [];
  if (Array.isArray(disabledValues.ranges)) {
    disabledValues.ranges.forEach(range => {
      disabled.push(
        (isSameMonth(date, range.start) || isBefore(range.start, date)) &&
          (isAfter(range.end, date) || isSameMonth(range.end, date))
      );
    });
  }

  if (disabledValues.to) {
    disabled.push(isBefore(date, disabledValues.to));
  }

  if (disabledValues.from) {
    disabled.push(isAfter(date, disabledValues.from));
  }

  return disabled.some(Boolean);
};

export default {
  props: {
    disabledValues: {
      type: Object,
      default: null
    },
    value: { type: [Date, String], default: null },
    selectionMode: {
      type: String,
      default: 'month'
    },
    minDate: { type: [Date, String], default: null },
    maxDate: { type: [Date, String], default: null },
    year: {
      type: [String, Number],
      default: new Date().getFullYear()
    },
    month: {
      type: [String, Number],
      default: new Date().getMonth()
    },
    rangeState: {
      type: Object,
      default: (): RangeStateProp => {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },

  emits: ['pick', 'changerange'],

  setup(props, ctx) {
    const state = reactive({
      tableRows: [[], [], []],
      lastRow: null,
      lastColumn: null
    });

    const rows = computed(() => {
      const tableRows = state.tableRows;
      return tableRows.map((row, i) => {
        const newRow = [];
        for (let j = 0; j < 4; j += 1) {
          const cell = {
            row: i,
            column: j,
            type: 'normal',
            inRange: false,
            start: false,
            end: false
          };
          cell.type = 'normal';

          const index = i * 4 + j;

          cell.text = index;
          cell.month = startOfMonth(new Date(props.year, index));
          cell.disabled = checkDisabled(
            { date: cell.month },
            props.disabledValues
          );

          let maxDate = state.maxDate;
          let minDate = state.minDate;

          if (props.rangeState.selecting) {
            maxDate = props.rangeState.endDate;
          }

          minDate = startOfMonth(minDate);
          maxDate = maxDate ? startOfMonth(maxDate) : minDate;

          [minDate, maxDate] = [
            Math.min(minDate, maxDate),
            Math.max(minDate, maxDate)
          ];

          cell.inRange =
            minDate &&
            cell.month.getTime() >= minDate &&
            cell.month.getTime() <= maxDate;

          if (isSameMonth(cell.month, new Date())) {
            cell.type = 'today';
          }

          newRow.push(cell);
        }

        return newRow;
      });
    })

    const getMonthName = (monthIndex: number): Date => {
      return formatLocalDate(
        new Date(props.year, monthIndex, 1),
        'MMM',
        getConfig('locale')
      );
    },

    const getCellClasses = (cell) => {
      const classes = ['cell', 'cell_month'];
      if (props.modelValue && isSameMonth(props.modelValue, cell.month))
        classes.push('cell_current');
      if (cell.type === 'today') classes.push('cell_today');

      if (cell.inRange) {
        classes.push('cell_in-range');
      }
      return classes;
    };

    const handleMouseMove = (event: MouseEvent): void => {
      if (!props.rangeState.selecting) return;

      let target = event.target;
      if (target.tagName === 'BUTTON') {
        target = target.parentNode;
      }

      if (target.tagName !== 'TD') return;

      const row = target.parentNode.rowIndex;
      const column = target.cellIndex;
      // can not select disabled date
      if (rows.value[row][column].disabled) return;

      // only update rangeState when mouse moves to a new cell
      // this avoids frequent Date object creation and improves performance
      if (row !== state.lastRow || column !== state.lastColumn) {
        state.lastRow = row;
        state.lastColumn = column;
        ctx.emit('pick', {
          minDate: state.minDate,
          maxDate: state.maxDate,
          rangeState: {
            selecting: true,
            endDate: new Date(props.year, row * 4 + column, 1)
          }
        });
      }
    },

    const handleMonthTableClick = (cell) => {
      if (cell.disabled) return;
      const month = cell.month.getMonth();
      const newDate = cell.month;
      if (props.selectionMode === 'range') {
        if (!props.rangeState.selecting) {
          ctx.emit('pick', {
            minDate: newDate,
            maxDate: null,
            rangeState: { ...props.rangeState, selecting: true }
          });
        } else if (newDate >= state.minDate) {
          ctx.emit('pick', {
            minDate: state.minDate,
            maxDate: newDate,
            rangeState: { ...props.rangeState, selecting: false }
          });
        } else {
          ctx.emit('pick', {
            minDate: newDate,
            maxDate: state.minDate,
            rangeState: { ...props.rangeState, selecting: false }
          });
        }
      } else {
        ctx.emit('pick', month, props.year);
      }
    }

    return {
      state,
      rows,
      getMonthName,
      handleMonthTableClick,
      getCellClasses,
      handleMouseMove
    }
  },
};
</script>

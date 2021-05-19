<template>
  <table
    cellspacing="4"
    cellpadding="5"
    class="q-year-table"
  >
    <tr
      v-for="(row, key) in rows"
      :key="key"
    >
      <td
        v-for="(cell, index) in row"
        :key="index"
        class="q-year-table__cell-wrapper"
        @mousemove="event => handleMouseMove(event, cell)"
        @click="event => handleYearTableClick(event, cell)"
      >
        <button
          :class="getCellClasses(cell)"
          :disabled="cell.disabled"
          type="button"
          tabindex="-1"
        >
          {{ cell.year.getFullYear() }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import {
  isSameYear,
  addYears,
  isDate,
  startOfMonth,
  startOfDecade,
  isBefore,
  isAfter
} from 'date-fns';
import { reactive, computed } from 'vue';

import type { YearTableState, YearTableInterface } from './types';

const checkDisabled = (year: number, disabledValues: Record<string, Date>): boolean => {
  if (!disabledValues) return false;
  const disabled = [];
  if (Array.isArray(disabledValues.ranges)) {
    disabledValues.ranges.forEach(range => {
      disabled.push(
        (isSameYear(year, range.start) || isBefore(range.start, year)) &&
          (isAfter(range.end, year) || isSameYear(range.end, year))
      );
    });
  }

  if (disabledValues.to) {
    disabled.push(isBefore(year, disabledValues.to));
  }

  if (disabledValues.from) {
    disabled.push(isAfter(year, disabledValues.from));
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
    year: { type: [String, Number], default: '' },
    selectionMode: {
      type: String,
      default: 'year'
    },
    minDate: { type: [Date, String], default: null },
    maxDate: { type: [Date, String], default: null },
    rangeState: {
      type: Object,
      default() {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },

  emits: ['changerange', 'pick'],

  setup(props, ctx): YearTableInterface {
    const state = reactive<YearTableState>({
      tableRows: [[], [], []],
      lastHoveredCell: null
    });

    const startYear = computed<Date>(() => {
      if (props.year) {
        return startOfDecade(new Date(this.year, 0, 1));
      }

      return startOfDecade(new Date());
    });

    const rows = computed(() => {
      let startYearValue = startYear.value;
      return state.tableRows.map((row, i) => {
        const newRow = [];
        const cellCount = i < 2 ? 4 : 2;
        for (let j = 0; j < cellCount; j += 1) {
          let maxDate = state.maxDate;
          let minDate = state.minDate;
          if (state.rangeState.selecting) {
            maxDate = state.rangeState.endDate;
          }

          minDate = startOfMonth(minDate);
          maxDate = maxDate ? startOfMonth(maxDate) : minDate;
          [minDate, maxDate] = [
            Math.min(minDate, maxDate),
            Math.max(minDate, maxDate)
          ];
          newRow.push({
            year: startYearValue,
            disabled: checkDisabled(startYearValue, props.disabledValues),
            inRange:
              minDate &&
              startYearValue.getTime() >= minDate &&
              startYearValue.getTime() <= maxDate
          });

          startYearValue = addYears(startYearValue, 1);
        }

        return newRow;
      });
    });

    const handleMouseMove = (event, { year }) => {
      // update data only different cell's hover
      if (event.target === state.lastHoveredCell) return;
      state.lastHoveredCell = event.target;
      if (!state.rangeState.selecting) return;
      ctx.emit('changerange', {
        minDate: state.minDate,
        maxDate: state.maxDate,
        rangeState: {
          selecting: true,
          endDate: year
        }
      });
    };

    const getCellClasses = (cell) => {
      const style = ['cell', 'cell_year'];
      if (props.selectionMode === 'year') {
        if (
          isDate(props.modelValue) &&
          props.modelValue.getFullYear() === cell.year.getFullYear()
        )
          style.push('cell_current');
        if (new Date().getFullYear() === cell.year.getFullYear())
          style.push('cell_today');
      } else {
        if (cell.inRange) style.push('cell_in-range');

        if (isSameYear(cell.year, new Date())) {
          style.push('cell_today');
        }
      }

      return style;
  };

    const handleYearTableClick = (event: MouseEvent, { year }: { year: number}): void => {
      if (props.selectionMode === 'range') {
        if (!state.rangeState.selecting) {
          ctx.emit('pick', {
            minDate: year,
            maxDate: null,
            rangeState: { selecting: true, end: null }
          });
        } else if (year.getTime() >= state.minDate.getTime()) {
          ctx.emit('pick', {
            minDate: state.minDate,
            maxDate: year,
            rangeState: { selecting: false, end: null }
          });
        } else {
          ctx.emit('pick', {
            minDate: year,
            maxDate: state.minDate,
            rangeState: { selecting: false, end: null }
          });
        }
      } else {
        ctx.emit('pick', year);
      }
    }

    return {
      state,
      startYear,
      rows,
      handleMouseMove,
      handleYearTableClick
    }
  },
};
</script>

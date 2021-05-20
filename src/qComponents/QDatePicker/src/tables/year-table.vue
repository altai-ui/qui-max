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
import { RangeStateProp , CellModel, YearRow } from "./types";


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
    year: { type: Number, default: null },
    selectionMode: {
      type: String,
      default: 'year'
    },
    minDate: { type: [Date, String], default: null },
    maxDate: { type: [Date, String], default: null },
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

  emits: ['pick'],

  setup(props, ctx): YearTableInterface {
    const state = reactive<YearTableState>({
      tableRows: [[], [], []],
      lastHoveredCell: null
    });

    const startYear = computed<Date>(() => {
      if (props.year) {
        return startOfDecade(new Date(props.year, 0, 1));
      }

      return startOfDecade(new Date());
    });

    const rows = computed<YearRow[]>(() => {
      let startYearValue = startYear.value;
      return state.tableRows.map((row, i) => {
        const newRow = [];
        const cellCount = i < 2 ? 4 : 2;
        for (let j = 0; j < cellCount; j += 1) {
          let maxDate = props.maxDate;
          let minDate = props.minDate;
          if (props.rangeState.selecting) {
            maxDate = props.rangeState.endDate;
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
            inRange: Boolean(
              minDate &&
              startYearValue.getTime() >= minDate &&
              startYearValue.getTime() <= maxDate)
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
      if (!props.rangeState.selecting) return;
      ctx.emit('pick', {
        minDate: props.minDate,
        maxDate: props.maxDate,
        rangeState: {
          selecting: true,
          endDate: year
        }
      });
    };

    const getCellClasses = (cell: CellModel) => {
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
        if (!props.rangeState.selecting) {
          ctx.emit('pick', {
            minDate: year,
            maxDate: null,
            rangeState: { selecting: true, end: null }
          });
        } else if (year.getTime() >= props.minDate.getTime()) {
          ctx.emit('pick', {
            minDate: props.minDate,
            maxDate: year,
            rangeState: { selecting: false, end: null }
          });
        } else {
          ctx.emit('pick', {
            minDate: year,
            maxDate: props.minDate,
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
      getCellClasses,
      handleMouseMove,
      handleYearTableClick
    }
  },
};
</script>

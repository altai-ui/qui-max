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
        @mousemove="event => handleMouseMove(cell)"
        @click="event => handleYearTableClick(cell)"
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
  startOfMonth,
  startOfDecade,
  isBefore,
  isAfter
} from 'date-fns';
import { reactive, computed, PropType } from 'vue';

import { throttle } from 'lodash';
import type { YearTableState, YearTableInstance, RangeState } from './types';
import { DateRangeStateProp, YearCellModel } from "./types";
import { isDateInRangeInterval } from './composition';


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
    value: { type: Date, default: null },
    year: { type: Number, default: null },
    selectionMode: {
      type: String,
      default: 'year'
    },
    minDate: { type: Date, default: null },
    maxDate: { type: Date, default: null },
    rangeState: {
      type: Object as PropType<RangeState>,
      default: (): RangeState => {
        return {
          hoveredDate: null,
          pickedDate: null,
          selecting: false
        };
      }
    }
  },

  emits: ['pick', 'rangeSelecting'],

  setup(props, ctx): YearTableInstance {
    const state = reactive<YearTableState>({
      tableRows: [[], [], []],
    });

    const startYear = computed<Date>(() => {
      if (props.year) {
        return startOfDecade(new Date(props.year, 0, 1));
      }

      return startOfDecade(new Date());
    });

    const rows = computed<YearCellModel[][]>(() => {
      let startYearDate = startYear.value;
      return state.tableRows.map((row, i) => {
        const newRow: YearCellModel[] = [];
        const cellCount = i < 2 ? 4 : 2;
        for (let j = 0; j < cellCount; j += 1) {
          let maxDateNum = props.maxDate?.getTime();
          let minDateNum = props.minDate?.getTime();

          minDateNum = startOfMonth(minDateNum).getTime();
          maxDateNum = maxDateNum ? startOfMonth(maxDateNum).getTime() : minDateNum;

          minDateNum = Math.min(minDateNum, maxDateNum);
          maxDateNum = Math.max(minDateNum, maxDateNum);
          newRow.push({
            year: startYearDate,
            disabled: checkDisabled(props.year, props.disabledValues),
            inRange: Boolean(
              minDateNum &&
              startYearDate.getTime() >= minDateNum &&
              startYearDate.getTime() <= maxDateNum)
          });

          startYearDate = addYears(startYearDate, 1);
        }

        return newRow;
      });
    });

    const mouseMove = (cell: YearCellModel): void => {
      if (!props.rangeState.selecting) return;
      if (cell.disabled) return;
      ctx.emit('rangeSelecting', {
        selecting: true,
        hoveredDate: cell.year,
        pickedDate: props.minDate
      });
    };

    const handleMouseMove = throttle(mouseMove, 200);

    const getCellClasses = (cell: YearCellModel): string[] => {
      const classes = ['cell', 'cell_year'];
      if (props.selectionMode === 'year') {
        if (
          props.value?.getFullYear() === cell.year.getFullYear()
        )
          classes.push('cell_current');
        if (new Date().getFullYear() === cell.year.getFullYear())
          classes.push('cell_today');
      } else {
        if (cell.inRange || cell.year && isDateInRangeInterval(cell.year, props.rangeState)) classes.push('cell_in-range');

        if (isSameYear(cell.year, new Date())) {
          classes.push('cell_today');
        }
      }

      return classes;
  };

    const handleYearTableClick = ({ year }: { year: Date }): void => {
      if (props.selectionMode === 'range') {
        if (!props.rangeState.selecting) {
          ctx.emit('pick', {
            minDate: year,
            maxDate: null,
            rangeState: {
              pickedDate: year,
              hoveredDate: null,
              selecting: true
            }
          });
        } else if (year.getTime() >= props.minDate.getTime()) {
          ctx.emit('pick', {
            minDate: props.minDate,
            maxDate: year,
            rangeState: { ...props.rangeState, selecting: false }
          });
        } else {
          ctx.emit('pick', {
            minDate: year,
            maxDate: props.minDate,
            rangeState: { ...props.rangeState, selecting: false }
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

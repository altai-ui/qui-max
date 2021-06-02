<template>
  <table
    cellspacing="4"
    cellpadding="5"
    class="q-period-table"
  >
    <tr
      v-for="(row, key) in rows"
      :key="key"
    >
      <td
        v-for="(cell, index) in row"
        :key="index"
        class="q-period-table__cell-wrapper"
      >
        <button
          :class="getCellClasses(cell)"
          :disabled="cell.disabled"
          type="button"
          tabindex="-1"
          @click="handleYearTableClick(cell)"
          @mousemove="handleMouseMove(cell)"
        >
          {{ cell.year.getFullYear() }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { isSameYear, addYears, startOfMonth, startOfDecade } from 'date-fns';
import { reactive, computed, PropType, inject, defineComponent } from 'vue';

import { throttle } from 'lodash-es';
import type {
  YearCellModel,
  YearTableState,
  YearTableInstance,
  YearTableProps
} from './YearTable';
import type { RangeState } from '../../Common';
import { checkDisabled, isDateInRangeInterval } from '../../helpers';
import { QDatePickerProvider } from '../../QDatePicker';

export default defineComponent({
  props: {
    value: { type: Date, default: null },
    year: { type: Number, default: null },
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

  setup(props: YearTableProps, ctx): YearTableInstance {
    const state = reactive<YearTableState>({
      tableRows: [[], [], []]
    });

    const picker = inject<QDatePickerProvider>(
      'qDatePicker',
      {} as QDatePickerProvider
    );

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
        let inRange = false;
        for (let j = 0; j < cellCount; j += 1) {
          if (props.minDate) {
            let minDateNum = props.minDate.getTime();
            let maxDateNum = props.maxDate?.getTime();

            minDateNum = startOfMonth(minDateNum).getTime();
            maxDateNum = maxDateNum
              ? startOfMonth(maxDateNum).getTime()
              : minDateNum;

            minDateNum = Math.min(minDateNum, maxDateNum);
            maxDateNum = Math.max(minDateNum, maxDateNum);

            inRange = Boolean(
              minDateNum &&
                startYearDate.getTime() >= minDateNum &&
                startYearDate.getTime() <= maxDateNum
            );
          }

          newRow.push({
            year: startYearDate,
            disabled: checkDisabled(
              startYearDate,
              picker.disabledValues.value,
              isSameYear
            ),
            inRange
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
      const classes = ['cell', 'cell_period'];
      if (picker.type.value === 'year') {
        if (
          props.value instanceof Date &&
          props.value?.getFullYear() === cell.year.getFullYear()
        )
          classes.push('cell_current');
        if (new Date().getFullYear() === cell.year.getFullYear())
          classes.push('cell_today');
      } else {
        if (
          cell.inRange ||
          (cell.year && isDateInRangeInterval(cell.year, props.rangeState))
        )
          classes.push('cell_in-range');

        if (isSameYear(cell.year, new Date())) {
          classes.push('cell_today');
        }
      }

      return classes;
    };

    const handleYearTableClick = ({ year }: { year: Date }): void => {
      if (picker.type.value === 'yearrange') {
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
        } else if (props.minDate && year.getTime() >= props.minDate.getTime()) {
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
    };

    return {
      state,
      startYear,
      rows,
      getCellClasses,
      handleMouseMove,
      handleYearTableClick
    };
  }
});
</script>

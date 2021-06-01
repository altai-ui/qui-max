<template>
  <table
    cellspacing="4"
    cellpadding="5"
    class="q-month-table"
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
          @mousemove="handleMouseMove(cell)"
        >
          {{ getMonthName(cell.text) }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { startOfMonth, isSameMonth, isBefore, isAfter } from 'date-fns';
import { reactive, computed, PropType, inject, defineComponent } from 'vue';
import { getConfig } from '@/qComponents/config';
import { throttle } from 'lodash-es';
import {
  formatToLocalReadableString,
  isDateInRangeInterval
} from '../../helpers';
import type {
  RangeState,
  TableProps,
  TablePropSelectionMode
} from '../../Common';
import type {
  MonthCellModel,
  MonthTableInstance,
  MonthTableState
} from './MonthTable';
import {
  QDatePickerPropDisabledValues,
  QDatePickerProvider
} from '../../QDatePicker';

const checkDisabled = (
  date: Date,
  disabledValues: QDatePickerPropDisabledValues
): boolean => {
  if (!disabledValues) return false;
  const disabled = [];
  if (Array.isArray(disabledValues.ranges)) {
    disabledValues.ranges.forEach((range: Record<string, Date>) => {
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

export default defineComponent({
  props: {
    value: { type: Date, default: null },
    selectionMode: {
      type: String as PropType<TablePropSelectionMode>,
      default: 'month'
    },
    minDate: { type: Date, default: null },
    maxDate: { type: Date, default: null },
    year: {
      type: Number,
      default: new Date().getFullYear()
    },
    month: {
      type: Number,
      default: new Date().getMonth()
    },
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

  setup(props: TableProps, ctx): MonthTableInstance {
    const state = reactive<MonthTableState>({
      tableRows: [[], [], []]
    });

    const picker = inject<QDatePickerProvider>(
      'qDatePicker',
      {} as QDatePickerProvider
    );

    const rows = computed<MonthCellModel[][]>(() => {
      const tableRows = state.tableRows;
      return tableRows.map((row, i) => {
        const newRow = [];
        for (let j = 0; j < 4; j += 1) {
          const index = i * 4 + j;
          const month = startOfMonth(new Date(props.year, index));
          const cell: MonthCellModel = {
            row: i,
            column: j,
            type: 'normal',
            inRange: false,
            start: false,
            end: false,
            text: index,
            month,
            disabled: checkDisabled(month, picker.disabledValues.value)
          };

          if (props.minDate) {
            let minDateNum = props.minDate.getTime();
            let maxDateNum = props.maxDate?.getTime();

            minDateNum = startOfMonth(minDateNum).getTime();
            maxDateNum = maxDateNum
              ? startOfMonth(maxDateNum).getTime()
              : minDateNum;

            minDateNum = Math.min(minDateNum, maxDateNum);
            maxDateNum = Math.max(minDateNum, maxDateNum);

            cell.inRange = Boolean(
              minDateNum &&
                month.getTime() >= minDateNum &&
                month.getTime() <= maxDateNum
            );
          }

          if (isSameMonth(month, new Date())) {
            cell.type = 'today';
          }

          newRow.push(cell);
        }

        return newRow;
      });
    });

    const getMonthName = (monthIndex: number): string => {
      return formatToLocalReadableString(
        new Date(props.year, monthIndex, 1),
        'MMM',
        getConfig('locale')
      );
    };

    const getCellClasses = (cell: MonthCellModel): string[] => {
      const classes = ['cell', 'cell_month'];
      if (props.value && cell.month && isSameMonth(props.value, cell.month))
        classes.push('cell_current');
      if (cell.type === 'today') classes.push('cell_today');

      if (
        cell.inRange ||
        (cell.month && isDateInRangeInterval(cell.month, props.rangeState))
      ) {
        classes.push('cell_in-range');
      }
      return classes;
    };

    const mouseMove = (cell: MonthCellModel): void => {
      if (!props.rangeState.selecting) return;
      if (cell.disabled) return;
      ctx.emit('rangeSelecting', {
        selecting: true,
        hoveredDate: cell.month,
        pickedDate: props.minDate
      });
    };

    const handleMouseMove = throttle(mouseMove, 200);

    const handleMonthTableClick = (cell: MonthCellModel): void => {
      if (cell.disabled) return;
      const month = cell.month?.getMonth();
      const newDate = cell.month;
      if (!newDate) return;
      if (props.selectionMode === 'range') {
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
        } else if (props.minDate && newDate >= props.minDate) {
          ctx.emit('pick', {
            minDate: props.minDate,
            maxDate: newDate,
            rangeState: { ...props.rangeState, selecting: false }
          });
        } else {
          ctx.emit('pick', {
            minDate: newDate,
            maxDate: props.minDate,
            rangeState: { ...props.rangeState, selecting: false }
          });
        }
      } else {
        ctx.emit('pick', month, props.year);
      }
    };

    return {
      state,
      rows,
      getMonthName,
      handleMonthTableClick,
      getCellClasses,
      handleMouseMove
    };
  }
});
</script>

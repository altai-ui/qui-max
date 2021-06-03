<template>
  <table
    cellspacing="4"
    cellpadding="5"
    class="q-period-table"
  >
    <tr
      v-for="(row, index) in rows"
      :key="index"
    >
      <td
        v-for="(cell, key) in row"
        :key="key"
        class="q-period-table__cell-wrapper"
      >
        <button
          :class="getCellClasses(cell)"
          :disabled="cell.disabled"
          type="button"
          tabindex="-1"
          @click="handleTableClick(cell)"
          @mousemove="handleMouseMove(cell)"
        >
          {{
            isMonthTable ? getMonthName(cell.text) : cell.date?.getFullYear()
          }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import {
  addYears,
  startOfMonth,
  isSameMonth,
  isSameYear,
  startOfDecade
} from 'date-fns';
import { reactive, computed, PropType, inject, defineComponent } from 'vue';
import { getConfig } from '@/qComponents/config';
import { throttle } from 'lodash-es';
import {
  formatToLocalReadableString,
  isDateInRangeInterval,
  checkDisabled
} from '../../helpers';
import type { RangeState, TableProps } from '../../Common';
import type {
  PeriodCellModel,
  PeriodTableInstance,
  PeriodTableState
} from './PeriodTable';
import { QDatePickerProvider } from '../../QDatePicker';

export default defineComponent({
  props: {
    value: { type: Date, default: null },
    minDate: { type: Date, default: null },
    maxDate: { type: Date, default: null },
    type: { type: String, default: 'month' },
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

  setup(props: TableProps, ctx): PeriodTableInstance {
    const state = reactive<PeriodTableState>({
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

    const isMonthTable = computed(() => props.type === 'month');
    const isSameFn = computed(() =>
      props.type === 'month' ? isSameMonth : isSameYear
    );

    const rows = computed<PeriodCellModel[][]>(() => {
      const tableRows = state.tableRows;
      let startYearDate = startYear.value;
      return tableRows.map((row, i) => {
        const newRow = [];
        const cellCount = 4;
        for (let j = 0; j < cellCount; j += 1) {
          const index = i * 4 + j;
          const date =
            props.type === 'month'
              ? startOfMonth(new Date(props.year, index))
              : startYearDate;
          const cell: PeriodCellModel = {
            type: 'normal',
            inRange: false,
            text: index,
            date,
            disabled: checkDisabled(
              date,
              picker.disabledValues.value,
              isSameFn.value
            )
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
                date.getTime() >= minDateNum &&
                date.getTime() <= maxDateNum
            );
          }

          if (isSameFn.value(date, new Date())) {
            cell.type = 'today';
          }

          newRow.push(cell);
          startYearDate = addYears(startYearDate, 1);
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

    const getCellClasses = (cell: PeriodCellModel): string[] => {
      const classes = ['cell', 'cell_period'];
      if (props.value && cell.date && isSameFn.value(props.value, cell.date))
        classes.push('cell_current');
      if (cell.type === 'today') classes.push('cell_today');

      if (
        cell.inRange ||
        (cell.date && isDateInRangeInterval(cell.date, props.rangeState))
      ) {
        classes.push('cell_in-range');
      }
      return classes;
    };

    const mouseMove = (cell: PeriodCellModel): void => {
      if (!props.rangeState.selecting) return;
      if (cell.disabled) return;
      ctx.emit('rangeSelecting', {
        selecting: true,
        hoveredDate: cell.date,
        pickedDate: props.minDate
      });
    };

    const handleMouseMove = throttle(mouseMove, 200);

    const handleTableClick = (cell: PeriodCellModel): void => {
      if (cell.disabled) return;
      const newDate = cell.date;
      if (!newDate) return;
      const month = newDate.getMonth();
      const year = newDate.getFullYear();
      if (
        picker.type.value === 'monthrange' ||
        picker.type.value === 'yearrange'
      ) {
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
        ctx.emit('pick', month, year, props.type);
      }
    };

    return {
      state,
      rows,
      getMonthName,
      handleTableClick,
      getCellClasses,
      handleMouseMove,
      isMonthTable
    };
  }
});
</script>

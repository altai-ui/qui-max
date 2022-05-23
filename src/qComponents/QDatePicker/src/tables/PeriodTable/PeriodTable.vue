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
          {{ getCellContent(cell) }}
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
import { debounce } from 'lodash-es';
import { reactive, computed, inject, defineComponent } from 'vue';
import type { PropType } from 'vue';

import { getConfig } from '@/qComponents/config';
import { notNull } from '@/qComponents/helpers';

import type { Nullable, ClassValue } from '#/helpers';

import type { RangeState } from '../../commonTypes';
import { PERIOD_CELLS_IN_ROW_COUNT } from '../../constants';
import {
  formatToLocalReadableString,
  isDateInRangeInterval,
  checkDisabled
} from '../../helpers';
import type { QDatePickerProvider } from '../../types';

import type {
  PeriodCellModel,
  PeriodTableInstance,
  PeriodTableProps,
  PeriodTableState
} from './types';

export default defineComponent({
  name: 'QDatePickerPeriodTable',

  props: {
    value: {
      type: Date as PropType<Nullable<Date>>,
      default: null
    },
    minDate: {
      type: Date as PropType<Nullable<Date>>,
      default: null
    },
    maxDate: {
      type: Date as PropType<Nullable<Date>>,
      default: null
    },
    type: {
      type: String as PropType<Nullable<string>>,
      default: 'month',
      validator: notNull
    },
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
    rangeState: {
      type: Object as PropType<RangeState>,
      default: (): RangeState => ({
        hoveredDate: null,
        pickedDate: null,
        selecting: false
      }),
      validator: notNull
    }
  },

  emits: ['pick', 'rangeSelecting'],

  setup(props: PeriodTableProps, ctx): PeriodTableInstance {
    const state = reactive<PeriodTableState>({
      tableRows: [[], [], []]
    });

    const picker = inject<QDatePickerProvider>(
      'qDatePicker',
      {} as QDatePickerProvider
    );

    const startYear = computed<Date>(() =>
      startOfDecade(props.year ? new Date(props.year, 0, 1) : new Date())
    );

    const isMonthTable = computed(() => props.type === 'month');
    const isSameFn = computed(() =>
      props.type === 'month' ? isSameMonth : isSameYear
    );

    const rows = computed<PeriodCellModel[][]>(() => {
      const tableRows = state.tableRows;
      let startYearDate = startYear.value;
      return tableRows.map((row, i) => {
        const newRow = [];
        for (let j = 0; j < PERIOD_CELLS_IN_ROW_COUNT; j += 1) {
          const index = i * PERIOD_CELLS_IN_ROW_COUNT + j;
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

    const getCellClasses = (cell: PeriodCellModel): ClassValue => {
      const isCurrent = Boolean(
        props.value && cell.date && isSameFn.value(props.value, cell.date)
      );
      const isInRange = Boolean(
        cell.inRange ||
          (cell.date && isDateInRangeInterval(cell.date, props.rangeState))
      );

      const isNextDecade = !isMonthTable.value && Boolean(cell.text > 9);

      return {
        'q-period-table__cell': true,
        'q-period-table__cell_period': true,
        'q-period-table__cell_today': cell.type === 'today',
        'q-period-table__cell_current': isCurrent,
        'q-period-table__cell_in-range': isInRange,
        'q-period-table__cell_next-decade': isNextDecade
      };
    };

    const getCellContent = (cell: PeriodCellModel): string =>
      String(
        isMonthTable.value
          ? getMonthName(cell.text)
          : cell.date?.getFullYear() ?? ''
      );

    const mouseMove = (cell: PeriodCellModel): void => {
      if (!props.rangeState.selecting) return;
      if (cell.disabled) return;
      ctx.emit('rangeSelecting', {
        selecting: true,
        hoveredDate: cell.date,
        pickedDate: props.minDate
      });
    };

    const handleMouseMove = debounce(mouseMove, 10);

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
      isMonthTable,
      getCellContent
    };
  }
});
</script>

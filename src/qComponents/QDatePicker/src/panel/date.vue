<template>
  <div ref="root" class="q-picker-panel">
    <div class="q-picker-panel__body">
      <slot name="sidebar" class="q-picker-panel__sidebar">
        <div v-if="shortcuts?.length" class="q-picker-panel__sidebar">
          <button
            v-for="(shortcut, key) in shortcuts"
            :key="key"
            type="button"
            class="q-picker-panel__shortcut"
            @click="handleShortcutClick(shortcut.value)"
          >
            {{ shortcut.text }}
          </button>
        </div>
      </slot>
      <div ref="datePanel" :class="panelContentClasses">
        <div class="q-picker-panel__header">
          <button
            type="button"
            :title="t('QDatePicker.prevYear')"
            class="q-picker-panel__icon-btn q-icon-double-triangle-left"
            @click="handlePrevYearClick"
          />
          <button
            v-show="state.currentView === 'date'"
            type="button"
            :title="t('QDatePicker.prevMonth')"
            class="q-picker-panel__icon-btn q-icon-triangle-left"
            @click="handlePrevMonthClick"
          />
          <div class="q-picker-panel__header-sign">
            <button
              v-show="state.currentView === 'date'"
              class="q-picker-panel__header-label"
              :class="{ active: state.currentView === 'month' }"
              @click="showMonthPicker"
            >
              {{ currentMonth }}
            </button>
            <button
              class="q-picker-panel__header-label"
              @click="showYearPicker"
            >
              {{ yearLabel }}
            </button>
          </div>
          <button
            v-show="state.currentView === 'date'"
            type="button"
            :title="t('QDatePicker.nextMonth')"
            class="q-picker-panel__icon-btn q-icon-triangle-right"
            @click="handleNextMonthClick"
          />
          <button
            type="button"
            :title="t('QDatePicker.nextYear')"
            class="q-picker-panel__icon-btn q-icon-double-triangle-right"
            @click="handleNextYearClick"
          />
        </div>

        <date-table
          v-show="state.currentView === 'date'"
          :selection-mode="selectionMode"
          :first-day-of-week="firstDayOfWeek"
          :value="modelValue"
          :year="state.year"
          :month="state.month"
          :disabled-values="disabledValues"
          @pick="handleDatePick"
        />
        <year-table
          v-show="state.currentView === 'year'"
          :value="modelValue"
          :year="state.year"
          :disabled-values="disabledValues"
          @pick="handleYearPick"
        />
        <month-table
          v-show="state.currentView === 'month'"
          :value="modelValue"
          :month="state.month"
          :year="state.year"
          :disabled-values="disabledValues"
          @pick="handleMonthPick"
        />
      </div>
      <!-- <div
        v-if="showTime && state.currentView === 'date'"
        class="q-picker-panel__timepickers"
      >...
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { subMonths, addMonths, subYears, addYears } from 'date-fns';
import { isNil } from 'lodash-es';
import { useI18n } from 'vue-i18n';
import { reactive, computed, watch, PropType, onMounted, ref } from 'vue';
import { getConfig } from '@/qComponents/config';
import { getTimeModel } from '../../../helpers/dateHelpers';
import YearTable from '../tables/year-table.vue';
import MonthTable from '../tables/month-table.vue';
import DateTable from '../tables/date-table.vue';

import type {
  DatePanelPropShortcuts,
  DatePanelPropModelValue,
  DatePanelInterface,
  DatePanelProps,
  DatePanelState
} from './types';

import {
  DATE_CELLS_COUNT,
  DATE_CELLS_IN_ROW_COUNT,
  PERIOD_CELLS_IN_ROW_COUNT
} from './constants';

export default {
  name: 'QDatePickerPanelDate',
  components: {
    YearTable,
    MonthTable,
    DateTable
  },
  props: {
    firstDayOfWeek: {
      type: Number,
      default: 1
    },

    type: {
      type: String,
      default: 'date'
    },

    shortcuts: {
      type: Array as PropType<DatePanelPropShortcuts>,
      default: null
    },

    disabledValues: {
      type: Object,
      default: null
    },

    showTime: {
      type: Boolean,
      default: false
    },

    modelValue: {
      type: Date as PropType<DatePanelPropModelValue>,
      default: null
    }
  },

  emits: ['pick'],

  setup(props: DatePanelProps, ctx): DatePanelInterface {
    const state = reactive<DatePanelState>({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      currentView: 'date',
      isRanged: false,
      panelInFocus: null,
      lastFocusedCellIndex: null,
      dateCells: null,
      monthCells: null,
      yearCells: null
    });

    if (props.modelValue instanceof Date) {
      state.year = props.modelValue.getFullYear();
      state.month = props.modelValue.getMonth();
    }

    const root = ref<HTMLElement | null>(null);
    const datePanel = ref<HTMLElement | null>(null);
    const timePanel = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (!root.value) return;
      state.dateCells = root.value.querySelectorAll('.q-date-table .cell');
      state.monthCells = root.value.querySelectorAll('.q-month-table .cell');
      state.yearCells = root.value.querySelectorAll('.q-year-table .cell');
    });

    const setPanelFocus = (): void => {
      if (datePanel.value?.contains(document.activeElement)) {
        state.panelInFocus = 'date';
      } else {
        state.panelInFocus = null;
      }
    };

    const panelContentClasses = computed<Record<string, boolean>>(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-right-borders': props.showTime,
      'q-picker-panel__content_focused': state.panelInFocus === 'date'
    }));

    const parsedTime = computed<null | Record<string, string>>(() => {
      if (props.modelValue) {
        return getTimeModel(props.modelValue);
      }
      return null;
    });

    const selectionMode = computed<string>(() => props.type ?? 'day');
    const currentMonth = computed<string>(() => {
      const formatter = new Intl.DateTimeFormat(getConfig('locale'), {
        month: 'short'
      });
      return formatter.format(new Date(state.year, state.month));
    });

    const yearLabel = computed<string | number>(() => {
      if (state.currentView === 'year') {
        const startYear = Math.floor(state.year / 10) * 10;
        return `${startYear} - ${startYear + 9}`;
      }
      return state.year;
    });

    watch(
      () => props.type,
      value => {
        let currentView;
        switch (value) {
          case 'week':
          case 'date':
          case 'datetime':
            currentView = 'date';
            break;
          default:
            currentView = value;
        }
        state.currentView = currentView;
      },
      { immediate: true }
    );

    const showMonthPicker = (): void => {
      state.currentView = 'month';
    };

    const showYearPicker = (): void => {
      state.currentView = 'year';
    };

    const showDatePicker = (): void => {
      state.currentView = 'date';
    };

    const handlePrevMonthClick = (): void => {
      const year = state.year;
      if (state.month === 0) {
        state.year -= 1;
      }
      state.month = subMonths(new Date(year, state.month), 1).getMonth();
    };

    const handleNextMonthClick = (): void => {
      const year = state.year;
      if (state.month === 11) {
        state.year += 1;
      }
      state.month = addMonths(new Date(year, state.month), 1).getMonth();
    };

    const handlePrevYearClick = (): void => {
      if (state.currentView === 'year') {
        state.year = subYears(
          new Date(state.year, state.month),
          10
        ).getFullYear();
      } else {
        state.year = subYears(
          new Date(state.year, state.month),
          1
        ).getFullYear();
      }
    };

    const handleNextYearClick = (): void => {
      if (state.currentView === 'year') {
        state.year = addYears(new Date(state.year, 1), 10).getFullYear();
      } else {
        state.year = addYears(new Date(state.year, 1), 1).getFullYear();
      }
    };

    const handleMonthPick = (month: number, year: number): void => {
      if (selectionMode.value === 'month') {
        ctx.emit('pick', new Date(year, month, 1));
      } else if (props.modelValue instanceof Date) {
        ctx.emit('pick', new Date(year, month, props.modelValue.getDate()));
        showDatePicker();
      } else {
        state.month = month;
        state.year = year;
        showDatePicker();
      }
    };

    const handleYearPick = (year: Date): void => {
      if (selectionMode.value === 'year') {
        ctx.emit('pick', year);
      } else if (props.modelValue instanceof Date) {
        ctx.emit(
          'pick',
          new Date(
            year.getFullYear(),
            props.modelValue.getMonth(),
            props.modelValue.getDate()
          )
        );
        showDatePicker();
      } else {
        state.year = year.getFullYear();
        showMonthPicker();
      }
    };

    const handleDatePick = (value: DatePanelPropModelValue): void => {
      ctx.emit('pick', value, { hidePicker: !props.showTime }); // set false to keep panel open
    };

    const { t } = useI18n();

    const moveWithinPeriod = ({
      period,
      e
    }: {
      period: string;
      e: KeyboardEvent;
    }): void => {
      let currentNodeIndex;
      let nextNodeIndex;
      const periodCells =
        period === 'month' ? state.monthCells : state.yearCells;
      if (!periodCells?.length) return;
      Array.from(periodCells).some((element, index) => {
        if (document.activeElement === element) {
          currentNodeIndex = index;
          return true;
        }

        return false;
      });

      if (isNil(currentNodeIndex)) return;
      switch (e.key) {
        case 'ArrowUp': {
          nextNodeIndex = currentNodeIndex - PERIOD_CELLS_IN_ROW_COUNT;
          break;
        }

        case 'ArrowRight':
          nextNodeIndex = currentNodeIndex + 1;
          break;

        case 'ArrowLeft':
          nextNodeIndex = currentNodeIndex - 1;
          break;

        case 'ArrowDown': {
          nextNodeIndex = currentNodeIndex + PERIOD_CELLS_IN_ROW_COUNT;
          break;
        }
        default:
          break;
      }
      if (!nextNodeIndex) return;

      const node = periodCells[nextNodeIndex] as HTMLElement;
      const newIndex = nextNodeIndex % PERIOD_CELLS_IN_ROW_COUNT;

      if (node) {
        node.focus();
        state.lastFocusedCellIndex = nextNodeIndex;
      } else if (state.lastFocusedCellIndex) {
        if (nextNodeIndex > state.lastFocusedCellIndex) {
          handleNextYearClick();
          (periodCells?.[newIndex] as HTMLElement)?.focus();
        } else if (nextNodeIndex < state.lastFocusedCellIndex) {
          handlePrevYearClick();
        }
      }
    };

    const moveWithinDates = (e: KeyboardEvent): void => {
      let currentNodeIndex;
      let nextNodeIndex;
      if (!state.dateCells?.length) return;
      Array.from(state.dateCells).some((element, index) => {
        const isItActiveElement = document.activeElement === element;
        if (isItActiveElement) currentNodeIndex = index;
        return isItActiveElement;
      });

      if (isNil(currentNodeIndex)) return;

      switch (e.key) {
        case 'ArrowUp': {
          nextNodeIndex = currentNodeIndex - DATE_CELLS_IN_ROW_COUNT;
          break;
        }

        case 'ArrowRight':
          nextNodeIndex = currentNodeIndex + 1;
          break;

        case 'ArrowLeft':
          nextNodeIndex = currentNodeIndex - 1;
          break;

        case 'ArrowDown': {
          nextNodeIndex = currentNodeIndex + DATE_CELLS_IN_ROW_COUNT;
          break;
        }
        default:
          break;
      }

      if (isNil(nextNodeIndex)) return;

      const node = state.dateCells[nextNodeIndex] as HTMLElement;
      const newIndex = nextNodeIndex % DATE_CELLS_IN_ROW_COUNT;
      if (node) {
        node.focus();
        state.lastFocusedCellIndex = nextNodeIndex;
      } else if (state.lastFocusedCellIndex) {
        if (nextNodeIndex > state.lastFocusedCellIndex) {
          handleNextMonthClick();
          (state.dateCells?.[newIndex] as HTMLElement)?.focus();
        } else if (nextNodeIndex < state.lastFocusedCellIndex) {
          handlePrevMonthClick();
          (
            state.dateCells?.[DATE_CELLS_COUNT + newIndex] as HTMLElement
          )?.focus();
        }
      }
    };

    const handleShortcutClick = (shortcut: Date): void => {
      ctx.emit('pick', shortcut);
    };

    const navigateDropdown = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement;
      if (e.key !== 'Tab') {
        if (target.classList.contains('cell_date')) {
          moveWithinDates(e);
        } else if (target.classList.contains('cell_month')) {
          moveWithinPeriod({ period: 'month', e });
        } else if (target.classList.contains('cell_year')) {
          moveWithinPeriod({ period: 'year', e });
        } else if (state.currentView === 'month') {
          (state.monthCells?.[0] as HTMLElement)?.focus();
        } else if (state.currentView === 'year') {
          (state.yearCells?.[0] as HTMLElement)?.focus();
        } else {
          (state.dateCells?.[0] as HTMLElement)?.focus();
        }
      }

      setPanelFocus();
    };

    return {
      state,
      root,
      datePanel,
      timePanel,
      panelContentClasses,
      parsedTime,
      selectionMode,
      currentMonth,
      yearLabel,
      showMonthPicker,
      showYearPicker,
      showDatePicker,
      handleYearPick,
      handlePrevMonthClick,
      handleNextMonthClick,
      handlePrevYearClick,
      handleNextYearClick,
      navigateDropdown,
      handleMonthPick,
      handleDatePick,
      handleShortcutClick,
      t
    };
  }
};
</script>

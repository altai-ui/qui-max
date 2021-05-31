<template>
  <div
    ref="root"
    class="q-picker-panel"
  >
    <div class="q-picker-panel__body-wrapper">
      <div class="q-picker-panel__body">
        <slot
          name="sidebar"
          class="q-picker-panel__sidebar"
        />
        <div
          v-if="shortcuts?.length"
          class="q-picker-panel__sidebar"
        >
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
        <div
          ref="leftPanel"
          :class="leftPanelClasses"
        >
          <div class="q-picker-panel__header">
            <button
              type="button"
              class="q-picker-panel__icon-btn q-icon-double-triangle-left"
              @click="handleLeftPrevYearClick"
            />
            <div class="q-picker-panel__header-sign">{{ leftYear }}</div>
            <button
              type="button"
              :disabled="!enableYearArrow"
              :class="{ 'q-picker-panel__icon-btn_disabled': !enableYearArrow }"
              class="q-picker-panel__icon-btn q-icon-double-triangle-right"
              @click="handleLeftNextYearClick"
            />
          </div>
          <month-table
            selection-mode="range"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            :month="leftMonth"
            :year="leftYear"
            :range-state="state.rangeState"
            :disabled-values="disabledValues"
            @pick="handleRangePick"
            @range-selecting="handleRangeSelecting"
          />
        </div>
        <div
          ref="rightPanel"
          :class="rightPanelClasses"
        >
          <div class="q-picker-panel__header">
            <button
              type="button"
              :disabled="!enableYearArrow"
              :class="{ 'q-picker-panel__icon-btn_disabled': !enableYearArrow }"
              class="q-picker-panel__icon-btn q-icon-double-triangle-left"
              @click="handleRightPrevYearClick"
            />
            <div class="q-picker-panel__header-sign">{{ rightYear }}</div>
            <button
              type="button"
              class="q-picker-panel__icon-btn q-icon-double-triangle-right"
              @click="handleRightNextYearClick"
            />
          </div>
          <month-table
            selection-mode="range"
            :month="rightMonth"
            :year="rightYear"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            :range-state="state.rangeState"
            :disabled-values="disabledValues"
            @pick="handleRangePick"
            @range-selecting="handleRangeSelecting"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { endOfDay, isDate, addYears, addMonths } from 'date-fns';
import { isNil } from 'lodash-es';
import {
  reactive,
  computed,
  watch,
  inject,
  PropType,
  onMounted,
  ref
} from 'vue';
import isSameMonth from 'date-fns/isSameMonth';
import MonthTable from '../../tables/month-table.vue';
import {
  leftYearComposable,
  leftMonthComposable,
  rightMonthComposable,
  isValidValue,
  useLeftPrevYearClick,
  useLeftNextYearClick,
  useRightNextYearClick,
  useRightPrevYearClick
} from '../composition';

import type {
  MonthRangeState,
  MonthRangeInstance,
  DatePanelRangePropModelValue,
  RangePickValue,
  DatePanelPropShortcuts
} from '../types';
import { QDatePickerProvider } from '../types';
import { RangeState } from '../../tables/types';
import {
  LEFT_MONTH_PANEL_START_INDEX,
  PERIOD_CELLS_IN_ROW_COUNT,
  RIGHT_MONTH_PANEL_START_INDEX
} from '../constants';

export default {
  components: { MonthTable },
  props: {
    value: {
      type: Array as PropType<DatePanelRangePropModelValue>,
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
    shortcuts: {
      type: Array as PropType<DatePanelPropShortcuts>,
      default: (): [] => []
    }
  },

  emits: ['pick'],

  setup(props, ctx): MonthRangeInstance {
    const state = reactive<MonthRangeState>({
      minDate: null,
      maxDate: null,
      leftDate: new Date(),
      rightDate: addYears(new Date(), 1),
      rangeState: {
        hoveredDate: null,
        pickedDate: null,
        selecting: false
      },
      isRanged: true,
      currentView: 'monthrange',
      panelInFocus: null,
      monthCells: null,
      lastFocusedCellIndex: null
    });

    const picker = inject<QDatePickerProvider>(
      'qDatePicker',
      {} as QDatePickerProvider
    );
    const root = ref<HTMLElement | null>(null);
    const leftPanel = ref<HTMLElement | null>(null);
    const rightPanel = ref<HTMLElement | null>(null);

    const leftPanelClasses = computed<Record<string, boolean>>(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-right-borders': true,
      'q-picker-panel__content_focused': state.panelInFocus === 'left'
    }));

    const rightPanelClasses = computed<Record<string, boolean>>(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-left-borders': true,
      'q-picker-panel__content_focused': state.panelInFocus === 'right'
    }));

    const rightYear = computed(() => {
      if (isDate(state.rightDate) && isDate(state.leftDate)) {
        return state.rightDate.getFullYear() === state.leftDate.getFullYear()
          ? state.leftDate.getFullYear() + 1
          : state.rightDate.getFullYear();
      }

      return new Date().getFullYear() + 1;
    });

    const leftYear = computed(() => leftYearComposable(state.leftDate));
    const leftMonth = computed(() => leftMonthComposable(state.leftDate));
    const rightMonth = computed(() => rightMonthComposable(state.rightDate));

    const enableYearArrow = computed<boolean>(
      () => rightYear.value > leftYear.value + 1
    );

    const handleRangeSelecting = (value: RangeState): void => {
      state.rangeState = value;
    };

    const handleRangePick = (val: RangePickValue, close = true): void => {
      if (state.maxDate === val.maxDate && state.minDate === val.minDate) {
        return;
      }

      if (val.maxDate) {
        // eslint-disable-next-line no-param-reassign
        val.maxDate = endOfDay(val.maxDate);
      }

      if (val.rangeState) {
        state.rangeState = val.rangeState;
      }

      state.maxDate = val.maxDate;
      state.minDate = val.minDate;

      // emit QDatepicker intermediate value
      picker.emitChange([state.minDate, state.maxDate], true);

      if (!close) return;

      if (isValidValue([state.minDate, state.maxDate])) {
        ctx.emit('pick', [state.minDate, state.maxDate], {
          hidePicker: !props.showTime
        });
      }
    };

    const handleClear = (): void => {
      state.minDate = null;
      state.maxDate = null;
      state.leftDate = new Date();
      state.rightDate = addYears(new Date(), 1);
      ctx.emit('pick', null);
    };

    const handleLeftPrevYearClick = (): void => {
      state.leftDate = useLeftPrevYearClick(state.leftDate);
    };

    const handleLeftNextYearClick = (): void => {
      state.leftDate = useLeftNextYearClick(state.leftDate);
    };

    const handleRightNextYearClick = (): void => {
      state.rightDate = useRightNextYearClick(state.rightDate);
    };

    const handleRightPrevYearClick = (): void => {
      state.rightDate = useRightPrevYearClick(state.rightDate);
    };

    const moveWithinPeriod = (e: KeyboardEvent): void => {
      let currentNodeIndex;
      let nextNodeIndex;
      const periodCells = state.monthCells;
      const rightPanelStartIndex = RIGHT_MONTH_PANEL_START_INDEX;
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
          if (
            state.panelInFocus === 'left' &&
            (currentNodeIndex + 1) % PERIOD_CELLS_IN_ROW_COUNT === 0
          ) {
            nextNodeIndex = rightPanelStartIndex;
          } else {
            nextNodeIndex = currentNodeIndex + 1;
          }
          break;

        case 'ArrowLeft':
          if (
            state.panelInFocus === 'right' &&
            currentNodeIndex % PERIOD_CELLS_IN_ROW_COUNT === 0
          ) {
            nextNodeIndex = LEFT_MONTH_PANEL_START_INDEX + 3;
          } else {
            nextNodeIndex = currentNodeIndex - 1;
          }
          break;

        case 'ArrowDown': {
          nextNodeIndex = currentNodeIndex + PERIOD_CELLS_IN_ROW_COUNT;
          break;
        }
        default:
          break;
      }
      if (isNil(nextNodeIndex)) return;

      const node = periodCells[nextNodeIndex] as HTMLElement;
      const newIndex = nextNodeIndex % PERIOD_CELLS_IN_ROW_COUNT;

      if (node) {
        node.focus();
        state.lastFocusedCellIndex = nextNodeIndex;
      } else if (state.lastFocusedCellIndex) {
        if (nextNodeIndex > state.lastFocusedCellIndex) {
          handleRightNextYearClick();
          handleLeftNextYearClick();
          (periodCells?.[newIndex] as HTMLElement)?.focus();
        } else if (nextNodeIndex < state.lastFocusedCellIndex) {
          handleLeftPrevYearClick();
          handleRightPrevYearClick();
        }
      }
    };

    const setPanelFocus = (): void => {
      if (leftPanel.value?.contains(document.activeElement)) {
        state.panelInFocus = 'left';
      } else if (rightPanel.value?.contains(document.activeElement)) {
        state.panelInFocus = 'right';
      } else {
        state.panelInFocus = 'timeRight';
      }
    };

    const navigateDropdown = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement;
      if (e.key !== 'Tab') {
        if (target.classList.contains('cell_month')) {
          moveWithinPeriod(e);
        } else {
          (state.monthCells?.[0] as HTMLElement)?.focus();
        }
      }

      setPanelFocus();
    };

    const handleShortcutClick = (shortcut: Date): void => {
      ctx.emit('pick', shortcut);
    };

    onMounted(() => {
      if (!root.value) return;
      state.monthCells = root.value.querySelectorAll('.q-month-table .cell');
    });

    watch(
      () => props.value,
      newVal => {
        if (!newVal || !newVal?.length) {
          handleClear();
        } else {
          state.minDate = newVal[0];
          state.maxDate = newVal[1];

          if (isSameMonth(state.minDate, state.maxDate)) {
            state.leftDate = state.minDate;
            state.rightDate = addMonths(state.minDate, 1);
          } else {
            state.leftDate = state.minDate;
            state.rightDate = state.maxDate;
          }
        }
      },
      { immediate: true }
    );

    return {
      root,
      leftPanel,
      rightPanel,
      state,
      leftPanelClasses,
      rightPanelClasses,
      leftMonth,
      handleRangePick,
      rightMonth,
      rightYear,
      leftYear,
      enableYearArrow,
      handleClear,
      handleShortcutClick,
      handleRangeSelecting,
      handleLeftPrevYearClick,
      handleLeftNextYearClick,
      handleRightNextYearClick,
      handleRightPrevYearClick,
      navigateDropdown
    };
  }
};
</script>

<template>
  <div
    ref="root"
    class="q-picker-panel"
  >
    <div class="q-picker-panel__body-wrapper">
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
      <div class="q-picker-panel__body">
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
            <div class="q-picker-panel__header-sign">{{ leftLabel }}</div>
            <button
              type="button"
              :disabled="!enableYearArrow"
              :class="{
                'q-picker-panel__icon-btn_disabled': !enableYearArrow
              }"
              class="q-picker-panel__icon-btn q-icon-double-triangle-right"
              @click="handleLeftNextYearClick"
            />
          </div>
          <period-table
            :year="leftYear"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            :range-state="state.rangeState"
            type="year"
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
              :class="{
                'q-picker-panel__icon-btn_disabled': !enableYearArrow
              }"
              class="q-picker-panel__icon-btn q-icon-double-triangle-left"
              @click="handleRightPrevYearClick"
            />
            <div class="q-picker-panel__header-sign">
              {{ rightLabel }}
            </div>
            <button
              type="button"
              class="q-picker-panel__icon-btn q-icon-double-triangle-right"
              @click="handleRightNextYearClick"
            />
          </div>
          <period-table
            :year="rightYear"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            type="year"
            :range-state="state.rangeState"
            @pick="handleRangePick"
            @range-selecting="handleRangeSelecting"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addYears, getDecade, isDate, subYears } from 'date-fns';
import {
  reactive,
  computed,
  watch,
  inject,
  PropType,
  ref,
  onMounted,
  defineComponent
} from 'vue';
import { isNil } from 'lodash-es';
import PeriodTable from '../../tables/PeriodTable/PeriodTable.vue';
import {
  leftYearComposable,
  isValidValue,
  getRangeChangedState,
  getPeriodNextNodeIndex,
  getLabelFromDate
} from '../composition';
import type {
  YearRangePanelInstance,
  YearRangePanelProps,
  YearRangeState
} from './types';
import type { QDatePickerProvider } from '../../QDatePicker';
import type { DatePanelRangePropModelValue } from '../DateRange/types';
import { PERIOD_CELLS_IN_ROW_COUNT, YEARS_IN_DECADE } from '../../constants';
import { RangePickValue, RangeState } from '../../Common';

export default defineComponent({
  name: 'QDatePickerYearRange',

  components: { PeriodTable },

  props: {
    modelValue: {
      type: Array as PropType<DatePanelRangePropModelValue>,
      default: null
    }
  },

  emits: ['pick'],

  setup(props: YearRangePanelProps, ctx): YearRangePanelInstance {
    const state = reactive<YearRangeState>({
      minDate: null,
      maxDate: null,
      leftDate: new Date(),
      rightDate: addYears(new Date(), YEARS_IN_DECADE),
      rangeState: {
        hoveredDate: null,
        pickedDate: null,
        selecting: false
      },
      isRanged: true,
      currentView: 'yearrange',
      panelInFocus: null,
      yearCells: null,
      lastFocusedCellIndex: null
    });

    const picker = inject<QDatePickerProvider>(
      'qDatePicker',
      {} as QDatePickerProvider
    );
    const root = ref<HTMLElement | null>(null);
    const leftPanel = ref<HTMLElement | null>(null);
    const rightPanel = ref<HTMLElement | null>(null);

    const rightYear = computed<number>(() => {
      if (isDate(state.rightDate) && isDate(state.leftDate)) {
        return getDecade(state.rightDate) === getDecade(state.leftDate)
          ? state.leftDate.getFullYear() + YEARS_IN_DECADE
          : state.rightDate.getFullYear();
      }

      return new Date().getFullYear() + YEARS_IN_DECADE;
    });
    const leftYear = computed(() => leftYearComposable(state.leftDate));
    const leftLabel = computed(() =>
      getLabelFromDate(state.leftDate, picker.type.value)
    );
    const rightLabel = computed(() =>
      getLabelFromDate(state.rightDate, picker.type.value)
    );

    const enableYearArrow = computed(
      () => rightYear.value > leftYear.value + YEARS_IN_DECADE
    );
    const leftPanelClasses = computed(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-right-borders': true,
      'q-picker-panel__content_focused': state.panelInFocus === 'left'
    }));

    const rightPanelClasses = computed(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-left-borders': true,
      'q-picker-panel__content_focused': state.panelInFocus === 'right'
    }));

    const handleLeftNextYearClick = (): void => {
      state.leftDate = addYears(state.leftDate, YEARS_IN_DECADE);
    };
    const handleLeftPrevYearClick = (): void => {
      state.leftDate = subYears(state.leftDate, YEARS_IN_DECADE);
    };
    const handleRightNextYearClick = (): void => {
      state.rightDate = addYears(state.rightDate, YEARS_IN_DECADE);
    };
    const handleRightPrevYearClick = (): void => {
      state.rightDate = subYears(state.rightDate, YEARS_IN_DECADE);
    };
    const handleClear = (): void => {
      state.minDate = null;
      state.maxDate = null;
      state.leftDate = new Date();
      state.rightDate = addYears(new Date(), YEARS_IN_DECADE);
      ctx.emit('pick', null);
    };

    const handleRangePick = (val: RangePickValue, close = true): void => {
      const { maxDate, minDate, rangeState } = getRangeChangedState(
        val,
        state.rangeState
      );
      state.maxDate = maxDate;
      state.minDate = minDate;
      state.rangeState = rangeState;

      // emit QDatepicker intermediate value
      picker.emit('intermediateChange', [minDate, maxDate]);

      if (!close) return;

      if (isValidValue([minDate, maxDate])) {
        ctx.emit('pick', [state.minDate, state.maxDate]);
      }
    };

    const handleRangeSelecting = (value: RangeState): void => {
      state.rangeState = value;
    };

    const moveWithinPeriod = (e: KeyboardEvent): void => {
      if (!state?.yearCells?.length || !state.panelInFocus) return;
      const nextNodeIndex = getPeriodNextNodeIndex(
        e.key,
        state.yearCells,
        state.panelInFocus
      );

      if (isNil(nextNodeIndex)) return;
      const node = state.yearCells[nextNodeIndex];
      const newIndex = nextNodeIndex % PERIOD_CELLS_IN_ROW_COUNT;

      if (node) {
        node.focus();
        state.lastFocusedCellIndex = nextNodeIndex;
      } else if (!isNil(state.lastFocusedCellIndex)) {
        if (nextNodeIndex > state.lastFocusedCellIndex) {
          handleRightNextYearClick();
          handleLeftNextYearClick();
          state.yearCells?.[newIndex]?.focus();
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
      }
    };

    const navigateDropdown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') {
        const target = e.target as HTMLElement;
        if (target.classList.contains('q-period-table__cell_period')) {
          moveWithinPeriod(e);
        } else {
          state.yearCells?.[0]?.focus();
        }
      }

      setPanelFocus();
    };

    const handleShortcutClick = (shortcut: Date): void => {
      ctx.emit('pick', shortcut);
    };

    onMounted(() => {
      if (!root.value) return;
      state.yearCells = root.value.querySelectorAll('.q-period-table__cell');
    });

    watch(
      () => props.modelValue,
      newVal => {
        if (!newVal?.length) {
          handleClear();
        } else {
          state.minDate = newVal[0];
          state.maxDate = newVal[1];
          if (getDecade(state.minDate) === getDecade(state.maxDate)) {
            state.leftDate = state.minDate;
            state.rightDate = addYears(state.minDate, 10);
          }
        }
      },
      { immediate: true }
    );

    return {
      root,
      rightPanel,
      leftPanel,
      state,
      rightYear,
      leftYear,
      leftLabel,
      rightLabel,
      enableYearArrow,
      leftPanelClasses,
      rightPanelClasses,
      handleLeftNextYearClick,
      handleLeftPrevYearClick,
      handleRightNextYearClick,
      handleRightPrevYearClick,
      handleClear,
      handleRangePick,
      handleRangeSelecting,
      navigateDropdown,
      handleShortcutClick,
      shortcuts: picker.shortcuts
    };
  }
});
</script>

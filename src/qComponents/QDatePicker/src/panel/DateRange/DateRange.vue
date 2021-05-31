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
        >
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
        </slot>
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
            <button
              type="button"
              class="q-picker-panel__icon-btn q-icon-triangle-left"
              @click="handleLeftPrevMonthClick"
            />
            <div class="q-picker-panel__header-sign">{{ leftLabel }}</div>
            <button
              type="button"
              :disabled="!enableMonthArrow"
              :class="{
                'q-picker-panel__icon-btn_disabled': !enableMonthArrow
              }"
              class="q-picker-panel__icon-btn q-icon-triangle-right"
              @click="handleLeftNextMonthClick"
            />
            <button
              type="button"
              :disabled="!enableYearArrow"
              :class="{ 'q-picker-panel__icon-btn_disabled': !enableYearArrow }"
              class="q-picker-panel__icon-btn q-icon-double-triangle-right"
              @click="handleLeftNextYearClick"
            />
          </div>
          <date-table
            selection-mode="range"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            :month="leftMonth"
            :year="leftYear"
            :range-state="state.rangeState"
            :disabled-values="disabledValues"
            :first-day-of-week="firstDayOfWeek"
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
            <button
              type="button"
              :disabled="!enableMonthArrow"
              :class="{
                'q-picker-panel__icon-btn_disabled': !enableMonthArrow
              }"
              class="q-picker-panel__icon-btn q-icon-triangle-left"
              @click="handleRightPrevMonthClick"
            />
            <div class="q-picker-panel__header-sign">
              {{ rightLabel }}
            </div>
            <button
              type="button"
              class="q-picker-panel__icon-btn q-icon-triangle-right"
              @click="handleRightNextMonthClick"
            />
            <button
              type="button"
              class="q-picker-panel__icon-btn q-icon-double-triangle-right"
              @click="handleRightNextYearClick"
            />
          </div>
          <date-table
            selection-mode="range"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            :month="rightMonth"
            :year="rightYear"
            :range-state="state.rangeState"
            :disabled-values="disabledValues"
            :first-day-of-week="firstDayOfWeek"
            @pick="handleRangePick"
            @range-selecting="handleRangeSelecting"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addMonths, subMonths, endOfDay } from 'date-fns';
import { isNil } from 'lodash-es';
import {
  reactive,
  computed,
  inject,
  watch,
  PropType,
  ref,
  onMounted
} from 'vue';
import isSameMonth from 'date-fns/esm/isSameMonth/index';
import {
  leftMonthComposable,
  leftYearComposable,
  isValidValue,
  rightMonthComposable,
  leftLabelComposable,
  rightLabelComposable,
  useLeftPrevYearClick,
  useRightNextYearClick,
  useRightPrevYearClick,
  useLeftNextYearClick
} from '../composition';
import DateTable from '../../tables/date-table.vue';

import type {
  DatePanelRangePropModelValue,
  DateRangePanelInstance,
  DateRangePanelState
} from './DateRange';
import { QDatePickerProvider } from '../../QDatePicker';
import { RangeState } from '../../tables/types';
import { DATE_CELLS_COUNT, DATE_CELLS_IN_ROW_COUNT } from '../constants';
import { DatePanelPropShortcuts } from '../Date/DatePanel';
import { RangePickValue } from '../../Common';

const MONTHS_COUNT = 12;

export default {
  name: 'QDatePickerPanelDateRange',
  components: {
    DateTable
  },
  props: {
    firstDayOfWeek: {
      type: Number,
      default: 1
    },

    modelValue: {
      type: Array as PropType<DatePanelRangePropModelValue>,
      default: null
    },

    disabledValues: {
      type: Object,
      default: null
    },

    shortcuts: {
      type: Array as PropType<DatePanelPropShortcuts>,
      default: (): [] => []
    },

    showTime: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'date',
      validator: (value: string): boolean =>
        [
          'date',
          'week',
          'month',
          'year',
          'daterange',
          'monthrange',
          'yearrange'
        ].includes(value)
    }
  },

  emits: ['pick'],

  setup(props, ctx): DateRangePanelInstance {
    const state = reactive<DateRangePanelState>({
      minDate: null,
      maxDate: null,
      leftDate: new Date(),
      rightDate: addMonths(new Date(), 1),
      rangeState: {
        hoveredDate: null,
        pickedDate: null,
        selecting: false
      },
      panelInFocus: null,
      dateCells: null,
      monthCells: null,
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

    const transformedValue = computed<Date[]>(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue;
      }

      return [];
    });

    const btnDisabled = computed<boolean>(() => {
      return !(
        state.minDate &&
        state.maxDate &&
        !state.rangeState.selecting &&
        isValidValue([state.minDate, state.maxDate])
      );
    });

    const leftLabel = computed(() =>
      leftLabelComposable(state.leftDate, props.type)
    );
    const rightLabel = computed(() =>
      rightLabelComposable(state.rightDate, props.type)
    );
    const leftYear = computed(() => leftYearComposable(state.leftDate));

    const leftMonth = computed(() => leftMonthComposable(state.leftDate));
    const rightMonth = computed(() => rightMonthComposable(state.rightDate));

    const isLeftTimeDisabled = computed(() => !transformedValue.value[0]);

    const rightPanelClasses = computed<Record<string, boolean>>(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-left-borders': true,
      'q-picker-panel__content_no-right-borders': props.showTime,
      'q-picker-panel__content_focused': state.panelInFocus === 'right'
    }));

    const leftPanelClasses = computed(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-left-borders': Boolean(
        ctx.slots.sidebar || props.shortcuts.length
      ),
      'q-picker-panel__content_no-right-borders': true,
      'q-picker-panel__content_focused': state.panelInFocus === 'left'
    }));

    const rightYear = computed(() => state.rightDate.getFullYear());
    const enableMonthArrow = computed(() => {
      const nextMonth = (leftMonth.value + 1) % 12;
      const yearOffset = leftMonth.value + 1 >= 12 ? 1 : 0;
      return (
        new Date(leftYear.value + yearOffset, nextMonth) <
        new Date(rightYear.value, rightMonth.value)
      );
    });

    const enableYearArrow = computed(() => {
      return Boolean(
        rightYear.value * MONTHS_COUNT +
          rightMonth.value -
          (leftYear.value * MONTHS_COUNT + leftMonth.value + 1) >=
          MONTHS_COUNT
      );
    });

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
      picker.emit('intermediateChange', [state.minDate, state.maxDate]);

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
      state.rightDate = addMonths(new Date(), 1);
      state.rangeState = {
        hoveredDate: null,
        pickedDate: null,
        selecting: false
      };
    };

    const handleLeftPrevMonthClick = (): void => {
      state.leftDate = subMonths(state.leftDate, 1);
    };

    const handleRightNextMonthClick = (): void => {
      state.rightDate = addMonths(state.rightDate, 1);
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

    const handleLeftNextMonthClick = (): void => {
      state.leftDate = addMonths(state.leftDate, 1);
    };

    const handleRightPrevMonthClick = (): void => {
      state.rightDate = subMonths(state.rightDate, 1);
    };

    const setPanelFocus = (): void => {
      if (leftPanel.value?.contains(document.activeElement)) {
        state.panelInFocus = 'left';
      } else if (rightPanel.value?.contains(document.activeElement)) {
        state.panelInFocus = 'right';
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
          if (
            state.panelInFocus === 'left' &&
            (currentNodeIndex + 1) % DATE_CELLS_IN_ROW_COUNT === 0
          ) {
            nextNodeIndex = DATE_CELLS_COUNT;
            setPanelFocus();
            break;
          }
          nextNodeIndex = currentNodeIndex + 1;
          break;

        case 'ArrowLeft':
          if (
            state.panelInFocus === 'right' &&
            (currentNodeIndex - DATE_CELLS_IN_ROW_COUNT) %
              DATE_CELLS_IN_ROW_COUNT ===
              0
          ) {
            nextNodeIndex = DATE_CELLS_IN_ROW_COUNT - 1;
            setPanelFocus();
          } else {
            nextNodeIndex = currentNodeIndex - 1;
          }

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
          handleRightNextMonthClick();
          handleLeftNextMonthClick();
          (state.dateCells?.[newIndex] as HTMLElement)?.focus();
        } else if (nextNodeIndex < state.lastFocusedCellIndex) {
          handleLeftPrevMonthClick();
          handleRightPrevMonthClick();
          (
            state.dateCells?.[DATE_CELLS_COUNT + newIndex] as HTMLElement
          )?.focus();
        }
      }
    };

    const navigateDropdown = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement;
      if (e.key !== 'Tab') {
        if (target.classList.contains('cell_date')) {
          moveWithinDates(e);
        } else {
          (state.dateCells?.[0] as HTMLElement)?.focus();
        }
      }

      setPanelFocus();
    };

    const handleShortcutClick = (shortcut: Date): void => {
      picker.emitChange(shortcut, false);
    };

    watch(
      () => props.modelValue,
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

    onMounted(() => {
      if (!root.value) return;
      state.dateCells = root.value.querySelectorAll('.q-date-table .cell');
    });

    return {
      state,
      picker,
      root,
      leftPanel,
      rightPanel,
      transformedValue,
      btnDisabled,
      enableMonthArrow,
      isLeftTimeDisabled,
      enableYearArrow,
      rightPanelClasses,
      leftPanelClasses,
      rightYear,
      leftYear,
      leftLabel,
      rightLabel,
      leftMonth,
      rightMonth,
      handleRangePick,
      handleClear,
      handleShortcutClick,
      handleLeftNextYearClick,
      handleLeftPrevYearClick,
      handleRightNextYearClick,
      handleRightPrevYearClick,
      handleLeftPrevMonthClick,
      handleLeftNextMonthClick,
      handleRightNextMonthClick,
      handleRightPrevMonthClick,
      handleRangeSelecting,
      navigateDropdown
    };
  }
};
</script>

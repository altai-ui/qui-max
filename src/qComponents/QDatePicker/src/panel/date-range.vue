<template>
  <div class="q-picker-panel">
    <div class="q-picker-panel__body-wrapper">
      <div class="q-picker-panel__body">
        <slot
          name="sidebar"
          class="q-picker-panel__sidebar"
        >
          <div
            v-if="shortcuts.length"
            class="q-picker-panel__sidebar"
          >
            <button
              v-for="(shortcut, key) in shortcuts"
              :key="key"
              type="button"
              class="q-picker-panel__shortcut"
              @click="handleShortcutClick(shortcut)"
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
import { addMonths, subMonths, getDecade, endOfDay } from 'date-fns';
import { reactive, computed, inject, watch, PropType } from 'vue';
import addYears from 'date-fns/fp/addYears';
import isSameMonth from 'date-fns/esm/isSameMonth/index';
import {
  leftMonthComposable,
  leftYearComposable,
  isValidValue,
  rightMonthComposable,
  leftLabelComposable,
  rightLabelComposable,
  handleShortcutClick,
  useLeftPrevYearClick,
  useRightNextYearClick,
  useRightPrevYearClick,
  useLeftNextYearClick
} from './composition';
import DateTable from '../tables/date-table.vue';
import focusMixin from './focus-mixin';
 
import type { DateRangeState, DateRangeInstance, DatePanelPropShortcuts, DatePanelRangePropModelValue, RangePickValue } from './types';
import { QDatePickerProvider } from '../types';
import { RangeState } from '../tables/types';

const MONTHS_COUNT = 12;

export default {
  name: 'QDatePickerPanelDateRange',
  components: {
    DateTable
    // TimePanel
  },
  mixins: [focusMixin],
  props: {
    firstDayOfWeek: {
      type: Number,
      default: 1
    },

    visible: {
      type: Boolean,
      default: false
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
          'datetime',
          'week',
          'month',
          'year',
          'daterange',
          'datetimerange',
          'monthrange',
          'yearrange'
        ].includes(value)
    },
  },

  emits: ['pick'],

  setup(props, ctx): DateRangeInstance {
    const state = reactive<DateRangeState>({
      minDate: null,
      maxDate: null,
      leftDate: new Date(),
      rightDate: addMonths(new Date(), 1),
      rangeState: {
        hoveredDate: null,
        pickedDate: null,
        selecting: false
      },
      panelInFocus: null
    });

    const picker = inject<QDatePickerProvider>('qDatePicker', {} as QDatePickerProvider);

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

    const leftLabel = computed(() => leftLabelComposable(state.leftDate, props.type));
    const rightLabel = computed(() => rightLabelComposable(state.rightDate, props.type));
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
    }

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
    }

    const handleLeftNextYearClick = (): void => {
      state.leftDate = useLeftNextYearClick(state.leftDate);
    }

    const handleRightNextYearClick = (): void => {
      state.rightDate = useRightNextYearClick(state.rightDate);
    }

    const handleRightPrevYearClick = (): void => {
      state.rightDate = useRightPrevYearClick(state.rightDate);
    }

    const handleLeftNextMonthClick = (): void => {
      state.leftDate = addMonths(state.leftDate, 1);
    };

    const handleRightPrevMonthClick = (): void => {
      state.rightDate = subMonths(state.rightDate, 1);
    };

    watch(
      () => props.modelValue,
      newVal => {
        if (!newVal || !newVal?.length) {
          handleClear();
        } else {
          state.minDate = newVal[0];
          state.maxDate = newVal[1];
          switch (picker.type.value) {
            case 'yearrange': {
              if (getDecade(state.minDate) === getDecade(state.maxDate)) {
                state.leftDate = state.minDate;
                state.rightDate = addYears(state.minDate.getTime(), 10);
              }
              break;
            }
            default: {
              if (isSameMonth(state.minDate, state.maxDate)) {
                state.leftDate = state.minDate;
                state.rightDate = addMonths(state.minDate, 1);
              } else {
                state.leftDate = state.minDate;
                state.rightDate = state.maxDate;
              }
            }
          }
        }
      },
      { immediate: true }
    );

    return {
      state,
      picker,
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
      handleShortcutClick,
      handleClear,
      handleLeftNextYearClick,
      handleLeftPrevYearClick,
      handleRightNextYearClick,
      handleRightPrevYearClick,
      handleLeftPrevMonthClick,
      handleLeftNextMonthClick,
      handleRightNextMonthClick,
      handleRightPrevMonthClick,
      handleRangeSelecting
    };
  }
};
</script>

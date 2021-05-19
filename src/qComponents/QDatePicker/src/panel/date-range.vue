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
            :min-date="minDate"
            :max-date="maxDate"
            :month="leftMonth"
            :year="leftYear"
            :range-state="rangeState"
            :disabled-values="disabledValues"
            :first-day-of-week="firstDayOfWeek"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
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
            :min-date="minDate"
            :max-date="maxDate"
            :month="rightMonth"
            :year="rightYear"
            :range-state="rangeState"
            :disabled-values="disabledValues"
            :first-day-of-week="firstDayOfWeek"
            @changerange="handleChangeRange"
            @pick="handleRangePick"
          />
        </div>
        <div
          v-show="showTime"
          class="q-picker-panel__timepickers"
        >
          <div class="q-picker-panel__timepicker">
            <time-panel
              ref="leftTimePanel"
              class="time-panel time-panel_no-left-borders time-panel_no-right-borders"
              :value="parsedLeftTime"
              :panel-in-focus="panelInFocus === 'timeLeft'"
              :disabled="isLeftTimeDisabled"
              :disabled-values="disabledValues.time"
              :prefix-to-time="$t('QDatePicker.timeFrom')"
              @change="handleLeftTimeChange"
            />
          </div>
          <div class="q-picker-panel__timepicker">
            <time-panel
              ref="rightTimePanel"
              :panel-in-focus="panelInFocus === 'timeRight'"
              :disabled="isLeftTimeDisabled"
              class="time-panel time-panel_no-left-borders"
              :value="parsedRightTime"
              :disabled-values="disabledRightTimeValues"
              :prefix-to-time="$t('QDatePicker.timeTo')"
              @change="handleRightTimeChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addMonths, isDate, isSameDay, subMonths } from 'date-fns';
import { reactive, computed, inject, watch } from 'vue';
import endOfDay from 'date-fns/esm/endOfDay/index';
import { getDecade } from 'date-fns/esm/fp';
import addYears from 'date-fns/fp/addYears';
import isSameMonth from 'date-fns/esm/isSameMonth/index';
import { leftMonthComposable, leftYearComposable, isValidValue, rightMonthComposable, handleShortcutClick } from './composition';
import DateTable from '../basic/date-table';
import focusMixin from './focus-mixin';
import focusTimeMixin from './focus-time-mixin';
import { setTimeToDate } from '../helpers';
import { addZero , isTimeValueValid } from '../../../helpers/dateHelpers';
import TimePanel from '../../../QTimePicker/src/components/panel';

import type { DateRangeState, DateRangeInterface } from './types';

const MONTHS_COUNT = 12;

export default {
  name: 'QDatePickerPanelDateRange',
  components: { DateTable, TimePanel },
  mixins: [focusMixin, focusTimeMixin],
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
      type: Array,
      default: () => []
    },

    disabledValues: {
      type: Object,
      default: null
    },

    shortcuts: {
      type: Array,
      default: () => []
    },

    showTime: {
      type: Boolean,
      default: false
    }
  },

  emits: ['pick'],

  setup(props, ctx): DateRangeInterface {
    const state = reactive<DateRangeState>({
      minDate: '',
      maxDate: '',
      leftDate: new Date(),
      rightDate: addMonths(new Date(), 1),
      rangeState: {
        endDate: null,
        selecting: false
      },
      isRanged: true,
      panelInFocus: null
    });

    const picker = inject('qDatePicker');

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

    const parsedLeftTime = computed<Record<string, string> | string | Date>(() => {
      const value = transformedValue.value[0];
      if (isDate(value)) {
        return {
          hours: addZero(value.getHours()),
          minutes: addZero(value.getMinutes()),
          seconds: addZero(value.getSeconds())
        };
      }

      return value;
    });

    const leftMonth = leftMonthComposable(state.leftDate);
    const rightMonth = rightMonthComposable(state.rightDate);
    const leftYear = leftYearComposable(state.leftDate);

    const disabledRightTimeValues = computed<Record<string, string>>(() => {
      const values = { ...props.disabledValues.time };
      if (
        isSameDay(transformedValue.value[0], transformedValue.value[1]) &&
        parsedLeftTime.value
      ) {
        values.to = Object.values(parsedLeftTime.value).join(':');
      }
      return values;
    });

    const isLeftTimeDisabled = computed(() => !transformedValue.value[0]);

    const parsedRightTime = computed<Record<string, string> | Date>(() => {
      const value = transformedValue.value[1] ?? null;
      if (isDate(value)) {
        return {
          hours: addZero(value.getHours()),
          minutes: addZero(value.getMinutes()),
          seconds: addZero(value.getSeconds())
        };
      }

      return value;
    });

    const rightPanelClasses = computed<Record<string, boolean>>(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-left-borders': true,
      'q-picker-panel__content_no-right-borders': props.showTime,
      'q-picker-panel__content_focused': state.panelInFocus === 'right'
    }));

    const leftPanelClasses = computed(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-left-borders':
        Boolean(ctx.slots.sidebar || props.shortcuts.length),
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

    const handleChangeRange = (val): void => {
      state.minDate = val.minDate;
      state.maxDate = val.maxDate;
      state.rangeState = val.rangeState;
    };

    const handleRangePick = (val, close = true): void => {
      if (state.maxDate === val.maxDate && state.minDate === val.minDate) {
        return;
      }

      if (isDate(val.maxDate)) {
        // eslint-disable-next-line no-param-reassign
        val.maxDate = endOfDay(val.maxDate);
      }

      if (val.rangeState) {
        state.rangeState = val.rangeState;
      }

      state.maxDate = val.maxDate;
      state.minDate = val.minDate;
      const to = props.disabledValues?.time?.to;

      if (state.maxDate && to && isTimeValueValid(to)) {
        const [hours, minutes, seconds] = to.split(':');
        state.minDate.setHours(Number(hours));
        state.minDate.setMinutes(Number(minutes));
        state.minDate.setSeconds(Number(seconds));
        state.maxDate.setHours(Number(hours));
        state.maxDate.setMinutes(Number(minutes));
        state.maxDate.setSeconds(Number(seconds));
      }

      // emit QDatepicker intermediate value
      picker?.emitChange('rangepick', val);

      if (!close) return;
      if (isValidValue([state.minDate, state.maxDate])) {
        ctx.emit('pick', [state.minDate, state.maxDate], {
          hidePicker: !props.showTime
        });
      }
    };

    const handleLeftTimeChange = ({ value, type }: { value: string, type: string}): void => {
      let rightTime = transformedValue.value[1] || new Date();
      const newDate = setTimeToDate(
        transformedValue.value[0] || new Date(),
        type,
        value
      );

      if (newDate.getTime() > rightTime.getTime()) {
        rightTime = newDate;
      }

      ctx.emit('pick', [newDate, rightTime], { hidePicker: false });
    }

    const handleRightTimeChange = ({ value, type }: { value: string, type: string}): void => {
      const leftTime = transformedValue.value[0] || new Date();
      const newDate = setTimeToDate(
        transformedValue.value[1] || new Date(),
        type,
        value
      );

      ctx.emit('pick', [leftTime, newDate], { hidePicker: false });
    };

    const handleClear = (): void => {
      state.minDate = null;
      state.maxDate = null;
      state.leftDate = new Date();
      state.rightDate = addMonths(new Date(), 1);
      ctx.emit('pick', null);
    };

    const handleLeftPrevMonthClick = (): void => {
      state.leftDate = subMonths(state.leftDate, 1);
    };

    const handleRightNextMonthClick = (): void => {
      state.rightDate = addMonths(state.rightDate, 1);
    };

    const handleLeftNextMonthClick = (): void => {
      state.leftDate = addMonths(state.leftDate, 1);
    };

    const handleRightPrevMonthClick = (): void => {
      state.rightDate = subMonths(state.rightDate, 1);
    };

    watch(() => props.modelValue, (newVal) => {
      if (!newVal || !newVal?.length) {
        handleClear();
      } else {
        state.minDate = newVal[0];
        state.maxDate = newVal[1];
        switch (picker.type.value) {
          case 'yearrange': {
            if (getDecade(state.minDate) === getDecade(state.maxDate)) {
              state.leftDate = state.minDate;
              state.rightDate = addYears(state.minDate, 10);
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
    },{ immediate: true })

    return {
      state,
      picker,
      transformedValue,
      btnDisabled,
      disabledRightTimeValues,
      parsedLeftTime,
      enableMonthArrow,
      isLeftTimeDisabled,
      parsedRightTime,
      enableYearArrow,
      rightPanelClasses,
      leftPanelClasses,
      rightYear,
      leftMonth,
      rightMonth,
      handleChangeRange,
      handleRangePick,
      handleLeftTimeChange,
      handleRightTimeChange,
      handleClear,
      handleLeftPrevMonthClick,
      handleRightNextMonthClick,
      handleLeftNextMonthClick,
      handleRightPrevMonthClick
    }
  },
};
</script>

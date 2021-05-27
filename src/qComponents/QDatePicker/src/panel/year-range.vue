<template>
  <div class="q-picker-panel">
    <div class="q-picker-panel__body-wrapper">
      <slot
        name="sidebar"
        class="q-picker-panel__sidebar"
      />
      <div
        v-if="!$slots.sidebar && shortcuts.length"
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
      <div class="q-picker-panel__body">
        <div
          ref="leftPanel"
          :class="leftPanelClasses"
        >
          <div class="q-picker-panel__header">
            <button
              type="button"
              class="q-picker-panel__icon-btn q-icon-double-triangle-left"
              @click="leftPrevYear"
            />
            <div class="q-picker-panel__header-sign">{{ leftLabel }}</div>
            <button
              type="button"
              :disabled="!enableYearArrow"
              :class="{
                'q-picker-panel__icon-btn_disabled': !enableYearArrow
              }"
              class="q-picker-panel__icon-btn q-icon-double-triangle-right"
              @click="leftNextYear"
            />
          </div>
          <year-table
            :year="leftYear"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            :disabled-values="disabledValues"
            :range-state="state.rangeState"
            selection-mode="range"
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
              @click="rightPrevYear"
            />
            <div class="q-picker-panel__header-sign">
              {{ rightLabel }}
            </div>
            <button
              type="button"
              class="q-picker-panel__icon-btn q-icon-double-triangle-right"
              @click="rightNextYear"
            />
          </div>
          <year-table
            :year="rightYear"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            :disabled-values="disabledValues"
            selection-mode="range"
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
import { addMonths, addYears, getDecade, isDate, subYears, endOfDay } from 'date-fns';
import { reactive, computed, watch, inject, PropType } from 'vue';
import isSameMonth from 'date-fns/isSameMonth';
import YearTable from '../tables/year-table.vue';
import focusMixin from './focus-mixin';
import { leftYearComposable, handleShortcutClick, leftLabelComposable, rightLabelComposable, isValidValue } from './composition';
import { DatePanelPropShortcuts, DatePanelRangePropModelValue, RangePickValue, YearRangeInterface, YearRangeState } from './types';
import { QDatePickerProvider } from '../types';
import { RangeState } from '../tables/types';

const YEARS_IN_DECADE = 10;

export default {
  components: { YearTable },
  mixins: [focusMixin],
  props: {
    modelValue: {
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
    },
  },

  emits: ['pick'],

  setup(props, ctx): YearRangeInterface {
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
      panelInFocus: null
    });
    
    const picker = inject<QDatePickerProvider>('qDatePicker', {} as QDatePickerProvider);

    const rightYear = computed<number>(() => {
      if (isDate(state.rightDate) && isDate(state.leftDate)) {
        return getDecade(state.rightDate) === getDecade(state.leftDate)
          ? state.leftDate.getFullYear() + YEARS_IN_DECADE
          : state.rightDate.getFullYear();
      }

      return new Date().getFullYear() + YEARS_IN_DECADE;
    })
    const leftYear = computed(() => leftYearComposable(state.leftDate));
    const leftLabel = computed(() => leftLabelComposable(state.leftDate, picker.type.value));
    const rightLabel = computed(() => rightLabelComposable(state.rightDate, picker.type.value));

    const enableYearArrow = computed(() => rightYear.value > leftYear.value + YEARS_IN_DECADE);
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

    const leftNextYear = (): void => {
      state.leftDate = addYears(state.leftDate, YEARS_IN_DECADE);
    };
    const leftPrevYear = (): void => {
      state.leftDate = subYears(state.leftDate, YEARS_IN_DECADE);
    };
    const rightNextYear = (): void => {
      state.rightDate = addYears(state.rightDate, YEARS_IN_DECADE);
    };
    const rightPrevYear = (): void => {
      state.rightDate = subYears(state.rightDate, YEARS_IN_DECADE);
    };
    const handleClear = (): void => {
      state.minDate = null;
      state.maxDate = null;
      state.leftDate = new Date();
      state.rightDate = addYears(new Date(), YEARS_IN_DECADE);
      ctx.emit('pick', null);
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

    const handleRangeSelecting = (value: RangeState): void => {
      state.rangeState = value;
    }

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
      rightYear,
      leftYear,
      leftLabel,
      rightLabel,
      enableYearArrow,
      leftPanelClasses,
      rightPanelClasses,
      leftNextYear,
      leftPrevYear,
      rightNextYear,
      rightPrevYear,
      handleClear,
      handleShortcutClick,
      handleRangePick,
      handleRangeSelecting
    }
  },
};
</script>

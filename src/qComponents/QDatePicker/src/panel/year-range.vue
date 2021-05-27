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
            :min-date="minDate"
            :max-date="maxDate"
            :disabled-values="disabledValues"
            :range-state="rangeState"
            selection-mode="range"
            @pick="handleRangePick"
            @changerange="handleChangeRange"
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
            :min-date="minDate"
            :max-date="maxDate"
            :disabled-values="disabledValues"
            selection-mode="range"
            :range-state="rangeState"
            @pick="handleRangePick"
            @changerange="handleChangeRange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addMonths, addYears, getDecade, isDate, subYears } from 'date-fns';
import { reactive, computed, watch, inject } from 'vue';
import isSameMonth from 'date-fns/isSameMonth';
import YearTable from '../tables/year-table.vue';
import focusMixin from './focus-mixin';
import { leftYearComposable } from './composition';
import { YearRangeInterface, YearRangeState } from './types';

const YEARS_IN_DECADE = 10;

export default {
  components: { YearTable },
  mixins: [focusMixin],
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    disabledValues: {
      type: Object,
      default: null
    }
  },

  emits: ['pick'],

  setup(props, ctx): YearRangeInterface {
    const state = reactive<YearRangeState>({
      minDate: '',
      maxDate: '',
      leftDate: new Date(),
      rightDate: addYears(new Date(), YEARS_IN_DECADE),
      rangeState: {
        endDate: null,
        selecting: false
      },
      shortcuts: null,
      isRanged: true,
      currentView: 'yearrange',
      panelInFocus: null
    });
    
    const picker = inject('qDatePicker');

    const rightYear = computed<number>(() => {
      if (isDate(state.rightDate) && isDate(state.leftDate)) {
        return getDecade(state.rightDate) === getDecade(state.leftDate)
          ? state.leftDate.getFullYear() + YEARS_IN_DECADE
          : state.rightDate.getFullYear();
      }

      return new Date().getFullYear() + YEARS_IN_DECADE;
    })
    
    const leftYear = leftYearComposable(state.leftDate);
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
      enableYearArrow,
      leftPanelClasses,
      rightPanelClasses,
      leftNextYear,
      leftPrevYear,
      rightNextYear,
      rightPrevYear,
      handleClear
    }
  },
};
</script>

<template>
  <div class="q-picker-panel">
    <div class="q-picker-panel__body-wrapper">
      <div class="q-picker-panel__body">
        <slot
          name="sidebar"
          class="q-picker-panel__sidebar"
        />
        <div
          v-if="$slots.sidebar && shortcuts.length"
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
            :min-date="minDate"
            :max-date="maxDate"
            :month="leftMonth"
            :year="leftYear"
            :range-state="rangeState"
            :disabled-values="disabledValues"
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
            :min-date="minDate"
            :max-date="maxDate"
            :range-state="rangeState"
            :disabled-values="disabledValues"
            @pick="handleRangePick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { isDate, addYears, getDecade, addMonths } from 'date-fns';
import { reactive, computed, watch, inject } from 'vue';
import isSameMonth from 'date-fns/isSameMonth';
import MonthTable from '../tables/month-table';
import focusMixin from './focus-mixin';
import { leftYearComposable, handleShortcutClick } from './composition';

import type { MonthRangeState, MonthRangeInterface } from './types';

export default {
  components: { MonthTable },
  mixins: [focusMixin],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    disabledValues: {
      type: Object,
      default: null
    }
  },

  emits: ['pick'],

  setup(props, ctx): MonthRangeInterface {
    const state = reactive<MonthRangeState>({
      minDate: '',
      maxDate: '',
      leftDate: new Date(),
      rightDate: addYears(new Date(), 1),
      rangeState: {
        endDate: null,
        selecting: false
      },
      shortcuts: '',
      isRanged: true,
      currentView: 'monthrange',
      panelInFocus: null,
    });

    const picker = inject('qDatePicker');

    const leftPanelClasses = computed<Record<string, boolean>>(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-right-borders': true,
      'q-picker-panel__content_focused': state.panelInFocus === 'left'
    }))

    const rightPanelClasses = computed<Record<string, boolean>>(() => ({
      'q-picker-panel__content': true,
      'q-picker-panel__content_no-left-borders': true,
      'q-picker-panel__content_focused': state.panelInFocus === 'right'
    }))

    const rightYear = computed(() => {
      if (isDate(state.rightDate) && isDate(state.leftDate)) {
        return state.rightDate.getFullYear() === state.leftDate.getFullYear()
          ? state.leftDate.getFullYear() + 1
          : state.rightDate.getFullYear();
      }

      return new Date().getFullYear() + 1;
    });

    const leftYear = leftYearComposable(state.leftDate);

    const enableYearArrow = computed<boolean>(() => rightYear.value > leftYear.value + 1);

    const handleClear = (): void => {
      state.minDate = null;
      state.maxDate = null;
      state.leftDate = new Date();
      state.rightDate = addYears(new Date(), 1);
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
    }, { immediate: true })

    return {
      state,
      leftPanelClasses,
      rightPanelClasses,
      rightYear,
      leftYear,
      enableYearArrow,
      handleClear,
      handleShortcutClick
    }
  },
};
</script>

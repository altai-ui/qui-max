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
            @changerange="handleChangeRange"
            @pick="handleRangePick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isDate, addYears } from 'date-fns';
import MonthTable from '../basic/month-table';
import rangeMixin from './range-mixin';
import focusMixin from './focus-mixin';

export default {
  components: { MonthTable },
  mixins: [rangeMixin, focusMixin],
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
  data() {
    return {
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
      currentView: 'monthrange'
    };
  },

  computed: {
    leftPanelClasses() {
      return {
        'q-picker-panel__content': true,
        'q-picker-panel__content_no-right-borders': true,
        'q-picker-panel__content_focused': this.panelInFocus === 'left'
      };
    },
    rightPanelClasses() {
      return {
        'q-picker-panel__content': true,
        'q-picker-panel__content_no-left-borders': true,
        'q-picker-panel__content_focused': this.panelInFocus === 'right'
      };
    },
    rightYear() {
      if (isDate(this.rightDate) && isDate(this.leftDate)) {
        return this.rightDate.getFullYear() === this.leftDate.getFullYear()
          ? this.leftDate.getFullYear() + 1
          : this.rightDate.getFullYear();
      }

      return new Date().getFullYear() + 1;
    },

    enableYearArrow() {
      return this.rightYear > this.leftYear + 1;
    }
  },

  methods: {
    handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = new Date();
      this.rightDate = addYears(new Date(), 1);
      this.$emit('pick', null);
    }
  }
};
</script>

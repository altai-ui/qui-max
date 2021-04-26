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

<script>
import { addYears, getDecade, isDate, subYears } from 'date-fns';
import YearTable from '../basic/year-table';
import rangeMixin from './range-mixin';
import focusMixin from './focus-mixin';

const YEARS_IN_DECADE = 10;

export default {
  components: { YearTable },
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
      rightDate: addYears(new Date(), YEARS_IN_DECADE),
      rangeState: {
        endDate: null,
        selecting: false
      },
      shortcuts: '',
      isRanged: true,
      currentView: 'yearrange'
    };
  },

  computed: {
    rightYear() {
      if (isDate(this.rightDate) && isDate(this.leftDate)) {
        return getDecade(this.rightDate) === getDecade(this.leftDate)
          ? this.leftDate.getFullYear() + YEARS_IN_DECADE
          : this.rightDate.getFullYear();
      }

      return new Date().getFullYear() + YEARS_IN_DECADE;
    },

    enableYearArrow() {
      return this.rightYear > this.leftYear + YEARS_IN_DECADE;
    },
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
    }
  },

  methods: {
    leftNextYear() {
      this.leftDate = addYears(this.leftDate, YEARS_IN_DECADE);
    },
    leftPrevYear() {
      this.leftDate = subYears(this.leftDate, YEARS_IN_DECADE);
    },
    rightNextYear() {
      this.rightDate = addYears(this.rightDate, YEARS_IN_DECADE);
    },
    rightPrevYear() {
      this.rightDate = subYears(this.rightDate, YEARS_IN_DECADE);
    },
    handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = new Date();
      this.rightDate = addYears(new Date(), YEARS_IN_DECADE);
      this.$emit('pick', null);
    }
  }
};
</script>

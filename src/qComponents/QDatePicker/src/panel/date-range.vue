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

<script>
import { addMonths, isDate, isSameDay, isSameMonth, subMonths } from 'date-fns';
import DateTable from '../basic/date-table';
import rangeMixin from './range-mixin';
import focusMixin from './focus-mixin';
import focusTimeMixin from './focus-time-mixin';
import { setTimeToDate } from '../helpers';
import { addZero } from '../../../helpers/dateHelpers';
import TimePanel from '../../../QTimePicker/src/components/panel';

const MONTHS_COUNT = 12;

export default {
  name: 'QDatePickerPanelDateRange',
  components: { DateTable, TimePanel },
  mixins: [rangeMixin, focusMixin, focusTimeMixin],
  props: {
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    visible: {
      type: Boolean,
      default: false
    },

    value: {
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

  data() {
    return {
      minDate: '',
      maxDate: '',
      leftDate: new Date(),
      rightDate: addMonths(new Date(), 1),
      rangeState: {
        endDate: null,
        selecting: false
      },
      isRanged: true
    };
  },

  computed: {
    transformedValue() {
      if (Array.isArray(this.value)) {
        return this.value;
      }

      return [];
    },
    disabledRightTimeValues() {
      const values = { ...this.disabledValues.time };
      if (
        isSameDay(this.transformedValue[0], this.transformedValue[1]) &&
        this.parsedLeftTime
      ) {
        values.to = Object.values(this.parsedLeftTime).join(':');
      }
      return values;
    },

    isLeftTimeDisabled() {
      return !this.transformedValue[0];
    },
    parsedLeftTime() {
      const value = this.transformedValue[0];
      if (isDate(value)) {
        return {
          hours: addZero(value.getHours()),
          minutes: addZero(value.getMinutes()),
          seconds: addZero(value.getSeconds())
        };
      }

      return value;
    },

    parsedRightTime() {
      const value = this.transformedValue[1] ?? null;
      if (isDate(value)) {
        return {
          hours: addZero(value.getHours()),
          minutes: addZero(value.getMinutes()),
          seconds: addZero(value.getSeconds())
        };
      }

      return value ?? null;
    },

    rightPanelClasses() {
      return {
        'q-picker-panel__content': true,
        'q-picker-panel__content_no-left-borders': true,
        'q-picker-panel__content_no-right-borders': this.showTime,
        'q-picker-panel__content_focused': this.panelInFocus === 'right'
      };
    },
    leftPanelClasses() {
      return {
        'q-picker-panel__content': true,
        'q-picker-panel__content_no-left-borders':
          this.$slots.sidebar || this.shortcuts.length,
        'q-picker-panel__content_no-right-borders': true,
        'q-picker-panel__content_focused': this.panelInFocus === 'left'
      };
    },

    rightYear() {
      return this.rightDate.getFullYear();
    },

    enableMonthArrow() {
      const nextMonth = (this.leftMonth + 1) % 12;
      const yearOffset = this.leftMonth + 1 >= 12 ? 1 : 0;
      return (
        new Date(this.leftYear + yearOffset, nextMonth) <
        new Date(this.rightYear, this.rightMonth)
      );
    },

    enableYearArrow() {
      return (
        this.rightYear * MONTHS_COUNT +
          this.rightMonth -
          (this.leftYear * MONTHS_COUNT + this.leftMonth + 1) >=
        MONTHS_COUNT
      );
    }
  },

  watch: {
    visible() {
      if (this.transformedValue.length) {
        if (isDate(this.transformedValue[0])) {
          this.leftDate = this.transformedValue[0];
        }

        if (isDate(this.transformedValue[1])) {
          this.rightDate = this.transformedValue[1];
        }
      }

      if (isSameMonth(this.leftDate, this.rightDate)) {
        this.rightDate = addMonths(this.leftDate, 1);
      }
    }
  },

  methods: {
    handleLeftTimeChange({ value, type }) {
      let rightTime = this.transformedValue[1] || new Date();
      const newDate = setTimeToDate(
        this.transformedValue[0] || new Date(),
        type,
        value
      );

      if (newDate.getTime() > rightTime.getTime()) {
        rightTime = newDate;
      }

      this.$emit('pick', [newDate, rightTime], { hidePicker: false });
    },

    handleRightTimeChange({ value, type }) {
      const leftTime = this.transformedValue[0] || new Date();
      const newDate = setTimeToDate(
        this.transformedValue[1] || new Date(),
        type,
        value
      );

      this.$emit('pick', [leftTime, newDate], { hidePicker: false });
    },

    handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = new Date();
      this.rightDate = addMonths(new Date(), 1);
      this.$emit('pick', null);
    },

    handleLeftPrevMonthClick() {
      this.leftDate = subMonths(this.leftDate, 1);
    },

    handleRightNextMonthClick() {
      this.rightDate = addMonths(this.rightDate, 1);
    },

    handleLeftNextMonthClick() {
      this.leftDate = addMonths(this.leftDate, 1);
    },

    handleRightPrevMonthClick() {
      this.rightDate = subMonths(this.rightDate, 1);
    }
  }
};
</script>

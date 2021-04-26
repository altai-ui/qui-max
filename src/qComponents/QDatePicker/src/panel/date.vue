<template>
  <div class="q-picker-panel">
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
        ref="datePanel"
        :class="panelContentClasses"
      >
        <div class="q-picker-panel__header">
          <button
            type="button"
            :title="$t('QDatePicker.prevYear')"
            class="q-picker-panel__icon-btn q-icon-double-triangle-left"
            @click="handlePrevYearClick"
          />
          <button
            v-show="currentView === 'date'"
            type="button"
            :title="$t('QDatePicker.prevMonth')"
            class="q-picker-panel__icon-btn q-icon-triangle-left"
            @click="handlePrevMonthClick"
          />
          <div class="q-picker-panel__header-sign">
            <span
              v-show="currentView === 'date'"
              role="button"
              class="q-picker-panel__header-label"
              :class="{ active: currentView === 'month' }"
              @click="showMonthPicker"
            >
              {{ currentMonth }}
            </span>
            <span
              role="button"
              class="q-picker-panel__header-label"
              @click="showYearPicker"
            >
              {{ yearLabel }}
            </span>
          </div>
          <button
            v-show="currentView === 'date'"
            type="button"
            :title="$t('QDatePicker.nextMonth')"
            class="q-picker-panel__icon-btn q-icon-triangle-right"
            @click="handleNextMonthClick"
          />
          <button
            type="button"
            :title="$t('QDatePicker.nextYear')"
            class="q-picker-panel__icon-btn q-icon-double-triangle-right"
            @click="handleNextYearClick"
          />
        </div>

        <date-table
          v-if="currentView === 'date'"
          :selection-mode="selectionMode"
          :first-day-of-week="firstDayOfWeek"
          :value="value"
          :year="year"
          :month="month"
          :disabled-values="disabledValues"
          @pick="handleDatePick"
        />
        <year-table
          v-if="currentView === 'year'"
          :value="value"
          :year="year"
          :disabled-values="disabledValues"
          @pick="handleYearPick"
        />
        <month-table
          v-if="currentView === 'month'"
          :value="value"
          :month="month"
          :year="year"
          :disabled-values="disabledValues"
          @pick="handleMonthPick"
        />
      </div>
      <div
        v-if="showTime && currentView === 'date'"
        class="q-picker-panel__timepickers"
      >
        <time-panel
          ref="timePanel"
          class="time-panel_no-left-borders"
          :value="parsedTime"
          :disabled-values="disabledValues"
          :panel-in-focus="panelInFocus === 'time'"
          @change="handleTimeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { isDate, subMonths, addMonths, subYears, addYears } from 'date-fns';
import { clearTime, clearMilliseconds, setTimeToDate } from '../helpers';
import { addZero } from '../../../helpers/dateHelpers';
import TimePanel from '../../../QTimePicker/src/components/panel';
import YearTable from '../basic/year-table';
import MonthTable from '../basic/month-table';
import DateTable from '../basic/date-table';
import focusMixin from './focus-mixin';
import focusTimeMixin from './focus-time-mixin';

export default {
  name: 'QDatePickerPanelDate',
  components: {
    TimePanel,
    YearTable,
    MonthTable,
    DateTable
  },
  mixins: [focusMixin, focusTimeMixin],
  props: {
    firstDayOfWeek: {
      type: Number,
      default: 1
    },

    type: {
      type: String,
      default: 'date'
    },

    shortcuts: {
      type: Array,
      default: () => []
    },

    disabledValues: {
      type: Object,
      default: null
    },

    showTime: {
      type: Boolean,
      default: false
    },

    value: {
      type: [Object, Array, Date, String],
      default: null
    }
  },

  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      currentView: 'date',
      isRanged: false
    };
  },

  computed: {
    panelContentClasses() {
      return {
        'q-picker-panel__content': true,
        'q-picker-panel__content_no-right-borders': this.showTime,
        'q-picker-panel__content_focused': this.panelInFocus === 'date'
      };
    },
    parsedTime() {
      if (isDate(this.value)) {
        return {
          hours: addZero(this.value.getHours()),
          minutes: addZero(this.value.getMinutes()),
          seconds: addZero(this.value.getSeconds())
        };
      }

      return null;
    },

    selectionMode() {
      return this.type ?? 'day';
    },

    currentMonth() {
      const formatter = new Intl.DateTimeFormat(this.$Q.locale, {
        month: 'short'
      });
      return formatter.format(new Date(this.year, this.month));
    },

    yearLabel() {
      if (this.currentView === 'year') {
        const startYear = Math.floor(this.year / 10) * 10;
        return `${startYear} - ${startYear + 9}`;
      }
      return this.year;
    }
  },

  watch: {
    type: {
      handler(value) {
        let currentView;
        switch (value) {
          case 'week':
          case 'date':
          case 'datetime':
            currentView = 'date';
            break;
          default:
            currentView = value;
        }
        this.currentView = currentView;
      },
      immediate: true
    },

    value(date) {
      if (isDate(date)) {
        this.year = date.getFullYear();
        this.month = date.getMonth();
      } else {
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();
      }
    }
  },

  created() {
    if (isDate(this.value)) {
      this.year = this.value.getFullYear();
      this.month = this.value.getMonth();
    }
  },

  methods: {
    handleTimeChange({ type, value }) {
      const newDate = setTimeToDate(this.value || new Date(), type, value);

      this.emit(newDate, { hidePicker: false });
    },

    emit(value, ...args) {
      if (Array.isArray(value)) {
        const dates = value.map(date =>
          this.showTime ? clearMilliseconds(date) : clearTime(date)
        );
        this.$emit('pick', dates, ...args);
      } else {
        this.$emit('pick', value, ...args);
      }
    },

    showMonthPicker() {
      this.currentView = 'month';
    },

    showYearPicker() {
      this.currentView = 'year';
    },

    showDatePicker() {
      this.currentView = 'date';
    },

    handlePrevMonthClick() {
      const year = this.year;
      if (this.month === 0) {
        this.year -= 1;
      }
      this.month = subMonths(new Date(year, this.month), 1).getMonth();
    },

    handleNextMonthClick() {
      const year = this.year;
      if (this.month === 11) {
        this.year += 1;
      }
      this.month = addMonths(new Date(year, this.month), 1).getMonth();
    },

    handlePrevYearClick() {
      if (this.currentView === 'year') {
        this.year = subYears(new Date(this.year, this.month), 10).getFullYear();
      } else {
        this.year = subYears(new Date(this.year, this.month), 1).getFullYear();
      }
    },

    handleNextYearClick() {
      if (this.currentView === 'year') {
        this.year = addYears(new Date(this.year, 1), 10).getFullYear();
      } else {
        this.year = addYears(new Date(this.year, 1), 1).getFullYear();
      }
    },

    handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },

    handleMonthPick(month, year) {
      if (this.selectionMode === 'month') {
        this.emit(new Date(year, month, 1));
      } else if (isDate(this.value) && !Array.isArray(this.value)) {
        this.emit(new Date(year, month, this.value.getDate()));
        this.showDatePicker();
      } else {
        this.month = month;
        this.year = year;
        this.showDatePicker();
      }
    },

    handleDatePick(value) {
      this.emit(value, { hidePicker: !this.showTime }); // set false to keep panel open
    },

    handleYearPick(year) {
      if (this.selectionMode === 'year') {
        this.emit(year);
      } else if (isDate(this.value) && !Array.isArray(this.value)) {
        this.emit(
          new Date(
            year.getFullYear(),
            this.value.getMonth(),
            this.value.getDate()
          )
        );
        this.showDatePicker();
      } else {
        this.year = year.getFullYear();
        this.showMonthPicker();
      }
    }
  }
};
</script>

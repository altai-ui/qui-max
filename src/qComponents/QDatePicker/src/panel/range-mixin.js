import {
  subYears,
  addYears,
  isDate,
  startOfDecade,
  endOfDecade,
  isSameMonth,
  addMonths,
  getDecade,
  endOfDay
} from 'date-fns';

import { isTimeValueValid } from '../../../helpers/dateHelpers';

export default {
  inject: {
    picker: {
      default: null
    }
  },
  computed: {
    btnDisabled() {
      return !(
        this.minDate &&
        this.maxDate &&
        !this.selecting &&
        this.isValidValue([this.minDate, this.maxDate])
      );
    },

    leftLabel() {
      if (this.$parent.type === 'yearrange') {
        return `${startOfDecade(this.leftDate).getFullYear()} - ${endOfDecade(
          this.leftDate
        ).getFullYear()}`;
      }
      const formatter = new Intl.DateTimeFormat(this.$Q.locale, {
        month: 'short'
      });

      return `${formatter.format(
        this.leftDate
      )} ${this.leftDate.getFullYear()}`;
    },

    rightLabel() {
      if (this.$parent.type === 'yearrange') {
        return `${startOfDecade(this.rightDate).getFullYear()} - ${endOfDecade(
          this.rightDate
        ).getFullYear()}`;
      }

      const formatter = new Intl.DateTimeFormat(this.$Q.locale, {
        month: 'short'
      });

      return `${formatter.format(
        this.rightDate
      )} ${this.rightDate.getFullYear()}`;
    },

    leftYear() {
      if (isDate(this.leftDate)) {
        return this.leftDate.getFullYear();
      }
      return new Date().getFullYear();
    },

    leftMonth() {
      if (isDate(this.leftDate)) {
        return this.leftDate.getMonth();
      }
      return new Date().getMonth();
    },

    rightMonth() {
      if (isDate(this.rightDate)) {
        return this.rightDate.getMonth();
      }
      return new Date().getMonth() + 1;
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal || !newVal?.length) {
          this.handleClear();
        } else {
          this.minDate = newVal[0];
          this.maxDate = newVal[1];
          switch (this.$parent.type) {
            case 'yearrange': {
              if (getDecade(this.minDate) === getDecade(this.maxDate)) {
                this.leftDate = this.minDate;
                this.rightDate = addYears(this.minDate, 10);
              }
              break;
            }
            default: {
              if (isSameMonth(this.minDate, this.maxDate)) {
                this.leftDate = this.minDate;
                this.rightDate = addMonths(this.minDate, 1);
              } else {
                this.leftDate = this.minDate;
                this.rightDate = this.maxDate;
              }
            }
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    handleLeftPrevYearClick() {
      this.leftDate = subYears(this.leftDate, 1);
    },

    handleRightNextYearClick() {
      this.rightDate = addYears(this.rightDate, 1);
    },

    handleLeftNextYearClick() {
      this.leftDate = addYears(this.leftDate, 1);
    },

    handleRightPrevYearClick() {
      this.rightDate = subYears(this.rightDate, 1);
    },

    handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },

    handleRangePick(val, close = true) {
      if (this.maxDate === val.maxDate && this.minDate === val.minDate) {
        return;
      }

      if (isDate(val.maxDate)) {
        // eslint-disable-next-line no-param-reassign
        val.maxDate = endOfDay(val.maxDate);
      }

      if (val.rangeState) {
        this.rangeState = val.rangeState;
      }

      this.maxDate = val.maxDate;
      this.minDate = val.minDate;
      const to = this.disabledValues?.time?.to;

      if (this.maxDate && to && isTimeValueValid(to)) {
        const [hours, minutes, seconds] = to.split(':');
        this.minDate.setHours(Number(hours));
        this.minDate.setMinutes(Number(minutes));
        this.minDate.setSeconds(Number(seconds));
        this.maxDate.setHours(Number(hours));
        this.maxDate.setMinutes(Number(minutes));
        this.maxDate.setSeconds(Number(seconds));
      }

      // emit QDatepicker intermediate value
      this.picker?.$emit('rangepick', val);

      if (!close) return;
      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$emit('pick', [this.minDate, this.maxDate], {
          hidePicker: !this.showTime
        });
      }
    },

    handleChangeRange(val) {
      this.minDate = val.minDate;
      this.maxDate = val.maxDate;
      this.rangeState = val.rangeState;
    },

    isValidValue(value) {
      return (
        Array.isArray(value) &&
        value &&
        value[0] &&
        value[1] &&
        isDate(value[0]) &&
        isDate(value[1]) &&
        value[0].getTime() <= value[1].getTime()
      );
    }
  }
};

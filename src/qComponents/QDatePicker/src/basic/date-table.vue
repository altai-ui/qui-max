<template>
  <table
    cellspacing="10"
    cellpadding="2"
    class="q-date-table"
    @mousemove="handleMouseMove"
  >
    <thead>
      <tr>
        <th
          v-for="day in days"
          :key="day"
          class="q-date-table_days"
        >
          {{ day }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, key) in rows"
        :key="key"
        class="q-date-table__row"
      >
        <td
          v-for="(cell, index) in row"
          :key="index"
          class="q-date-table__cell-wrapper"
        >
          <button
            :class="getCellClasses(cell)"
            type="button"
            tabindex="-1"
            @click="handleClick(cell)"
          >
            {{ cell.text }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isBefore,
  isAfter,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  isToday,
  isDate
} from 'date-fns';
import { ru, enGB as en } from 'date-fns/locale';

const locales = { ru, en };

const checkDisabled = ({ date }, disabledValues) => {
  if (!disabledValues) return false;
  const disabled = [];
  if (Array.isArray(disabledValues.ranges)) {
    disabledValues.ranges.forEach(({ start, end }) => {
      disabled.push(
        isWithinInterval(date, {
          start,
          end
        })
      );
    });
  }

  if (isDate(disabledValues.to) && disabledValues.to) {
    disabled.push(isBefore(date, disabledValues.to));
  }

  if (isDate(disabledValues.from) && disabledValues.from) {
    disabled.push(isAfter(date, disabledValues.from));
  }

  return disabled.some(Boolean);
};

export default {
  props: {
    firstDayOfWeek: {
      default: 1,
      type: Number
    },

    disabledValues: {
      type: Object,
      default: null
    },

    year: {
      type: [String, Number],
      default: new Date().getFullYear()
    },
    month: {
      type: [String, Number],
      default: new Date().getMonth()
    },

    value: { type: [Array, String, Date], default: null },

    selectionMode: {
      type: String,
      default: 'date'
    },

    minDate: { type: [Date, String], default: null },

    maxDate: { type: [Date, String], default: null },

    rangeState: {
      type: Object,
      default() {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },

  data() {
    return {
      lastRow: null,
      lastColumn: null,
      tableRows: [[], [], [], [], [], []]
    };
  },

  computed: {
    offsetDay() {
      const week = this.firstDayOfWeek;
      return week > 3 ? 7 - week : -week;
    },

    days() {
      const DAYS_OF_WEEK = [...Array(7).keys()].map(i => {
        return locales[this.$Q.locale].localize.day(i, { width: 'short' });
      });

      const day = this.firstDayOfWeek;
      return [...DAYS_OF_WEEK, ...DAYS_OF_WEEK].slice(day, day + 7);
    },

    startMonthDate() {
      return startOfMonth(new Date(this.year, this.month, 1));
    },

    endMonthDate() {
      return endOfMonth(new Date(this.year, this.month, 1));
    },

    rows() {
      const date = new Date(this.year, this.month, 1);
      const firstDay = this.startMonthDate.getDay();
      const dateCountOfMonth = getDaysInMonth(date);
      const dateCountOfLastMonth = getDaysInMonth(
        new Date(this.year, this.month === 0 ? 11 : this.month - 1)
      );

      const offset = this.offsetDay;
      let count = 1;

      return this.tableRows.map((row, i) => {
        const newRow = [];
        for (let j = 0; j < 7; j += 1) {
          const cell = {
            row: i,
            column: j,
            type: 'normal',
            inRange: false,
            start: false,
            end: false
          };

          if (i === 0 || i === 1) {
            const numberOfDaysFromPreviousMonth =
              firstDay + offset < 0 ? 7 + firstDay + offset : firstDay + offset;

            if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
              cell.text = count;
              count += 1;
              cell.date = new Date(this.year, this.month, cell.text);
            } else {
              cell.text =
                dateCountOfLastMonth -
                (numberOfDaysFromPreviousMonth - (j % 7)) +
                1 +
                i * 7;
              cell.type = 'prev-month';
              cell.date = new Date(this.year, this.month - 1, cell.text);
            }
          } else if (count <= dateCountOfMonth) {
            cell.text = count;
            count += 1;
            cell.date = new Date(this.year, this.month, cell.text);
          } else {
            cell.text = count - dateCountOfMonth;
            count += 1;
            cell.type = 'next-month';
            cell.date = new Date(this.year, this.month + 1, cell.text);
          }

          let maxDate = this.maxDate;
          let minDate = this.minDate;
          if (this.rangeState.selecting) {
            maxDate = this.rangeState.endDate;
          }

          minDate = minDate?.getTime() ?? null;
          maxDate = maxDate?.getTime() ?? minDate;
          [minDate, maxDate] = [
            Math.min(minDate, maxDate),
            Math.max(minDate, maxDate)
          ];

          cell.inRange =
            minDate &&
            cell.date.getTime() >= minDate &&
            cell.date.getTime() <= maxDate;

          if (isToday(cell.date)) {
            if (!['prev-month', 'next-month'].includes(cell.type)) {
              cell.type = 'today';
            }
          }

          cell.disabled = checkDisabled(cell, this.disabledValues);
          newRow.push(cell);
        }

        return newRow;
      });
    }
  },

  methods: {
    getCellClasses(cell) {
      const classes = ['cell', 'cell_date'];
      if (['today', 'prev-month', 'next-month'].includes(cell.type)) {
        classes.push(`cell_${cell.type}`);
      }

      if (
        ['normal', 'today'].includes(cell.type) &&
        this.value &&
        isSameDay(cell.date, this.value)
      ) {
        classes.push('cell_current');
      }

      if (
        cell.inRange ||
        (this.minDate && isSameDay(cell.date, this.minDate)) ||
        (this.maxDate && isSameDay(cell.date, this.maxDate)) ||
        (this.selectionMode === 'week' &&
          this.value &&
          isWithinInterval(cell.date, {
            start: startOfWeek(this.value, { weekStartsOn: 1 }),
            end: endOfWeek(this.value, { weekStartsOn: 1 })
          }))
      ) {
        classes.push('cell_in-range');
      }

      if (cell.disabled) {
        classes.push('cell_disabled');
      }

      return classes;
    },

    handleMouseMove(event) {
      if (!this.rangeState.selecting) return;
      let target = event.target;
      if (target.tagName === 'BUTTON') {
        target = target.parentNode;
      }

      if (target.tagName !== 'TD') return;

      const row = target.parentNode.rowIndex - 1;
      const column = target.cellIndex;
      // can not select disabled date
      if (this.rows[row]?.[column].disabled) return;

      // only update rangeState when mouse moves to a new cell
      // this avoids frequent Date object creation and improves performance
      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row;
        this.lastColumn = column;
        this.$emit('changerange', {
          minDate: this.minDate,
          maxDate: this.maxDate,
          rangeState: {
            selecting: true,
            endDate: this.rows[row][column].date
          }
        });
      }
    },

    handleClick(cell) {
      if (cell.disabled || cell.type === 'week') return;
      const newDate = cell.date;

      if (this.selectionMode === 'range') {
        if (!this.rangeState.selecting) {
          this.$emit('pick', { minDate: newDate, maxDate: null });
          this.rangeState.selecting = true;
        } else {
          if (newDate >= this.minDate) {
            this.$emit('pick', { minDate: this.minDate, maxDate: newDate });
          } else {
            this.$emit('pick', { minDate: newDate, maxDate: this.minDate });
          }
          this.rangeState.selecting = false;
        }
      } else if (this.selectionMode === 'day') {
        this.$emit('pick', newDate);
      } else if (this.selectionMode === 'datetime') {
        this.$emit('pick', newDate, { hidePicker: false });
      } else if (this.selectionMode === 'week') {
        const value = startOfWeek(newDate, { weekStartsOn: 1 });
        this.$emit('pick', value);
      } else if (this.selectionMode === 'dates') {
        const value = this.value || [];
        const newValue = [...value, newDate];
        this.$emit('pick', newValue);
      } else {
        this.$emit('pick', newDate);
      }
    }
  }
};
</script>

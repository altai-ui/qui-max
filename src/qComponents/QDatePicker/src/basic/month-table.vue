<template>
  <table
    cellspacing="4"
    cellpadding="5"
    class="q-month-table"
    @mousemove="handleMouseMove"
  >
    <tr
      v-for="(row, index) in rows"
      :key="index"
    >
      <td
        v-for="(cell, key) in row"
        :key="key"
        class="q-month-table__cell-wrapper"
      >
        <button
          :class="getCellClasses(cell)"
          :disabled="cell.disabled"
          type="button"
          tabindex="-1"
          @click="handleMonthTableClick(cell)"
        >
          {{ getMonthName(cell.text) }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
import { startOfMonth, isSameMonth, isBefore, isAfter } from 'date-fns';
import { formatLocalDate } from '../helpers';

const checkDisabled = ({ date }, disabledValues) => {
  if (!disabledValues) return false;
  const disabled = [];
  if (Array.isArray(disabledValues.ranges)) {
    disabledValues.ranges.forEach(range => {
      disabled.push(
        (isSameMonth(date, range.start) || isBefore(range.start, date)) &&
          (isAfter(range.end, date) || isSameMonth(range.end, date))
      );
    });
  }

  if (disabledValues.to) {
    disabled.push(isBefore(date, disabledValues.to));
  }

  if (disabledValues.from) {
    disabled.push(isAfter(date, disabledValues.from));
  }

  return disabled.some(Boolean);
};

export default {
  props: {
    disabledValues: {
      type: Object,
      default: null
    },
    value: { type: [Date, String], default: null },
    selectionMode: {
      type: String,
      default: 'month'
    },
    minDate: { type: [Date, String], default: null },
    maxDate: { type: [Date, String], default: null },
    year: {
      type: [String, Number],
      default: new Date().getFullYear()
    },
    month: {
      type: [String, Number],
      default: new Date().getMonth()
    },
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
      tableRows: [[], [], []],
      lastRow: null,
      lastColumn: null
    };
  },

  computed: {
    rows() {
      // TODO: refactory rows / getCellClasses
      const rows = this.tableRows;

      return rows.map((row, i) => {
        const newRow = [];
        for (let j = 0; j < 4; j += 1) {
          const cell = {
            row: i,
            column: j,
            type: 'normal',
            inRange: false,
            start: false,
            end: false
          };
          cell.type = 'normal';

          const index = i * 4 + j;

          cell.text = index;
          cell.month = startOfMonth(new Date(this.year, index));
          cell.disabled = checkDisabled(
            { date: cell.month },
            this.disabledValues
          );

          let maxDate = this.maxDate;
          let minDate = this.minDate;

          if (this.rangeState.selecting) {
            maxDate = this.rangeState.endDate;
          }

          minDate = startOfMonth(minDate);
          maxDate = maxDate ? startOfMonth(maxDate) : minDate;

          [minDate, maxDate] = [
            Math.min(minDate, maxDate),
            Math.max(minDate, maxDate)
          ];

          cell.inRange =
            minDate &&
            cell.month.getTime() >= minDate &&
            cell.month.getTime() <= maxDate;

          if (isSameMonth(cell.month, new Date())) {
            cell.type = 'today';
          }

          newRow.push(cell);
        }

        return newRow;
      });
    }
  },

  methods: {
    getMonthName(monthIndex) {
      return formatLocalDate(
        new Date(this.year, monthIndex, 1),
        'MMM',
        this.$Q.locale
      );
    },

    getCellClasses(cell) {
      const classes = ['cell', 'cell_month'];
      if (this.value && isSameMonth(this.value, cell.month))
        classes.push('cell_current');
      if (cell.type === 'today') classes.push('cell_today');

      if (cell.inRange) {
        classes.push('cell_in-range');
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

      const row = target.parentNode.rowIndex;
      const column = target.cellIndex;
      // can not select disabled date
      if (this.rows[row][column].disabled) return;

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
            endDate: new Date(this.year, row * 4 + column, 1)
          }
        });
      }
    },

    handleMonthTableClick(cell) {
      if (cell.disabled) return;
      const month = cell.month.getMonth();
      const newDate = cell.month;
      if (this.selectionMode === 'range') {
        if (!this.rangeState.selecting) {
          this.$emit('pick', {
            minDate: newDate,
            maxDate: null,
            rangeState: { ...this.rangeState, selecting: true }
          });
        } else if (newDate >= this.minDate) {
          this.$emit('pick', {
            minDate: this.minDate,
            maxDate: newDate,
            rangeState: { ...this.rangeState, selecting: false }
          });
        } else {
          this.$emit('pick', {
            minDate: newDate,
            maxDate: this.minDate,
            rangeState: { ...this.rangeState, selecting: false }
          });
        }
      } else {
        this.$emit('pick', month, this.year);
      }
    }
  }
};
</script>

<template>
  <table
    cellspacing="4"
    cellpadding="5"
    class="q-year-table"
  >
    <tr
      v-for="(row, key) in rows"
      :key="key"
    >
      <td
        v-for="(cell, index) in row"
        :key="index"
        class="q-year-table__cell-wrapper"
        @mousemove="event => handleMouseMove(event, cell)"
        @click="event => handleYearTableClick(event, cell)"
      >
        <button
          :class="getCellClasses(cell)"
          :disabled="cell.disabled"
          type="button"
          tabindex="-1"
        >
          {{ cell.year.getFullYear() }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
import {
  isSameYear,
  addYears,
  isDate,
  startOfMonth,
  startOfDecade,
  isBefore,
  isAfter
} from 'date-fns';

const checkDisabled = (year, disabledValues) => {
  if (!disabledValues) return false;
  const disabled = [];
  if (Array.isArray(disabledValues.ranges)) {
    disabledValues.ranges.forEach(range => {
      disabled.push(
        (isSameYear(year, range.start) || isBefore(range.start, year)) &&
          (isAfter(range.end, year) || isSameYear(range.end, year))
      );
    });
  }

  if (disabledValues.to) {
    disabled.push(isBefore(year, disabledValues.to));
  }

  if (disabledValues.from) {
    disabled.push(isAfter(year, disabledValues.from));
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
    year: { type: [String, Number], default: '' },
    selectionMode: {
      type: String,
      default: 'year'
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
      tableRows: [[], [], []],
      lastHoveredCell: null
    };
  },

  computed: {
    startYear() {
      if (this.year) {
        return startOfDecade(new Date(this.year, 0, 1));
      }

      return startOfDecade(new Date());
    },
    rows() {
      let startYear = this.startYear;
      return this.tableRows.map((row, i) => {
        const newRow = [];
        const cellCount = i < 2 ? 4 : 2;
        for (let j = 0; j < cellCount; j += 1) {
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
          newRow.push({
            year: startYear,
            disabled: checkDisabled(startYear, this.disabledValues),
            inRange:
              minDate &&
              startYear.getTime() >= minDate &&
              startYear.getTime() <= maxDate
          });

          startYear = addYears(startYear, 1);
        }

        return newRow;
      });
    }
  },

  methods: {
    handleMouseMove(event, { year }) {
      // update data only different cell's hover
      if (event.target === this.lastHoveredCell) return;
      this.lastHoveredCell = event.target;
      if (!this.rangeState.selecting) return;
      this.$emit('changerange', {
        minDate: this.minDate,
        maxDate: this.maxDate,
        rangeState: {
          selecting: true,
          endDate: year
        }
      });
    },

    getCellClasses(cell) {
      const style = ['cell', 'cell_year'];
      if (this.selectionMode === 'year') {
        if (
          isDate(this.value) &&
          this.value.getFullYear() === cell.year.getFullYear()
        )
          style.push('cell_current');
        if (new Date().getFullYear() === cell.year.getFullYear())
          style.push('cell_today');
      } else {
        if (cell.inRange) style.push('cell_in-range');

        if (isSameYear(cell.year, new Date())) {
          style.push('cell_today');
        }
      }

      return style;
    },

    handleYearTableClick(event, { year }) {
      if (this.selectionMode === 'range') {
        if (!this.rangeState.selecting) {
          this.$emit('pick', {
            minDate: year,
            maxDate: null,
            rangeState: { selecting: true, end: null }
          });
        } else if (year.getTime() >= this.minDate.getTime()) {
          this.$emit('pick', {
            minDate: this.minDate,
            maxDate: year,
            rangeState: { selecting: false, end: null }
          });
        } else {
          this.$emit('pick', {
            minDate: year,
            maxDate: this.minDate,
            rangeState: { selecting: false, end: null }
          });
        }
      } else {
        this.$emit('pick', year);
      }
    }
  }
};
</script>

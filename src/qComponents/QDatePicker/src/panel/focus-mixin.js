const DATE_CELLS_COUNT = 42;
const DATE_CELLS_IN_ROW_COUNT = 7;

const PERIOD_CELLS_IN_ROW_COUNT = 4;

const LEFT_MONTH_PANEL_START_INDEX = 0;
const RIGHT_MONTH_PANEL_START_INDEX = 12;
const RIGHT_YEAR_PANEL_START_INDEX = 10;

export default {
  data() {
    return {
      panelInFocus: null,
      lastFocusedCellIndex: null
    };
  },
  mounted() {
    this.dateCells = this.$el.querySelectorAll('.q-date-table .cell');
    this.monthCells = this.$el.querySelectorAll('.q-month-table .cell');
    this.yearCells = this.$el.querySelectorAll('.q-year-table .cell');
  },

  methods: {
    setPanelFocus() {
      if (this.isRanged) {
        if (this.$refs.leftPanel?.contains(document.activeElement)) {
          this.panelInFocus = 'left';
        } else if (this.$refs.rightPanel?.contains(document.activeElement)) {
          this.panelInFocus = 'right';
        } else if (
          this.$refs.leftTimePanel?.$el.contains(document.activeElement)
        ) {
          this.panelInFocus = 'timeLeft';
        } else if (
          this.$refs.rightTimePanel?.$el.contains(document.activeElement)
        ) {
          this.panelInFocus = 'timeRight';
        }
      } else if (this.$refs.datePanel?.contains(document.activeElement)) {
        this.panelInFocus = 'date';
      } else if (this.$refs.timePanel?.$el.contains(document.activeElement)) {
        this.panelInFocus = 'time';
      } else {
        this.panelInFocus = null;
      }
    },

    navigateDropdown(e) {
      if (e.key !== 'Tab') {
        if (e.target.classList.contains('cell_time')) {
          this.moveWithinTime(e);
        } else if (e.target.classList.contains('cell_date')) {
          this.moveWithinDates(e);
        } else if (e.target.classList.contains('cell_month')) {
          this.moveWithinPeriod({ period: 'month', e });
        } else if (e.target.classList.contains('cell_year')) {
          this.moveWithinPeriod({ period: 'year', e });
        } else if (['monthrange', 'month'].includes(this.currentView)) {
          this.monthCells[0]?.focus();
        } else if (['yearrange', 'year'].includes(this.currentView)) {
          this.yearCells[0]?.focus();
        } else {
          this.dateCells[0]?.focus();
        }
      }

      this.setPanelFocus();
    },

    moveWithinPeriod({ period, e }) {
      let currentNodeIndex;
      let nextNodeIndex;
      const periodCells = period === 'month' ? this.monthCells : this.yearCells;
      const rightPanelStartIndex =
        period === 'month'
          ? RIGHT_MONTH_PANEL_START_INDEX
          : RIGHT_YEAR_PANEL_START_INDEX;
      Array.from(periodCells).some((element, index) => {
        if (document.activeElement === element) {
          currentNodeIndex = index;
          return true;
        }

        return false;
      });

      switch (e.key) {
        case 'ArrowUp': {
          nextNodeIndex = currentNodeIndex - PERIOD_CELLS_IN_ROW_COUNT;
          break;
        }

        case 'ArrowRight':
          if (
            this.isRanged &&
            this.panelInFocus === 'left' &&
            (currentNodeIndex + 1) % PERIOD_CELLS_IN_ROW_COUNT === 0
          ) {
            nextNodeIndex = rightPanelStartIndex;
          } else {
            nextNodeIndex = currentNodeIndex + 1;
          }

          break;

        case 'ArrowLeft':
          if (
            this.isRanged &&
            this.panelInFocus === 'right' &&
            currentNodeIndex % PERIOD_CELLS_IN_ROW_COUNT === 0
          ) {
            nextNodeIndex = LEFT_MONTH_PANEL_START_INDEX + 3;
          } else {
            nextNodeIndex = currentNodeIndex - 1;
          }

          break;

        case 'ArrowDown': {
          nextNodeIndex = currentNodeIndex + PERIOD_CELLS_IN_ROW_COUNT;
          break;
        }
        default:
          break;
      }

      const node = periodCells[nextNodeIndex];
      const newIndex = nextNodeIndex % PERIOD_CELLS_IN_ROW_COUNT;
      if (node) {
        node.focus();
        this.lastFocusedCellIndex = nextNodeIndex;
      } else if (nextNodeIndex > this.lastFocusedCellIndex) {
        if (this.isRanged) {
          this.handleRightNextYearClick();
          this.handleLeftNextYearClick();
        } else {
          this.handleNextYearClick();
        }
        periodCells[newIndex]?.focus();
      } else if (nextNodeIndex < this.lastFocusedCellIndex) {
        if (this.isRanged) {
          this.handleLeftPrevYearClick();
          this.handleRightPrevYearClick();
        } else {
          this.handlePrevYearClick();
        }
      }
    },

    moveWithinDates(e) {
      this.timePanelInFocus = 'left';
      let currentNodeIndex;
      let nextNodeIndex;
      Array.from(this.dateCells).some((element, index) => {
        const isItActiveElement = document.activeElement === element;
        if (isItActiveElement) currentNodeIndex = index;
        return isItActiveElement;
      });

      switch (e.key) {
        case 'ArrowUp': {
          nextNodeIndex = currentNodeIndex - DATE_CELLS_IN_ROW_COUNT;
          break;
        }

        case 'ArrowRight':
          if (this.isRanged) {
            if (
              this.panelInFocus === 'left' &&
              (currentNodeIndex + 1) % DATE_CELLS_IN_ROW_COUNT === 0
            ) {
              nextNodeIndex = DATE_CELLS_COUNT;
              this.setPanelFocus();
              break;
            } else if (
              this.showTime &&
              this.panelInFocus === 'right' &&
              (currentNodeIndex + 1) % DATE_CELLS_IN_ROW_COUNT === 0
            ) {
              this.moveWithinTime();
              return;
            }

            nextNodeIndex = currentNodeIndex + 1;
          } else if (
            this.showTime &&
            (currentNodeIndex + 1) % DATE_CELLS_IN_ROW_COUNT === 0
          ) {
            this.moveWithinTime();
          } else {
            nextNodeIndex = currentNodeIndex + 1;
          }

          break;

        case 'ArrowLeft':
          if (
            this.panelInFocus === 'right' &&
            (currentNodeIndex - DATE_CELLS_IN_ROW_COUNT) %
              DATE_CELLS_IN_ROW_COUNT ===
              0
          ) {
            nextNodeIndex = DATE_CELLS_IN_ROW_COUNT - 1;
            this.setPanelFocus();
          } else {
            nextNodeIndex = currentNodeIndex - 1;
          }

          break;

        case 'ArrowDown': {
          nextNodeIndex = currentNodeIndex + DATE_CELLS_IN_ROW_COUNT;
          break;
        }
        default:
          break;
      }

      const node = this.dateCells[nextNodeIndex];
      const newIndex = nextNodeIndex % DATE_CELLS_IN_ROW_COUNT;
      if (node) {
        node.focus();
        this.lastFocusedCellIndex = nextNodeIndex;
      } else if (nextNodeIndex > this.lastFocusedCellIndex) {
        if (this.isRanged) {
          this.handleRightNextMonthClick();
          this.handleLeftNextMonthClick();
        } else {
          this.handleNextMonthClick();
        }
        this.dateCells[newIndex]?.focus();
      } else if (nextNodeIndex < this.lastFocusedCellIndex) {
        if (this.isRanged) {
          this.handleLeftPrevMonthClick();
          this.handleRightPrevMonthClick();
        } else {
          this.handlePrevMonthClick();
        }
        this.dateCells[DATE_CELLS_COUNT + newIndex]?.focus();
      }
    }
  }
};

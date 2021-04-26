const DATE_CELLS_IN_ROW_COUNT = 7;

const RIGHT_DATE_PANEL_START_INDEX = 42;

const LEFT_TIME_PANEL_HOURS_INDEX = 0;
const LEFT_TIME_PANEL_MINUTES_INDEX = 24;
const LEFT_TIME_PANEL_SECONDS_INDEX = 84;

const RIGHT_TIME_PANEL_HOURS_INDEX = 144;
const RIGHT_TIME_PANEL_MINUTES_INDEX = 168;
const RIGHT_TIME_PANEL_SECONDS_INDEX = 228;

export default {
  mounted() {
    this.timeCells = this.$el.querySelectorAll('.time-panel__pickers .cell');
  },

  methods: {
    moveWithinTime(e) {
      // switch from date
      if (!e) {
        if (this.timeCells[0]?.disabled) return;
        this.timeCells[0].focus();
        this.setPanelFocus();
        // true keyup
      } else {
        let currentNodeIndex;
        let nextNodeIndex;
        this.timeCells.forEach((element, index) => {
          if (document.activeElement === element) {
            currentNodeIndex = index;
          }
        });

        const classList = e.target.classList;

        switch (e.key) {
          case 'ArrowUp': {
            nextNodeIndex = currentNodeIndex - 1;
            break;
          }

          case 'ArrowRight':
            if (this.isRanged) {
              if (this.panelInFocus === 'timeLeft') {
                switch (true) {
                  case classList.contains('cell_hours'):
                    nextNodeIndex = LEFT_TIME_PANEL_MINUTES_INDEX;
                    break;
                  case classList.contains('cell_minutes'):
                    nextNodeIndex = LEFT_TIME_PANEL_SECONDS_INDEX;
                    break;
                  case classList.contains('cell_seconds'):
                    nextNodeIndex = RIGHT_TIME_PANEL_HOURS_INDEX;
                    break;
                  default:
                    break;
                }
              } else if (this.panelInFocus === 'timeRight') {
                switch (true) {
                  case classList.contains('cell_hours'):
                    nextNodeIndex = RIGHT_TIME_PANEL_MINUTES_INDEX;
                    break;
                  case classList.contains('cell_minutes'):
                    nextNodeIndex = RIGHT_TIME_PANEL_SECONDS_INDEX;
                    break;
                  default:
                    break;
                }
              }
              break;
            }

            if (classList.contains('cell_hours')) {
              nextNodeIndex = LEFT_TIME_PANEL_MINUTES_INDEX;
            } else if (classList.contains('cell_minutes')) {
              nextNodeIndex = LEFT_TIME_PANEL_SECONDS_INDEX;
            }
            break;

          case 'ArrowLeft':
            if (this.isRanged) {
              if (this.panelInFocus === 'timeRight') {
                switch (true) {
                  case classList.contains('cell_seconds'):
                    nextNodeIndex = RIGHT_TIME_PANEL_MINUTES_INDEX;
                    break;
                  case classList.contains('cell_minutes'):
                    nextNodeIndex = RIGHT_TIME_PANEL_HOURS_INDEX;
                    break;
                  case classList.contains('cell_hours'):
                    nextNodeIndex = LEFT_TIME_PANEL_SECONDS_INDEX;
                    break;
                  default:
                    break;
                }
              } else if (this.panelInFocus === 'timeLeft') {
                switch (true) {
                  case classList.contains('cell_seconds'):
                    nextNodeIndex = LEFT_TIME_PANEL_MINUTES_INDEX;
                    break;
                  case classList.contains('cell_minutes'):
                    nextNodeIndex = LEFT_TIME_PANEL_HOURS_INDEX;
                    break;
                  case classList.contains('cell_hours'):
                    this.dateCells[RIGHT_DATE_PANEL_START_INDEX + 6]?.focus();
                    break;
                  default:
                    break;
                }

                break;
              }

              if (
                this.panelInFocus === 'timeRight' &&
                classList.contains('cell_seconds')
              ) {
                nextNodeIndex = RIGHT_TIME_PANEL_MINUTES_INDEX;
              } else if (
                this.panelInFocus === 'timeRight' &&
                classList.contains('cell_minutes')
              ) {
                nextNodeIndex = RIGHT_TIME_PANEL_HOURS_INDEX;
              } else if (
                this.panelInFocus === 'timeRight' &&
                classList.contains('cell_hours')
              ) {
                nextNodeIndex = LEFT_TIME_PANEL_SECONDS_INDEX;
              }
            } else if (classList.contains('cell_seconds')) {
              nextNodeIndex = LEFT_TIME_PANEL_MINUTES_INDEX;
            } else if (classList.contains('cell_minutes')) {
              nextNodeIndex = LEFT_TIME_PANEL_HOURS_INDEX;
            } else {
              // switch to dates
              this.dateCells[DATE_CELLS_IN_ROW_COUNT - 1]?.focus();
            }

            break;

          case 'ArrowDown': {
            nextNodeIndex = currentNodeIndex + 1;
            break;
          }
          default:
            break;
        }

        this.timeCells[nextNodeIndex]?.focus();
        this.setPanelFocus();
      }
    }
  }
};

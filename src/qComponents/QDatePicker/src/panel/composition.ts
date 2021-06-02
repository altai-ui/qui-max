import { getConfig } from '@/qComponents/config';
import {
  addYears,
  endOfDay,
  endOfDecade,
  startOfDecade,
  subYears
} from 'date-fns';
import { isDate } from 'lodash-es';
import { RangePickValue, RangeState } from '../Common';
import {
  LEFT_PERIOD_PANEL_START_INDEX,
  PERIOD_CELLS_IN_ROW_COUNT
} from './constants';

const leftYearComposable = (leftDate: Date): number => {
  if (isDate(leftDate)) {
    return leftDate.getFullYear();
  }
  return new Date().getFullYear();
};

const leftMonthComposable = (leftDate: Date): number => {
  if (isDate(leftDate)) {
    return leftDate.getMonth();
  }
  return new Date().getMonth();
};

const rightMonthComposable = (rightDate: Date): number => {
  if (isDate(rightDate)) {
    return rightDate.getMonth();
  }
  return new Date().getMonth() + 1;
};

const rightLabelComposable = (rightDate: Date, type: string): string => {
  if (type === 'yearrange') {
    return `${startOfDecade(rightDate).getFullYear()} - ${endOfDecade(
      rightDate
    ).getFullYear()}`;
  }

  const formatter = new Intl.DateTimeFormat(getConfig('locale'), {
    month: 'short'
  });

  return `${formatter.format(rightDate)} ${rightDate.getFullYear()}`;
};

const leftLabelComposable = (leftDate: Date, type: string): string => {
  if (type === 'yearrange') {
    return `${startOfDecade(leftDate).getFullYear()} - ${endOfDecade(
      leftDate
    ).getFullYear()}`;
  }
  const formatter = new Intl.DateTimeFormat(getConfig('locale'), {
    month: 'short'
  });

  return `${formatter.format(leftDate)} ${leftDate.getFullYear()}`;
};

const useLeftPrevYearClick = (leftDate: Date): Date => subYears(leftDate, 1);
const useRightNextYearClick = (rightDate: Date): Date => addYears(rightDate, 1);
const useLeftNextYearClick = (leftDate: Date): Date => addYears(leftDate, 1);
const useRightPrevYearClick = (rightDate: Date): Date => subYears(rightDate, 1);

const isValidValue = (value: Nullable<Date>[]): boolean => {
  return Boolean(
    Array.isArray(value) &&
      value &&
      value[0] &&
      value[1] &&
      value[0] instanceof Date &&
      value[1] instanceof Date &&
      value[0].getTime() <= value[1].getTime()
  );
};

const getPeriodNextNodeIndex = (
  keyName: string,
  cells: NodeListOf<HTMLElement>,
  panelInFocus: string
): Nullable<number> => {
  let currentNodeIndex: Nullable<number> = null;
  let nextNodeIndex: Nullable<number> = null;
  const cellsCountEachTable = cells.length / 2;
  const cellsGap = cellsCountEachTable === 20 ? 2 : 0;
  Array.from(cells).some((element, index) => {
    if (document.activeElement === element) {
      currentNodeIndex = index;
      return true;
    }

    return false;
  });

  if (currentNodeIndex === null) return null;
  switch (keyName) {
    case 'ArrowUp': {
      nextNodeIndex = currentNodeIndex - PERIOD_CELLS_IN_ROW_COUNT;
      break;
    }

    case 'ArrowRight':
      if (
        panelInFocus === 'left' &&
        (currentNodeIndex + 1) % PERIOD_CELLS_IN_ROW_COUNT === 0
      ) {
        nextNodeIndex = cellsCountEachTable;
      } else {
        nextNodeIndex = currentNodeIndex + 1;
      }
      break;

    case 'ArrowLeft':
      if (
        panelInFocus === 'right' &&
        (currentNodeIndex + cellsGap - cellsCountEachTable) %
          PERIOD_CELLS_IN_ROW_COUNT ===
          0
      ) {
        nextNodeIndex = LEFT_PERIOD_PANEL_START_INDEX + 3;
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

  return nextNodeIndex;
};

const getRangeChangedState = (
  newValue: RangePickValue,
  currentRangeState: RangeState
): {
  maxDate: Nullable<Date>;
  minDate: Nullable<Date>;
  rangeState: RangeState;
} => {
  const newState = {
    maxDate: newValue.maxDate,
    minDate: newValue.minDate,
    rangeState: currentRangeState
  };

  if (newValue.maxDate) {
    newState.maxDate = endOfDay(newValue.maxDate);
  }

  if (newValue.rangeState) {
    newState.rangeState = newValue.rangeState;
  }

  return newState;
};

export {
  leftYearComposable,
  leftMonthComposable,
  rightMonthComposable,
  rightLabelComposable,
  leftLabelComposable,
  useLeftPrevYearClick,
  useRightNextYearClick,
  useLeftNextYearClick,
  useRightPrevYearClick,
  getRangeChangedState,
  getPeriodNextNodeIndex,
  isValidValue
};

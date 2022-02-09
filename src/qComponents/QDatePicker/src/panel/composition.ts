import {
  addYears,
  endOfDay,
  endOfDecade,
  endOfMonth,
  endOfYear,
  startOfDecade,
  subYears
} from 'date-fns';
import { isDate } from 'lodash-es';

import { getConfig } from '@/qComponents/config';
import type { Nullable } from '#/helpers';

import type { RangePickValue, RangeState, RangeType } from '../commonTypes';
import {
  CELLS_COUNT_IN_YEAR_RANGE,
  LEFT_PERIOD_PANEL_START_INDEX,
  PERIOD_CELLS_IN_ROW_COUNT
} from '../constants';

const leftYearComposable = (leftDate: Date): number => {
  if (isDate(leftDate)) {
    return leftDate.getFullYear();
  }
  return new Date().getFullYear();
};

const getActualMonth = (rightDate: Date, correction?: number): number => {
  if (isDate(rightDate)) {
    return rightDate.getMonth();
  }
  return new Date().getMonth() + (correction ?? 0);
};

const getLabelFromDate = (date: Date, type: string): string => {
  if (type === 'yearrange') {
    return `${startOfDecade(date).getFullYear()} - ${endOfDecade(
      date
    ).getFullYear()}`;
  }

  const formatter = new Intl.DateTimeFormat(getConfig('locale'), {
    month: 'short'
  });

  return `${formatter.format(date)} ${date.getFullYear()}`;
};

const useLeftPrevYearClick = (leftDate: Date): Date => subYears(leftDate, 1);
const useRightNextYearClick = (rightDate: Date): Date => addYears(rightDate, 1);
const useLeftNextYearClick = (leftDate: Date): Date => addYears(leftDate, 1);
const useRightPrevYearClick = (rightDate: Date): Date => subYears(rightDate, 1);

const isValidValue = (value: Nullable<Date>[]): boolean => {
  return Boolean(
    Array.isArray(value) &&
      value &&
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
  const cellsGap = cellsCountEachTable === CELLS_COUNT_IN_YEAR_RANGE ? 2 : 0;
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
  currentRangeState: RangeState,
  type: RangeType
): {
  maxDate: Nullable<Date>;
  minDate: Nullable<Date>;
  rangeState: RangeState;
} => {
  let maxDate = null;

  if (newValue.maxDate) {
    switch (type) {
      case 'yearrange':
        maxDate = endOfYear(newValue.maxDate);
        break;
      case 'monthrange':
        maxDate = endOfMonth(newValue.maxDate);
        break;
      case 'daterange':
        maxDate = endOfDay(newValue.maxDate);
        break;
      default:
        maxDate = newValue.maxDate;
    }
  }

  return {
    maxDate: maxDate ?? newValue.maxDate,
    minDate: newValue.minDate,
    rangeState: newValue.rangeState ? newValue.rangeState : currentRangeState
  };
};

export {
  leftYearComposable,
  getActualMonth,
  getLabelFromDate,
  useLeftPrevYearClick,
  useRightNextYearClick,
  useLeftNextYearClick,
  useRightPrevYearClick,
  getRangeChangedState,
  getPeriodNextNodeIndex,
  isValidValue
};

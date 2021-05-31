import { getConfig } from '@/qComponents/config';
import { addYears, endOfDecade, startOfDecade, subYears } from 'date-fns';
import { isDate } from 'lodash-es';

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
const useShortcutClick = (
  shortcut: Record<string, (model: unknown) => void>
): void => {
  if (shortcut.onClick) {
    shortcut.onClick(this);
  }
};

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
  useShortcutClick,
  isValidValue,
};

import { getConfig } from '@/qComponents/config';
import { addYears, endOfDecade, startOfDecade, subYears } from 'date-fns';
import { isDate } from 'lodash-es';
import { computed, ComputedRef } from 'vue';

const leftYearComposable = (leftDate: Date): ComputedRef<number> =>
  computed(() => {
    if (isDate(leftDate)) {
      return leftDate.getFullYear();
    }
    return new Date().getFullYear();
  });

const leftMonthComposable = (leftDate: Date): ComputedRef<number> =>
  computed(() => {
    if (isDate(leftDate)) {
      return leftDate.getMonth();
    }
    return new Date().getMonth();
  });

const rightMonthComposable = (rightDate: Date): ComputedRef<number> =>
  computed(() => {
    if (isDate(rightDate)) {
      return rightDate.getMonth();
    }
    return new Date().getMonth() + 1;
  });

const rightLabelComposable = (
  rightDate: Date,
  type: string
): ComputedRef<string> =>
  computed(() => {
    if (type === 'yearrange') {
      return `${startOfDecade(rightDate).getFullYear()} - ${endOfDecade(
        rightDate
      ).getFullYear()}`;
    }

    const formatter = new Intl.DateTimeFormat(getConfig('locale'), {
      month: 'short'
    });

    return `${formatter.format(rightDate)} ${rightDate.getFullYear()}`;
  });

const leftLabelComposable = (
  leftDate: Date,
  type: string
): ComputedRef<string> =>
  computed(() => {
    if (type === 'yearrange') {
      return `${startOfDecade(leftDate).getFullYear()} - ${endOfDecade(
        leftDate
      ).getFullYear()}`;
    }
    const formatter = new Intl.DateTimeFormat(getConfig('locale'), {
      month: 'short'
    });

    return `${formatter.format(leftDate)} ${leftDate.getFullYear()}`;
  });

const handleLeftPrevYearClick = (leftDate: Date): Date => subYears(leftDate, 1);
const handleRightNextYearClick = (rightDate: Date): Date =>
  addYears(rightDate, 1);
const handleLeftNextYearClick = (leftDate: Date): Date => addYears(leftDate, 1);
const handleRightPrevYearClick = (rightDate: Date): Date =>
  subYears(rightDate, 1);
const handleShortcutClick = (
  shortcut: Record<string, (model: unknown) => void>
): void => {
  if (shortcut.onClick) {
    shortcut.onClick(this);
  }
};

const isValidValue = (value: Nullable<string>[]): boolean => {
  return Boolean(
    Array.isArray(value) &&
      value &&
      value[0] &&
      value[1] &&
      isDate(value[0]) &&
      isDate(value[1]) &&
      value[0].getTime() <= value[1].getTime()
  );
};

export {
  leftYearComposable,
  leftMonthComposable,
  rightMonthComposable,
  rightLabelComposable,
  leftLabelComposable,
  handleLeftPrevYearClick,
  handleRightNextYearClick,
  handleLeftNextYearClick,
  handleRightPrevYearClick,
  handleShortcutClick,
  isValidValue
};

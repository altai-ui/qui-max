import {
  format,
  isValid,
  isWithinInterval,
  parseISO,
  isAfter,
  isBefore,
  isDate
} from 'date-fns';
import { ru, enGB as en, zhHK as zh } from 'date-fns/locale';
import { isString } from 'lodash-es';

import type { Nullable } from '#/helpers';

import type { RangeState } from './commonTypes';
import { MAX_DATE_INPUT_LENGTH } from './constants';
import type {
  QDatePickerPropDisabledValues,
  QDatePickerPropModelValue,
  QDatePickerDateRangeValue,
  Shortcut
} from './types';

const checkDisabled = (
  date: Date,
  disabledValues: QDatePickerPropDisabledValues,
  isSameFn: (dateLeft: number | Date, dateRight: number | Date) => boolean
): boolean => {
  if (!disabledValues) return false;

  const disabled = [];
  if (Array.isArray(disabledValues.ranges)) {
    disabledValues.ranges.forEach((range: Record<string, Date>) => {
      disabled.push(
        (isSameFn(date, range.start) || isBefore(range.start, date)) &&
          (isAfter(range.end, date) || isSameFn(range.end, date))
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

const locales: Record<string, Locale> = { ru, en, zh };

const formatToLocalReadableString = (
  value: Date,
  dateFnsFormat: Nullable<string>,
  dateFnsLocale = 'ru'
): string => {
  return format(value, dateFnsFormat ?? 'dd MMM yyyy', {
    locale: locales[dateFnsLocale]
  });
};

const calcInputData = (data: string, inputType: string): string => {
  const clearVal = data.replace(/[^0-9]/g, '');
  const array = clearVal.split('');
  const options = { separator: '.', maxLength: MAX_DATE_INPUT_LENGTH };

  if (inputType === 'insertText' && !array[array.length - 1]?.match(/[0-9]+/)) {
    return data;
  }

  if (array.length > 1) array.splice(2, 0, options.separator);
  if (array.length > 3 && array.length !== 4) {
    array.splice(5, 0, options.separator);
  }
  if (array.length > options.maxLength) return data;

  if (
    inputType === 'deleteContentBackward' &&
    ['.', ':'].includes(array[array.length - 1])
  ) {
    array.pop();
  }

  return array.join('');
};

const validator = function (val: Nullable<string | string[]>): boolean {
  return Boolean(
    val === null ||
      val === undefined ||
      isString(val) ||
      (Array.isArray(val) && val.length === 2 && val.every(isString))
  );
};

const checkISOIsValid = (isoDate: string): boolean =>
  isValid(parseISO(isoDate));

const convertISOToDate = (value: string | Date): Date =>
  isString(value) ? parseISO(value) : value;

const isValidDateRange = (dates: unknown): dates is [Date, Date] => {
  return (
    Array.isArray(dates) &&
    dates.length === 2 &&
    (dates as []).every((date: unknown) => isDate(date) && isValid(date))
  );
};

const isValidStringDateRange = (dates: unknown): dates is [string, string] => {
  return (
    Array.isArray(dates) &&
    dates.length === 2 &&
    (dates as []).every(
      (date: unknown) => isString(date) && checkISOIsValid(date)
    )
  );
};

const isValidRangeOfDates = (
  range: unknown
): range is QDatePickerDateRangeValue => {
  return isValidDateRange(range) || isValidStringDateRange(range);
};

const isValidMultyrangeOfDates = (
  multyrange: unknown
): multyrange is QDatePickerDateRangeValue[] => {
  return (
    Array.isArray(multyrange) &&
    Boolean(multyrange.length) &&
    (multyrange as []).every(
      (range: unknown) =>
        isValidDateRange(range) || isValidStringDateRange(range)
    )
  );
};

const isShortcut = (shortcut: Shortcut): shortcut is Shortcut => {
  return (
    isString(shortcut.text) && isDate(shortcut.value) && isValid(shortcut.value)
  );
};

const modelValueValidator = (val: QDatePickerPropModelValue): boolean => {
  if (val === null) return true;

  return Boolean(
    (isString(val) && checkISOIsValid(val)) ||
      isValid(val) ||
      isValidRangeOfDates(val) ||
      isValidMultyrangeOfDates(val)
  );
};

const shortcutsValidator = (val: Nullable<Shortcut[]>): boolean => {
  if (val === null) return true;

  return Array.isArray(val) && val.every(isShortcut);
};

const isDateInRangeInterval = (date: Date, rangeState: RangeState): boolean => {
  if (
    !rangeState.selecting ||
    !rangeState.hoveredDate ||
    !rangeState.pickedDate
  )
    return false;

  const hoveredDateNum = rangeState.hoveredDate.getTime();
  const pickedDateNum = rangeState.pickedDate.getTime();
  return isWithinInterval(date, {
    start: Math.min(hoveredDateNum, pickedDateNum),
    end: Math.max(hoveredDateNum, pickedDateNum)
  });
};

export {
  formatToLocalReadableString,
  calcInputData,
  validator,
  modelValueValidator,
  shortcutsValidator,
  checkISOIsValid,
  convertISOToDate,
  isDateInRangeInterval,
  checkDisabled,
  isValidDateRange,
  isValidStringDateRange,
  isValidRangeOfDates,
  isValidMultyrangeOfDates
};

import {
  format,
  isValid,
  isWithinInterval,
  parseISO,
  isAfter,
  isBefore
} from 'date-fns';
import { ru, enGB as en } from 'date-fns/locale';
import { isString } from 'lodash-es';

import type { Nullable } from '#/helpers';

import type { RangeState } from './commonTypes';
import { MAX_DATE_INPUT_LENGTH } from './constants';
import type {
  QDatePickerPropDisabledValues,
  QDatePickerPropModelValue
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

const locales: Record<string, Locale> = { ru, en };

const formatToLocalReadableString = (
  value: Date,
  dateFnsFormat = 'dd MMM yyyy',
  dateFnsLocale = 'ru'
): string => {
  return format(value, dateFnsFormat, {
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

const checkArrayValueIsValid = (value: unknown[]): boolean =>
  Boolean(
    value.length === 2 && value.every(isString) && value.every(checkISOIsValid)
  ) || value.every(isValid);

const modelValueValidator = (val: QDatePickerPropModelValue): boolean => {
  if (val === null) return true;

  return Boolean(
    (isString(val) && checkISOIsValid(val)) ||
      isValid(val) ||
      (Array.isArray(val) && checkArrayValueIsValid(val))
  );
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
  checkArrayValueIsValid,
  convertISOToDate,
  isDateInRangeInterval,
  checkDisabled
};

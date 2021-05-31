import {
  format,
  formatISO,
  isValid,
  isWithinInterval,
  parseISO
} from 'date-fns';
import { ru, enGB as en } from 'date-fns/locale';
import { isString } from 'lodash-es';
import { RangeState } from './Common';
import { QDatePickerPropModelValue } from './QDatePicker';

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

const setTimeToDate = (date: Date, type: string, value: string): Date => {
  switch (type) {
    case 'hours':
      date.setHours(Number(value));
      break;
    case 'minutes':
      date.setMinutes(Number(value));
      break;
    case 'seconds':
      date.setSeconds(Number(value));
      break;
    default:
      break;
  }

  return date;
};

const clearTime = function (date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const clearMilliseconds = (date: Date): Date =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    0
  );

const calcInputData = (
  data: string,
  inputType: string,
  timeLength: number
): string => {
  const clearVal = data.replace(/ |,|:|\./g, '');
  const array = clearVal.split('');
  const options = { separator: '.', maxLength: 10 + timeLength };

  if (inputType === 'insertText' && !array[array.length - 1]?.match(/[0-9]+/))
    return data;

  if (array.length > 1) array.splice(2, 0, options.separator);
  if (array.length > 3 && array.length !== 4)
    array.splice(5, 0, options.separator);
  if (array.length > options.maxLength) return data;

  if (timeLength) {
    if (array.length > 10) array.splice(10, 0, ', ');
    if (array.length > 13) array.splice(13, 0, ':');
    if (array.length > 15) array.splice(16, 0, ':');
  }

  if (
    inputType === 'deleteContentBackward' &&
    ['.', ':'].includes(array[array.length - 1])
  ) {
    array.pop();
  }

  return array.join('');
};

const validator = function (val: string | string[] | null): boolean {
  return Boolean(
    val === null ||
      val === undefined ||
      isString(val) ||
      (Array.isArray(val) && val.length === 2 && val.every(isString))
  );
};

const checkISOIsValid = (isoDate: string): boolean =>
  isValid(parseISO(isoDate));

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

const formatToISO = (date: Date | Date[]): string | string[] => {
  if (Array.isArray(date)) {
    return [formatISO(date[0]), formatISO(date[1])];
  }

  return formatISO(date);
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
  clearTime,
  clearMilliseconds,
  formatToLocalReadableString,
  setTimeToDate,
  calcInputData,
  validator,
  modelValueValidator,
  checkArrayValueIsValid,
  formatToISO,
  isDateInRangeInterval
};

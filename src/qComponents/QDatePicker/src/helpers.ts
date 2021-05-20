import { format, formatISO, isDate, parseISO } from 'date-fns';
import { ru, enGB as en } from 'date-fns/locale';
import { isString } from 'lodash-es';
import { QDatePickerPropModelValue } from './types';

const locales = { ru, en };

const formatLocalDate = (
  value: Date | number,
  dateFnsFormat: string,
  dateFnsLocale = 'ru'
): Date | number | string => {
  let parsedValue = value;
  if (!isDate(parsedValue)) {
    parsedValue = parseISO(parsedValue);
  }

  if (isDate(parsedValue)) {
    return format(parsedValue, dateFnsFormat ?? 'dd MMM yyyy', {
      locale: locales[dateFnsLocale]
    });
  }

  return parsedValue;
};

const setTimeToDate = (date: Date, type: string, value: string): Date => {
  let newDate = date;
  if (isDate(date)) {
    newDate = new Date(date);
    switch (type) {
      case 'hours':
        newDate.setHours(Number(value));
        break;
      case 'minutes':
        newDate.setMinutes(Number(value));
        break;
      case 'seconds':
        newDate.setSeconds(Number(value));
        break;
      default:
        break;
    }
  }

  return newDate;
};

const clearTime = function (date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const clearMilliseconds = function (date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    0
  );
};

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

const dateValidator = function (val: QDatePickerPropModelValue): boolean {
  return Boolean(
    null ||
      isDate(val) ||
      isDate(parseISO(val)) ||
      (Array.isArray(val) &&
        val.length === 2 &&
        (val.every(isDate) || val.every(isDate(parseISO))))
  );
};

const formatToISO = (date: QDatePickerPropModelValue): string | string[] => {
  if (Array.isArray(date)) {
    return [formatISO(date[0]), formatISO(date[1])];
  }

  return formatISO(date);
};

const convertDate = (value: string | Date): string | Date => {
  if (isString(value) && !isDate(value)) {
    return parseISO(value);
  }

  return value;
};

export {
  clearTime,
  clearMilliseconds,
  formatLocalDate,
  setTimeToDate,
  calcInputData,
  validator,
  dateValidator,
  formatToISO,
  convertDate
};

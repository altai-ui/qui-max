import { format, isValid, parseISO } from 'date-fns';
import { ru, enGB as en, zhHK as zh } from 'date-fns/locale';
import { isString } from 'lodash-es';

import { QDatePickerPropModelValue } from '@/qComponents';

import type { Nullable } from '#/helpers';

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

export { formatToLocalReadableString, modelValueValidator, convertISOToDate };

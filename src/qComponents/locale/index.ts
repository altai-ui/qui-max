import { get, isString } from 'lodash-es';

import { getConfig } from '@/qComponents/config';
import { Nullable } from '#/helpers';

export type Locale = {
  [key: string]: string | string[] | Locale;
};

let currentLocale: Nullable<Locale> = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let i18nHandler: Nullable<(key: string, ...args: any[]) => string> = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const t = (key: string, ...args: any[]): string => {
  if (i18nHandler) return i18nHandler(key, ...args);

  const locale = getConfig('locale');
  const text = get(currentLocale, `${locale}.${key}`);

  return isString(text) ? text : '';
};

export const useI18n = (fn: (...args: unknown[]) => string): void => {
  i18nHandler = fn;
};

export const setupLocale = (locale?: Locale): void => {
  if (locale) currentLocale = locale;
};

export default { setupLocale, t, useI18n };

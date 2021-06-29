import { get, isString } from 'lodash-es';
import type { IVueI18n } from 'vue-i18n';

import { getConfig } from '@/qComponents/config';
import { en as defaultLang } from '@/qComponents/constants/locales';
import { Nullable } from '#/helpers';

let currentLocale: IVueI18n['messages'] = defaultLang;

let i18nHandler: Nullable<IVueI18n['t']> = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const t: IVueI18n['t'] = (key: string, ...args: any[]) => {
  if (i18nHandler) return i18nHandler(key, ...args);

  const locale = getConfig('locale');
  const text = get(currentLocale, `${locale}.${key}`);

  return isString(text) ? text : '';
};

export const i18n = (fn: (...args: unknown[]) => string): void => {
  i18nHandler = fn;
};

export const use = (locale: IVueI18n['messages']): void => {
  currentLocale = locale;
};

export default { use, t, i18n };

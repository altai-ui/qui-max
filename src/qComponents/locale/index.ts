import { get, isString } from 'lodash-es';

import { getConfig } from '@/qComponents/config';
import type { Nullable } from '#/helpers';

export type Messages = {
  [key: string]: string | string[] | Messages;
};

let currentMessages: Nullable<Messages> = null;

let i18nHandler: Nullable<(key: string, ...args: unknown[]) => string> = null;

export const t = (key: string, ...args: unknown[]): string => {
  if (i18nHandler) return i18nHandler(key, ...args);

  const locale = getConfig('locale');
  console.log(locale, `${locale}.${key}`, currentMessages);

  const text = get(currentMessages, `${locale}.${key}`);

  return isString(text) ? text : '';
};

export const setI18n = (fn: (...args: unknown[]) => string): void => {
  i18nHandler = fn;
};

export const setMessages = (messages?: Messages): void => {
  if (messages) currentMessages = messages;
};

export default { setMessages, t, setI18n };

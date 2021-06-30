import { get, isString } from 'lodash-es';

import { getConfig } from '@/qComponents/config';
import { Nullable } from '#/helpers';

export type Messages = {
  [key: string]: string | string[] | Messages;
};

let currentMessages: Nullable<Messages> = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let i18nHandler: Nullable<(key: string, ...args: any[]) => string> = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const t = (key: string, ...args: any[]): string => {
  if (i18nHandler) return i18nHandler(key, ...args);

  const locale = getConfig('locale');
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

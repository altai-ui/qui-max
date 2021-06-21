import { merge } from 'lodash-es';
import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n';

import type { Nullable } from '#/helpers';

export interface InstallOptions {
  nextZIndex: number;
  locale: string;
  customI18nMessages: Nullable<
    Record<string, LocaleMessageDictionary<VueMessageType>>
  >;
}

let $Q: InstallOptions = {
  nextZIndex: 0,
  locale: 'ru',
  customI18nMessages: null
};

const setConfig = ({
  zIndex,
  customI18nMessages,
  ...options
}: Partial<
  Pick<InstallOptions, 'locale' | 'customI18nMessages'> & { zIndex: number }
>): void => {
  $Q.nextZIndex = zIndex ?? 2000;
  $Q.customI18nMessages = customI18nMessages ?? null;
  $Q = merge($Q, options);
};

setConfig({});

const getConfig = <T extends keyof InstallOptions>(
  key: T
): InstallOptions[T] => {
  if (key === 'nextZIndex') $Q.nextZIndex += 1;

  return $Q[key];
};

export { getConfig, setConfig };

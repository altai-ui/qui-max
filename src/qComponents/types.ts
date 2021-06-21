import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n';

export interface Localization {
  locale?: string;
  customI18nMessages?: Record<string, LocaleMessageDictionary<VueMessageType>>;
}

export interface ConfigOptions {
  localization?: Localization;
  zIndexCounter?: number;
  useAllComponents?: boolean;
}

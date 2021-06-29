import type { IVueI18n } from 'vue-i18n';

export interface Localization {
  locale?: string;
  customI18nMessages?: IVueI18n['messages'];
}

export interface ConfigOptions {
  localization?: Localization;
  zIndexCounter?: number;
  useAllComponents?: boolean;
}

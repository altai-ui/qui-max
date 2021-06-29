import type { Locale } from '@/qComponents/locale';

export interface Localization {
  locale?: string;
  customI18nMessages?: Locale;
}

export interface ConfigOptions {
  localization?: Localization;
  zIndexCounter?: number;
  useAllComponents?: boolean;
}

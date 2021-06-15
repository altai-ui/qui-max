import { App } from 'vue';
import { LocaleMessageDictionary, VueMessageType } from 'vue-i18n';
import { setConfig } from './config';
import { installI18n } from './constants/locales';
import 'focus-visible';

interface Localization {
  locale?: string;
  customI18nMessages?: Record<string, LocaleMessageDictionary<VueMessageType>>;
}

interface ConfigOptions {
  localization?: Localization;
  zIndexCounter?: number;
}

// install
const install = (
  app: App,
  {
    localization: { locale, customI18nMessages = {} } = {},
    zIndexCounter
  }: ConfigOptions = {}
): void => {
  setConfig({
    locale,
    zIndex: zIndexCounter
  });

  installI18n({ app, customI18nMessages });
};

export default { install };

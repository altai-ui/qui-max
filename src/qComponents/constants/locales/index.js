/* eslint-disable no-underscore-dangle */
import { createI18n } from 'vue-i18n';
import { merge } from 'lodash-es';

import ru from './ru';
import en from './en';

const installI18n = ({ app, locale, customI18nMessages }) => {
  const isI18nExist = Boolean(app.config.globalProperties._i18n);
  if (isI18nExist) {
    console.warn(
      `Error: Qui can't setup VueI18n, it has detected in the app, please merge i18n messages, see the docs`
    );
    return;
  }
  const i18n = createI18n({
    legacy: false,
    locale,
    messages: merge({ en, ru }, customI18nMessages)
  });
  app.use(i18n)
};

export default {
  en,
  ru
};

export { ru, en, installI18n };

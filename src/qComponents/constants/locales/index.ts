import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n';
import { merge } from 'lodash-es';

import { getConfig } from '@/qComponents/config';
import type { Nullable } from '#/helpers';

import ru from './ru';
import en from './en';

const installI18n = ({
  app,
  customI18nMessages
}: {
  app: App;
  customI18nMessages: Nullable<
    Record<string, LocaleMessageDictionary<VueMessageType>>
  >;
}): void => {
  /* eslint-disable-next-line no-underscore-dangle */
  const isI18nExist = Boolean(app.config.globalProperties._i18n);
  if (isI18nExist) {
    // eslint-disable-next-line no-console
    console.warn(
      `Error: Qui can't setup VueI18n, it has detected in the app, please merge i18n messages, see the docs`
    );
    return;
  }

  const locale = getConfig('locale');
  const i18n = createI18n({
    legacy: false,
    locale,
    messages: merge({ en, ru }, customI18nMessages)
  });

  app.use(i18n);
};

export { ru, en, installI18n };
export default { en, ru };

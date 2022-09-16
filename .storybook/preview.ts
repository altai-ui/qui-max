import { app } from '@storybook/vue3';

import Qui from '../src/qComponents';
// custom localization
import messages from './locales';
// default localization
import { localeEn, localeRu } from '../src/qComponents';

app.use(Qui, {
  localization: {
    locale: 'ru',
    messages: {
      en: { ...localeEn, ...messages.en },
      ru: { ...localeRu, ...messages.ru }
    }
  }
});

export const parameters = {
  layout: 'centered',
  controls: { expanded: true },
  docs: {
    inlineStories: true,
    source: {
      state: 'open'
    }
  },
  actions: { argTypesRegex: '^on[A-Z].*' }
};

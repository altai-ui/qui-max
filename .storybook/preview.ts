import { app } from '@storybook/vue3';

import Qui from '../src/qComponents';
import messages from './locales';

app.use(Qui, {
  localization: {
    locale: 'en',
    customI18nMessages: messages
  }
});

import '../src/fonts/index.scss';
import '../src/icons/index.scss';
import '../src/main.scss';
import '../src/components.scss';

export const parameters = {
  layout: 'centered',
  controls: { expanded: true },
  docs: {
    inlineStories: true
  },
  actions: { argTypesRegex: '^on[A-Z].*' }
};

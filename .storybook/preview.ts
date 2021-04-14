import Qui from '../src/qComponents';
import { app } from '@storybook/vue3';
import 'focus-visible';
import messages from './locales';

app.use(Qui, {
  localization: {
    locale: 'en',
    customI18nMessages: messages
  }
});

export const parameters = {
  layout: 'centered',
  controls: { expanded: true },
  docs: {
    inlineStories: true
  },
  actions: { argTypesRegex: '^on[A-Z].*' }
};

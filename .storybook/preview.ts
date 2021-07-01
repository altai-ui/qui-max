import { app } from '@storybook/vue3';

import Qui from '../src/qComponents';
import messages from './locales';

app.use(Qui, {
  localization: {
    locale: 'en',
    messages
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

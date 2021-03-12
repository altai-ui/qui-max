import Qui from '../src/qComponents';
import { app } from "@storybook/vue3";
app.use(Qui);

export const parameters = {
  layout: 'centered',
  controls: { expanded: true },
  docs: {
    inlineStories: true
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
};
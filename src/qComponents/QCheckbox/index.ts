import { App } from 'vue';

import QCheckbox from './src/QCheckbox.vue';

/* istanbul ignore next */
QCheckbox.install = (app: App): void => {
  app.component(QCheckbox.name, QCheckbox);
};

export type { QCheckboxProps } from './src/types';
export default QCheckbox;

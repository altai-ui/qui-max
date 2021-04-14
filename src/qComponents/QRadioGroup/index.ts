import { App } from 'vue';

import QRadioGroup from './src/QRadioGroup.vue';

/* istanbul ignore next */
QRadioGroup.install = (app: App): void => {
  app.component(QRadioGroup.name, QRadioGroup);
};

export type { QRadioGroupProvider } from './src/types';
export default QRadioGroup;

import type { App } from 'vue';

import QCheckboxGroup from './src/QCheckboxGroup.vue';

/* istanbul ignore next */
QCheckboxGroup.install = (app: App): void => {
  app.component(QCheckboxGroup.name, QCheckboxGroup);
};

export type {
  QCheckboxGroupProps,
  QCheckboxGroupProvider,
  QCheckboxGroupInstance
} from './src/types';
export default QCheckboxGroup as SFCWithInstall<App, typeof QCheckboxGroup>;

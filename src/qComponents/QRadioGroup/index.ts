import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QRadioGroup from './src/QRadioGroup.vue';

/* istanbul ignore next */
QRadioGroup.install = (app: App): void => {
  app.component(QRadioGroup.name, QRadioGroup);
};

export type {
  QRadioGroupProps,
  QRadioGroupProvider,
  QRadioGroupInstance
} from './src/types';
export default QRadioGroup as SFCWithInstall<App, typeof QRadioGroup>;

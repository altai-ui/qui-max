import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QOption from './src/QOption.vue';

/* istanbul ignore next */
QOption.install = (app: App): void => {
  app.component(QOption.name, QOption);
};

export type {
  QOptionInstance,
  QOptionPropValue,
  QOptionModel,
  QOptionProps
} from './src/types';
export default QOption as SFCWithInstall<App, typeof QOption>;

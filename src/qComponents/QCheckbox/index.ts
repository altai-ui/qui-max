import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QCheckbox from './src/QCheckbox.vue';

/* istanbul ignore next */
QCheckbox.install = (app: App): void => {
  app.component(QCheckbox.name, QCheckbox);
};

export type { QCheckboxProps, QCheckboxInstance } from './src/types';
export default QCheckbox as SFCWithInstall<App, typeof QCheckbox>;

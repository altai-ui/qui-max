import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QCascader from './src/QCascader.vue';

/* istanbul ignore next */
QCascader.install = (app: App): void => {
  app.component(QCascader.name, QCascader);
};

export type { QCascaderProps, QCascaderInstance } from './src/types';
export default QCascader as SFCWithInstall<App, typeof QCascader>;

import type { App } from 'vue';

import QCascader from './src/QCascader.vue';

/* istanbul ignore next */
QCascader.install = (app: App): void => {
  app.component(QCascader.name, QCascader);
};

export type { QCascaderProps, QCascaderInstance } from './src/QCascader';
export default QCascader;

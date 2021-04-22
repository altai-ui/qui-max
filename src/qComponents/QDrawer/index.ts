import { App } from 'vue';

import QDrawer from './src/QDrawer.vue';

/* istanbul ignore next */
QDrawer.install = (app: App): void => {
  app.component(QDrawer.name, QDrawer);
};

export type { QDrawerProps, QDrawerInstance } from './src/types';
export default QDrawer;

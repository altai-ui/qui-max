import { App } from 'vue';

import QDrawer from './src/QDrawer.vue';

QDrawer.install = (app: App): void => {
  app.component(QDrawer.name, QDrawer);
};

export default QDrawer;

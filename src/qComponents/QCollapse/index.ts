import { App } from 'vue';
import QCollapse from './src/QCollapse.vue';
import type { QCollapseProvider } from './src/types';

/* istanbul ignore next */
QCollapse.install = (app: App): void => {
  app.component(QCollapse.name, QCollapse);
};

export { QCollapseProvider };
export default QCollapse;

import { App } from 'vue';

import QCollapse from './src/QCollapse.vue';

/* istanbul ignore next */
QCollapse.install = (app: App): void => {
  app.component(QCollapse.name, QCollapse);
};

export type {
  QCollapseProps,
  QCollapseProvider,
  QCollapseInstance
} from './src/types';
export default QCollapse;

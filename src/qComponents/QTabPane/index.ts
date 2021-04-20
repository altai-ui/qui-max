import { App } from 'vue';

import QTabPane from './src/QTabPane.vue';

/* istanbul ignore next */
QTabPane.install = (app: App): void => {
  app.component(QTabPane.name, QTabPane);
};

export type { QTabPaneProps } from './src/types';
export default QTabPane;

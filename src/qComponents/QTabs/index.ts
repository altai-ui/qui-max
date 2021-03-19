import { App } from 'vue';
import QTabs from './src/QTabs';
import type { QTabsProvider } from './src/types';

/* istanbul ignore next */
QTabs.install = (app: App): void => {
  app.component(QTabs.name, QTabs);
};

export { QTabsProvider };
export default QTabs;

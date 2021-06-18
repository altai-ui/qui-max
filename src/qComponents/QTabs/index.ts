import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QTabs from './src/QTabs.vue';

/* istanbul ignore next */
QTabs.install = (app: App): void => {
  app.component(QTabs.name, QTabs);
};

export type { QTabsProps, QTabsProvider, QTabsInstance } from './src/types';
export default QTabs as SFCWithInstall<App, typeof QTabs>;

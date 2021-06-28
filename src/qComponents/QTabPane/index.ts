import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QTabPane from './src/QTabPane.vue';

/* istanbul ignore next */
QTabPane.install = (app: App): void => {
  app.component(QTabPane.name, QTabPane);
};

export type { QTabPaneProps, QTabPaneInstance } from './src/types';
export default QTabPane as SFCWithInstall<App, typeof QTabPane>;

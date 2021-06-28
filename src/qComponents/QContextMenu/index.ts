import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QContextMenu from './src/QContextMenu.vue';

/* istanbul ignore next */
QContextMenu.install = (app: App): void => {
  app.component(QContextMenu.name, QContextMenu);
};

export type { QContextMenuProps, QContextMenuInstance } from './src/types';
export default QContextMenu as SFCWithInstall<App, typeof QContextMenu>;

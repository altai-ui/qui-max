import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QScrollbar from './src/QScrollbar.vue';

/* istanbul ignore next */
QScrollbar.install = (app: App): void => {
  app.component(QScrollbar.name, QScrollbar);
};

export type {
  QScrollbarProps,
  QScrollbarInstance,
  QScrollbarProvider
} from './src/types';
export default QScrollbar as SFCWithInstall<App, typeof QScrollbar>;

import { App } from 'vue';

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
export default QScrollbar;

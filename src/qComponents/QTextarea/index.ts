import { App } from 'vue';

import QTextarea from './src/QTextarea.vue';

/* istanbul ignore next */
QTextarea.install = (app: App): void => {
  app.component(QTextarea.name, QTextarea);
};

export type { QTextareaProps } from './src/types';
export default QTextarea;

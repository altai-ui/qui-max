import { App } from 'vue';

import QRow from './src/QRow.vue';

/* istanbul ignore next */
QRow.install = (app: App): void => {
  app.component(QRow.name, QRow);
};

export type { QRowProps } from './src/types';
export default QRow;

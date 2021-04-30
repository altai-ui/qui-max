import { App } from 'vue';

import QTable from './src/QTable.vue';

/* istanbul ignore next */
QTable.install = (app: App): void => {
  app.component(QTable.name, QTable);
};

export type { QTableProps, QTableInstance } from './src/QTable';
export default QTable;

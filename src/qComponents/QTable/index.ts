import type { App } from 'vue';

import QTable from './src/QTable.vue';

/* istanbul ignore next */
QTable.install = (app: App): void => {
  app.component(QTable.name, QTable);
};

export type {
  QTableProps,
  QTablePropSortBy,
  QTableInstance
} from './src/QTable';
export default QTable;

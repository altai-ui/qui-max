import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QTable from './src/QTable.vue';

/* istanbul ignore next */
QTable.install = (app: App): void => {
  app.component(QTable.name, QTable);
};

export type {
  QTableProps,
  QTablePropGroupsOfColumns,
  QTablePropCheckedRows,
  QTablePropSortBy,
  QTableInstance
} from './src/QTable';
export default QTable as SFCWithInstall<App, typeof QTable>;

import { withInstall } from '../helpers';

import Table from './src/QTable.vue';

export const QTable = /* #__PURE__ */ withInstall(Table);

export type {
  QTableProps,
  QTablePropGroupsOfColumns,
  QTablePropCheckedRows,
  QTablePropSortBy,
  QTableInstance
} from './src/types';

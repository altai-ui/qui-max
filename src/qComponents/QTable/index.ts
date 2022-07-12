import { withInstall } from '../helpers';

import Table from './src/QTable.vue';

export const QTable = withInstall(Table);

export type {
  QTableProps,
  QTablePropGrid,
  QTablePropFixedLayout,
  QTablePropIsLoading,
  QTablePropLoadingRowCount,
  QTablePropDefaultColWidth,
  QTablePropSelectionColumn,
  QTablePropGroupsOfColumns,
  QTablePropTotal,
  QTablePropRows,
  QTablePropCheckedRows,
  QTablePropSortBy,
  QTablePropCustomRowClass,
  QTablePropCustomRowStyle,
  QTablePropEmptyText,
  QTableInstance
} from './src/types';

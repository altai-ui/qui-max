import { ComputedRef } from 'vue';

import type { QTablePropSortBy } from './QTable';
import type { ExtendedColumn } from './QTableContainer';

export interface QTableTHeadInstance {
  columnList: ComputedRef<ExtendedColumn[]>;
  sortBy: ComputedRef<Nullable<QTablePropSortBy>>;
}

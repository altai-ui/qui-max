import { ComputedRef } from 'vue';

import type { QTablePropSortBy } from './QTable';
import type { ExtendedColumn } from './QTableContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QTableTHeadProps {}

export interface QTableTHeadInstance {
  columnList: ComputedRef<ExtendedColumn[]>;
  sortBy: ComputedRef<Nullable<QTablePropSortBy>>;
}

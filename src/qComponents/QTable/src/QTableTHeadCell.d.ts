import { VNode } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

export interface QTableTHeadCellPropSortBy {
  key: Nullable<string>;
  direction: Nullable<'ascending' | 'descending'>;
}

export interface QTableTHeadCellProps {
  index: number;
  column: ExtendedColumn;
  sortBy: Nullable<QTableTHeadCellPropSortBy>;
}

export type QTableTHeadCellInstance = () => VNode;

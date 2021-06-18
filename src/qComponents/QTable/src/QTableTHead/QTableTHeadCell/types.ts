import type { VNode } from 'vue';

import type { Nullable } from '#/helpers';

import type { ExtendedColumn } from '../../QTableContainer/types';

export interface QTableTHeadCellPropSortBy {
  key: Nullable<string>;
  direction: Nullable<'ascending' | 'descending'>;
}

export interface QTableTHeadCellProps {
  column: ExtendedColumn;
  columnIndex: number;
  sortBy: Nullable<QTableTHeadCellPropSortBy>;
  draggedColumn: Nullable<ExtendedColumn>;
}

export type QTableTHeadCellInstance = () => VNode;

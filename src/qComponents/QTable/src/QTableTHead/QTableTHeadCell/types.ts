import type { VNode } from 'vue';

import type { ClassValue, Nullable } from '#/helpers';

import type { ExtendedColumn } from '../../QTableContainer/types';
import type { SortDirection } from '../../types';

export interface QTableTHeadCellPropSortBy {
  key: Nullable<string>;
  direction: SortDirection;
}

export interface QTableTHeadCellProps {
  column: ExtendedColumn;
  columnIndex: number;
  sortBy: Nullable<QTableTHeadCellPropSortBy>;
  draggedColumn: Nullable<ExtendedColumn>;
}

export type QTableTHeadCellInstance = () => VNode;

export interface QTableTHeadCellContainerAttrs {
  class: ClassValue;
  onClick?: () => void;
}

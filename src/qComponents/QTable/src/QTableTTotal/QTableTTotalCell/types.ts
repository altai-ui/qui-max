import type { VNode } from 'vue';

import type { ExtendedColumn } from '../../QTableContainer/types';

export interface QTableTTotalCellProps {
  column: ExtendedColumn;
  columnIndex: number;
}

export type QTableTTotalCellInstance = () => VNode;

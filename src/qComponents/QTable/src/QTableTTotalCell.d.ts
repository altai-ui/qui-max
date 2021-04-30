import { VNode } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

export interface QTableTTotalCellProps {
  index: number;
  column: ExtendedColumn;
}

export type QTableTTotalCellInstance = () => VNode;

import { VNode } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

export type QTableTBodyCellPropValue = unknown;

export interface QTableTBodyCellProps {
  rowIndex: number;
  column: ExtendedColumn;
  columnIndex: number;
  value: QTableTBodyCellPropValue;
}

export type QTableTBodyCellInstance = () => VNode;

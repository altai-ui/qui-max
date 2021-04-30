import { VNode } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

export type QTableTBodyCellPropRow = Record<string, unknown>;
export type QTableTBodyCellPropValue = unknown;

export interface QTableTBodyCellProps {
  row: QTableTBodyCellPropRow;
  rowIndex: number;
  column: ExtendedColumn;
  columnIndex: number;
  value: QTableTBodyCellPropValue;
}

export type QTableTBodyCellInstance = () => VNode;

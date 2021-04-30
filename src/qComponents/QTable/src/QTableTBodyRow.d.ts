import { ComputedRef } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

export type QTableTBodyRowPropRow = Record<string, unknown>;

export interface QTableTBodyRowProps {
  rowIndex: number;
  row: QTableTBodyRowPropRow;
}

export interface QTableTBodyRowInstance {
  randId: (prefix: string) => string;
  columnList: ComputedRef<ExtendedColumn[]>;
  getRowValue: (key: string) => Nullable<unknown>;
}

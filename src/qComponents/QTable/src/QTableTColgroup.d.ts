import { ComputedRef } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

export interface QTableTColgroupInstance {
  columnList: ComputedRef<ExtendedColumn[]>;
  getColWidth: (arg0: ExtendedColumn) => Record<'width', string>;
}

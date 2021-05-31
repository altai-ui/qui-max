import type { ComputedRef } from 'vue';

import type { ExtendedColumn } from '../QTableContainer/QTableContainer';

export interface QTableTColgroupInstance {
  checkboxColWidth: number;
  isSelectable: Nullable<ComputedRef<boolean>>;
  columnList: ComputedRef<ExtendedColumn[]>;
  getColWidth: (arg0: ExtendedColumn) => Record<'width', string>;
}

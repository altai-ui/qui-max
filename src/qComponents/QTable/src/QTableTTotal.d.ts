import { ComputedRef } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

export interface QTableTTotalInstance {
  isSelectable: Nullable<ComputedRef<boolean>>;
  isChecked: ComputedRef<boolean>;
  columnList: ComputedRef<ExtendedColumn[]>;
  handleCheckboxChange: () => void;
}

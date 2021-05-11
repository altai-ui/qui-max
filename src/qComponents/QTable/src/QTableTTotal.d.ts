import { ComputedRef } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

export interface QTableTTotalInstance {
  isSelectable: ComputedRef<boolean>;
  isCheckable: ComputedRef<boolean>;
  isChecked: ComputedRef<boolean>;
  columnList: ComputedRef<ExtendedColumn[]>;
  handleCheckboxChange: () => void;
}

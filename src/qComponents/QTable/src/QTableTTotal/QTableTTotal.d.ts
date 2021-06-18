import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { ExtendedColumn } from '../QTableContainer/QTableContainer';

export interface QTableTTotalInstance {
  isSelectable: Nullable<ComputedRef<boolean>>;
  isCheckable: ComputedRef<boolean>;
  isChecked: ComputedRef<boolean>;
  columnList: ComputedRef<ExtendedColumn[]>;
  handleCheckboxChange: () => void;
}

import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QTablePropSortBy } from '../types';
import type { ExtendedColumn } from '../QTableContainer/types';

export interface QTableTHeadInstance {
  isSelectable: Nullable<ComputedRef<boolean>>;
  isCheckable: ComputedRef<boolean>;
  isChecked: ComputedRef<boolean>;
  isIndeterminate: ComputedRef<boolean>;
  columnList: ComputedRef<ExtendedColumn[]>;
  sortBy: ComputedRef<Nullable<QTablePropSortBy>>;
  draggedColumn: Ref<Nullable<ExtendedColumn>>;
  handleCheckboxChange: () => void;
  handleColumnDrag: (column: ExtendedColumn) => void;
  handleColumnDrop: (
    position: 'left' | 'right',
    targetColumnKey: string
  ) => void;
}

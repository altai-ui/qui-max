import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QTablePropSortBy } from '../QTable';
import type { ExtendedColumn } from '../QTableContainer/QTableContainer';

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

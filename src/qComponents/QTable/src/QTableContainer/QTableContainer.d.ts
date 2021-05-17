import type { ComputedRef } from 'vue';

import type { Column } from '../QTable';

export interface ExtendedColumn extends Column {
  group: {
    key: string;
    color?: string;
    draggable?: boolean;
    align?: 'left' | 'right';
  };
}

export interface QTableContainerProvider {
  columnList: ComputedRef<ExtendedColumn[]>;
  isSelectable: ComputedRef<boolean>;
}

export interface QTableContainerInstance {
  columnList: ComputedRef<ExtendedColumn[]>;
}

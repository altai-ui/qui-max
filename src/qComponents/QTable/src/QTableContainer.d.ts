import { ComputedRef } from 'vue';

import type { Column } from './QTable';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QTableContainerProps {}

export interface ExtendedColumn extends Column {
  group: {
    key: string;
    color?: string;
    draggabble?: boolean;
    align?: 'left' | 'right';
  };
}

export interface QTableContainerProvider {
  columnList: ComputedRef<ExtendedColumn[]>;
}

export interface QTableContainerInstance {
  columnList: ComputedRef<ExtendedColumn[]>;
}

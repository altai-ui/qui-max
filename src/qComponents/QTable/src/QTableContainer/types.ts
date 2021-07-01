import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { Column } from '../types';

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
  wrapperStyles: ComputedRef<{
    width: Nullable<string>;
  }>;
  handleWidthChange: (width: Nullable<number>) => void;
}

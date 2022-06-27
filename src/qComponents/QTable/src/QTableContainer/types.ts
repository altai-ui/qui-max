import type { ComputedRef, StyleValue } from 'vue';

import type { Optional } from '#/helpers';

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
  wrapperStyles: ComputedRef<StyleValue>;
  handleWidthChange: (width: Optional<number>) => void;
}

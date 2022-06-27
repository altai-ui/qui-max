import type { ComputedRef, StyleValue } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

import type { ExtendedColumn } from '../../QTableContainer/types';

export type QTableTBodyRowPropRow = Record<string, unknown>;

export interface QTableTBodyRowProps {
  rowIndex: number;
  row: QTableTBodyRowPropRow;
}

export interface QTableTBodyRowInstance {
  isSelectable: Nullable<ComputedRef<boolean>>;
  isChecked: ComputedRef<boolean>;
  rootClasses: ComputedRef<ClassValue>;
  rootStyles: ComputedRef<StyleValue>;
  randId: (prefix: string) => string;
  columnList: ComputedRef<ExtendedColumn[]>;
  getRowValue: (key: string) => Nullable<unknown>;
  handleRowClick: () => void;
  handleCheckboxChange: () => void;
}

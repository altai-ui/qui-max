import { ComputedRef } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

type Classes = Record<string, boolean>;
export type RootClasses = (string | string[] | Classes | Classes[])[];
type Styles = Record<string, string | number>;
export type RootStyles = (string | string[] | Styles | Styles[])[];

export type QTableTBodyRowPropRow = Record<string, unknown>;

export interface QTableTBodyRowProps {
  rowIndex: number;
  row: QTableTBodyRowPropRow;
}

export interface QTableTBodyRowInstance {
  isSelectable: Nullable<ComputedRef<boolean>>;
  isChecked: ComputedRef<boolean>;
  rootClasses: ComputedRef<RootClasses>;
  rootStyles: ComputedRef<RootStyles>;
  randId: (prefix: string) => string;
  columnList: ComputedRef<ExtendedColumn[]>;
  getRowValue: (key: string) => Nullable<unknown>;
  handleRowClick: () => void;
  handleCheckboxChange: () => void;
}

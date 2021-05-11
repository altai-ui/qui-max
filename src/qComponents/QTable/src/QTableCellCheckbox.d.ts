import { VNode } from 'vue';

export interface QTableCellCheckboxProps {
  baseTag: string;
  baseClass: string;
  checked: boolean;
  indeterminate: Nullable<boolean>;
}

export type QTableCellCheckboxInstance = () => VNode;

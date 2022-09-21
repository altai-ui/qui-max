import type { VNode } from 'vue';

import type { Nullable } from '#/helpers';

export type QTableCellCheckboxIndeterminate = Nullable<boolean>;
export type QTableCellCheckboxIsCheckable = Nullable<boolean>;

export interface QTableCellCheckboxProps {
  baseTag: string;
  baseClass: string;
  checked: boolean;
  indeterminate: QTableCellCheckboxIndeterminate;
  isCheckable: QTableCellCheckboxIsCheckable;
}

export type QTableCellCheckboxInstance = () => VNode;

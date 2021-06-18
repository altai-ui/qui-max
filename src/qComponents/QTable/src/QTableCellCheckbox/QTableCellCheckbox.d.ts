import type { VNode } from 'vue';

import type { Nullable } from '#/helpers';

export interface QTableCellCheckboxProps {
  baseTag: string;
  baseClass: string;
  checked: boolean;
  indeterminate: Nullable<boolean>;
  isCheckable: Nullable<boolean>;
}

export type QTableCellCheckboxInstance = () => VNode;

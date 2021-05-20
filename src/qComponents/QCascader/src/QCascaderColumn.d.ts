import { ComputedRef } from 'vue';

import { Option } from './QCascader';

export type QCascaderColumnPropColumn = Option[];

export interface QCascaderColumnProps {
  columnIndex: number;
  column: QCascaderColumnPropColumn;
}

export interface QCascaderColumnInstance {
  uniqueId: string;
  isMultiple: ComputedRef<boolean>;
  handleRowExpand: (row: Option, rowIndex: number) => void;
  handleRowCheck: (row: Option, rowIndex: number) => void;
}

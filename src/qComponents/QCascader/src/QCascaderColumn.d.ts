import type { Option } from './QCascader';

export type QCascaderColumnPropColumn = Option[];

export interface QCascaderColumnProps {
  columnIndex: number;
  column: QCascaderColumnPropColumn;
}

export interface QCascaderColumnInstance {
  uniqueId: string;
  checkExpanded: (rowIndex: number) => boolean;
  handleRowExpand: (rowIndex: number) => void;
  handleRowCheck: (row: Option, rowIndex: number) => void;
}

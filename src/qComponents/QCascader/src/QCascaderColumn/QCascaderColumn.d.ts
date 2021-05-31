import type { Ref, ComputedRef } from 'vue';

import type { Option } from '../QCascader';

export type QCascaderColumnPropColumn = Option[];

export interface QCascaderColumnProps {
  columnIndex: number;
  column: QCascaderColumnPropColumn;
}

export interface QCascaderColumnInstance {
  root: Ref<HTMLElement | null>;
  rootClasses: ComputedRef<Record<string, boolean>>;
  scrollTo: Ref<Nullable<HTMLElement>>;
  uniqueId: string;
  checkExpanded: (rowIndex: number) => boolean;
  handleRowExpand: (rowIndex: number, hasChildren: boolean) => void;
  handleRowCheck: (row: Option, isExist: boolean) => void;
  handleArrowUpDownKeyUp: (e: KeyboardEvent) => void;
  handleArrowLeftKeyUp: () => void;
}

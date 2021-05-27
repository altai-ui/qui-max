import type { ComputedRef } from 'vue';

import type { Option } from '../QCascader';

export type QCascaderRowPropRow = Option;

export interface QCascaderRowProps {
  uniqueId: string;
  row: QCascaderRowPropRow;
  rowIndex: number;
  expanded: Nullable<boolean>;
}

export interface QCascaderRowInstance {
  rootClasses: ComputedRef<Record<string, boolean>>;
  isMultiple: ComputedRef<boolean>;
  isChecked: ComputedRef<boolean>;
  isIndeterminate: ComputedRef<boolean>;
  isIconShown: ComputedRef<boolean>;
  iconClasses: ComputedRef<Record<string, boolean>>;
  handleClick: () => void;
  handleRightKeyUp: () => void;
  handleEnterKeyUp: () => void;
  handleCheckboxChange: () => void;
}

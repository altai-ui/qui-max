import { ComputedRef } from 'vue';

export interface QCascaderRowProps {
  uniqueId: string;
  value: string | number;
  label: string;
  hasChildren: boolean;
  multiple: boolean;
  expanded: Nullable<boolean>;
  disabled: Nullable<boolean>;
}

export interface QCascaderRowInstance {
  rootClasses: ComputedRef<Record<string, boolean>>;
  isIconShown: ComputedRef<boolean>;
  iconClasses: ComputedRef<Record<string, boolean>>;
  handleClick: () => void;
  handleRightKeyUp: () => void;
  handleEnterKeyUp: () => void;
  handleCheckboxChange: () => void;
}

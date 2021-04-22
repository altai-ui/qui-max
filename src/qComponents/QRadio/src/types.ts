import { ComputedRef } from 'vue';

export interface QRadioProps {
  label: Nullable<string>;
  value: Nullable<string | number | boolean>;
  checked: Nullable<boolean>;
  disabled: Nullable<boolean>;
}

export interface QRadioInstance {
  isChecked: ComputedRef<boolean>;
  isDisabled: ComputedRef<boolean>;
  wrapClass: ComputedRef<Record<string, boolean>>;
  tabIndex: ComputedRef<0 | -1>;
  handleSpaceKeyUp: () => void;
  handleChange: () => void;
}

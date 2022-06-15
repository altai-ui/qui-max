import type { Ref, ComputedRef } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

export type QCheckboxItemPropLabelSize = Nullable<'regular' | 'small'>;

export interface QCheckboxProps {
  modelValue: Nullable<boolean>;
  label: Nullable<string>;
  indeterminate: Nullable<boolean>;
  disabled: Nullable<boolean>;
  rootTag: Nullable<string>;
  validateEvent: Nullable<boolean>;
  labelSize: QCheckboxItemPropLabelSize;
}

export interface QCheckboxInstance {
  focus: Ref<boolean>;
  isChecked: ComputedRef<boolean>;
  isLimitDisabled: ComputedRef<boolean>;
  isDisabled: ComputedRef<boolean>;
  nativeClick: () => void;
  handleCheckboxClick: () => void;
  checkboxInput: Ref<Nullable<HTMLInputElement>>;
  labelClass: ComputedRef<ClassValue>;
}

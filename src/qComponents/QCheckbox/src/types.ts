import type { Ref, ComputedRef } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

export type QCheckboxPropLabelSize = Nullable<'regular' | 'small'>;

export interface QCheckboxProps {
  modelValue: Nullable<boolean>;
  label: Nullable<string>;
  indeterminate: Nullable<boolean>;
  disabled: Nullable<boolean>;
  rootTag: Nullable<string>;
  validateEvent: Nullable<boolean>;
  labelSize: QCheckboxPropLabelSize;
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

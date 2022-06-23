import type { Ref, ComputedRef } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

export type QCheckboxPropModelValue = Nullable<boolean>;
export type QCheckboxPropLabel = Nullable<string>;
export type QCheckboxPropIndeterminate = Nullable<boolean>;
export type QCheckboxPropDisabled = Nullable<boolean>;
export type QCheckboxPropRootTag = Nullable<string>;
export type QCheckboxPropValidateEvent = Nullable<boolean>;
export type QCheckboxPropLabelSize = Nullable<'regular' | 'small'>;

export interface QCheckboxProps {
  modelValue: QCheckboxPropModelValue;
  label: QCheckboxPropLabel;
  indeterminate: QCheckboxPropIndeterminate;
  disabled: QCheckboxPropDisabled;
  rootTag: QCheckboxPropRootTag;
  validateEvent: QCheckboxPropValidateEvent;
  labelSize: QCheckboxPropLabelSize;
}

export interface QCheckboxInstance {
  focus: Ref<boolean>;
  isChecked: ComputedRef<boolean>;
  isIndeterminate: ComputedRef<boolean>;
  isLimitDisabled: ComputedRef<boolean>;
  isDisabled: ComputedRef<boolean>;
  nativeClick: () => void;
  handleCheckboxClick: () => void;
  checkboxInput: Ref<Nullable<HTMLInputElement>>;
  labelClass: ComputedRef<ClassValue>;
  qCheckboxClasses: ComputedRef<ClassValue>;
  qCheckboxInputClasses: ComputedRef<ClassValue>;
  qCheckboxInnerIconClasses: ComputedRef<ClassValue>;
}

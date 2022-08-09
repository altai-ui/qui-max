import type { ComputedRef } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

export type QRadioPropLabel = Nullable<string>;
export type QRadioPropValue = Nullable<string | number | boolean>;
export type QRadioPropChecked = Nullable<boolean>;
export type QRadioPropDisabled = Nullable<boolean>;
export type QRadioPropLabelSize = Nullable<'regular' | 'small'>;

export interface QRadioProps {
  label: QRadioPropLabel;
  value: QRadioPropValue;
  checked: QRadioPropChecked;
  disabled: QRadioPropDisabled;
  labelSize: QRadioPropLabelSize;
}

export interface QRadioInstance {
  isChecked: ComputedRef<boolean>;
  isDisabled: ComputedRef<boolean>;
  wrapClass: ComputedRef<ClassValue>;
  tabIndex: ComputedRef<0 | -1>;
  handleSpaceKeyUp: () => void;
  handleChange: () => void;
  labelClass: ComputedRef<ClassValue>;
}

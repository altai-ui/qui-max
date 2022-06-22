import type { ComputedRef } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

export type QRadioPropLabelSize = Nullable<'regular' | 'small'>;

export interface QRadioProps {
  label: Nullable<string>;
  value: Nullable<string | number | boolean>;
  checked: Nullable<boolean>;
  disabled: Nullable<boolean>;
  labelSize: QRadioPropLabelSize;
}

export interface QRadioInstance {
  isChecked: ComputedRef<boolean>;
  isDisabled: ComputedRef<boolean>;
  wrapClass: ComputedRef<Record<string, boolean>>;
  tabIndex: ComputedRef<0 | -1>;
  handleSpaceKeyUp: () => void;
  handleChange: () => void;
  labelClass: ComputedRef<ClassValue>;
}

import type { ComputedRef } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

export type QSwitchPropModelValue = Nullable<boolean | string | number>;
export type QSwitchPropActiveValue = QSwitchPropModelValue;
export type QSwitchPropInactiveValue = QSwitchPropActiveValue;

export type QSwitchTabIndexType = -1 | 0;

export type QSwitchEmitValueType =
  | QSwitchPropInactiveValue
  | QSwitchPropActiveValue;

export interface QSwitchProps {
  modelValue: QSwitchPropModelValue;
  activeValue: QSwitchPropActiveValue;
  inactiveValue: QSwitchPropInactiveValue;
  disabled: Nullable<boolean>;
  loading: Nullable<boolean>;
  validateEvent: Nullable<boolean>;
}

export interface QSwitchInstance {
  classes: ComputedRef<ClassValue>;
  isChecked: ComputedRef<boolean>;
  tabIndex: ComputedRef<number>;
  isDisabled: ComputedRef<boolean>;
  handleSwitcherChange: () => void;
}

import type { ComputedRef } from 'vue';
import type { Nullable, ClassValue } from '#/helpers';

export type QSwitcherPropModelValue = Nullable<boolean | string | number>;
export type QSwitcherPropActiveValue = QSwitcherPropModelValue;
export type QSwitcherPropInactiveValue = QSwitcherPropActiveValue;

export interface QSwitcherProps {
  modelValue: QSwitcherPropModelValue;
  activeValue: QSwitcherPropActiveValue;
  inactiveValue: QSwitcherPropInactiveValue;
  disabled: Nullable<boolean>;
  loading: Nullable<boolean>;
  validateEvent: Nullable<boolean>;
}

export interface QSwitcherInstance {
  classes: ComputedRef<ClassValue>;
  isChecked: ComputedRef<boolean>;
  tabIndex: ComputedRef<number>;
  isDisabled: ComputedRef<boolean>;
  handleKeyUp: () => void;
  handleSwitcherClick: () => void;
}

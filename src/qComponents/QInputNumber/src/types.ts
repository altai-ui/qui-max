import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QInputNumberProps {
  precision: Nullable<number>;
  disabled: Nullable<boolean>;
  noControls: Nullable<boolean>;
  modelValue: Nullable<string | number>;
  validateEvent: Nullable<boolean>;
}

export interface QInputNumberState {
  number: Nullable<number>;
  userNumber: Nullable<number | string>;
  prevValue: Nullable<number>;
  minValue: number;
  maxValue: number;
  step: number;
}

export interface QInputNumberInstance {
  state: QInputNumberState;
  isDisabled: ComputedRef<boolean>;
  withControlsClass: ComputedRef<Record<string, boolean>>;
  isIncreaseDisabled: ComputedRef<boolean>;
  isDecreaseDisabled: ComputedRef<boolean>;
  currentValue: ComputedRef<string>;
  areControlsEnabled: ComputedRef<boolean>;
  handleIncreaseClick: () => void;
  handleDecreaseClick: () => void;
  handleBlur: (event: FocusEvent) => void;
  handleFocus: (event: FocusEvent) => void;
  handleChangeInput: (event: Event, type: string) => void;
  processUserValue: (value: number, type: string) => Promise<void>;
  changesEmmiter: (value: Nullable<number>, type: string) => void;
}

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

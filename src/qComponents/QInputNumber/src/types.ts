import type { ComputedRef } from 'vue';

export interface QInputNumberProps {
  precision: Nullable<number>;
  disabled: Nullable<boolean>;
  noControls: Nullable<boolean>;
  modelValue: Nullable<string | number>;
  validateEvent: Nullable<boolean>;
  prefix: Nullable<string>;
  suffix: Nullable<string>;
  localization: Nullable<string>;
  useGrouping: Nullable<boolean>;
}

export interface QInputNumberState {
  minValue: number;
  maxValue: number;
  step: number;
}

export interface QInputNumberInstance {
  state: QInputNumberState;
  isDisabled: ComputedRef<boolean>;
  inputNumberClass: ComputedRef<Record<string, boolean>>;
  areControlsEnabled: ComputedRef<boolean>;
  isIncreaseDisabled: ComputedRef<boolean>;
  isDecreaseDisabled: ComputedRef<boolean>;
  formattedValue: ComputedRef<string>;
  handleBlur: (event: FocusEvent) => void;
  handleFocus: (event: FocusEvent) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  onInputKeyPress: (event: KeyboardEvent) => void;
  handleChangeNumberButtonClick: (event: boolean) => void;
  inputRef: Ref;
  handlePaste: (event: ClipboardEvent) => void;
  handleClick: (event: MouseEvent) => void;
}

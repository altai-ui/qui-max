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

export type Selections = {
  selectionNewStart: number;
  selectionNewEnd: number;
  value: string;
};

export interface AddittionsMatch {
  [index: string]: Nullable<string>;
}

export interface InsertedTextParts {
  target: HTMLInputElement;
  newValue: Nullable<number>;
  selectionEnd: number;
  hasMinusChar: boolean;
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
  handleKeyDown: (event: KeyboardEvent) => void;
  handleKeyPress: (event: KeyboardEvent) => void;
  handleChangeNumberButtonClick: (isIncrease: boolean) => void;
  inputRef: HTMLElement | null;
  handlePaste: (event: ClipboardEvent) => void;
  handleClick: (event: MouseEvent) => void;
}

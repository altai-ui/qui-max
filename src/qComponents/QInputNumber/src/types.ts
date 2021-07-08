import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

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
  prevValue: Nullable<number | string>;
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
  numberValue: Nullable<number>;
  prevPart: string;
  lastPart: string;
  key: string;
}

export interface InsertedTextArgs {
  target: HTMLInputElement;
  key: string;
  insertedText: string;
  localizationTag: string;
  minMax: { min: number; max: number };
  precision: number;
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
  handleDecreaseClick: () => void;
  handleIncreaseClick: () => void;
  inputRef: Ref<Nullable<HTMLElement>>;
  handlePaste: (event: ClipboardEvent) => void;
  handleClick: (event: MouseEvent) => void;
}

import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';
import { UnwrappedInstance } from '#/helpers';
import { QInputInstance } from '@/qComponents';

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
  min: Nullable<number>;
  max: Nullable<number>;
  step: Nullable<number>;
}

export interface QInputNumberState {
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
  handleDecreaseClick: () => void;
  handleIncreaseClick: () => void;
  inputRef: Ref<Nullable<UnwrappedInstance<QInputInstance>>>;
  handlePaste: (event: ClipboardEvent) => void;
  handleClick: (event: MouseEvent) => void;
}

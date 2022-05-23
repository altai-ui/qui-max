import type { Ref, ComputedRef } from 'vue';

import type { Nullable, Enumerable } from '#/helpers';

type Classes = Record<string, boolean>;
export type QInputClass = Nullable<string | Classes | Classes[]>;

export type QInputPropRootClass = QInputClass;

export interface QInputProps {
  modelValue: Nullable<Enumerable<string>>;
  disabled: Nullable<boolean>;
  showSymbolLimit: Nullable<boolean>;
  validateEvent: Nullable<boolean>;
  suffixIcon: Nullable<string>;
  clearable: Nullable<boolean>;
  passwordSwitch: Nullable<boolean>;
  rootClass: QInputPropRootClass;
}

export interface QInputState {
  hovering: boolean;
  focused: boolean;
  isPasswordVisible: boolean;
}

export interface QInputInstance {
  state: QInputState;
  classes: ComputedRef<QInputClass[]>;
  isDisabled: ComputedRef<boolean>;
  isPasswordSwitchShown: Ref<boolean>;
  isSuffixVisible: Ref<boolean>;
  isClearButtonShown: Ref<boolean>;
  isSymbolLimitShown: Ref<boolean>;
  textLength: Ref<number>;
  inputType: Ref<string>;
  // refs
  input: Ref<Nullable<HTMLInputElement>>;
  root: Ref<Nullable<HTMLElement>>;
  // methods
  handleBlur: (event: FocusEvent) => void;
  handleFocus: (event: FocusEvent) => void;
  handlePasswordVisible: () => void;
  handleClearClick: (event: MouseEvent) => void;
  handleInput: (event: Event) => void;
  handleChange: (event: Event) => void;
  updateModel: (event: Event) => void;
  t: (key: string) => string;
}

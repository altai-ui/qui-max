import type { Ref, ComputedRef } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

export type QInputPropModelValue = Nullable<string>;
export type QInputPropDisabled = Nullable<boolean>;
export type QInputPropShowSymbolLimit = Nullable<boolean>;
export type QInputPropValidateEvent = Nullable<boolean>;
export type QInputPropSuffixIcon = Nullable<string>;
export type QInputPropClearable = Nullable<boolean>;
export type QInputPropPasswordSwitch = Nullable<boolean>;
export type QInputPropRootClass = Nullable<ClassValue>;

export interface QInputProps {
  modelValue: QInputPropModelValue;
  disabled: QInputPropDisabled;
  showSymbolLimit: QInputPropShowSymbolLimit;
  validateEvent: QInputPropValidateEvent;
  suffixIcon: QInputPropSuffixIcon;
  clearable: QInputPropClearable;
  passwordSwitch: QInputPropPasswordSwitch;
  rootClass: QInputPropRootClass;
}

export interface QInputState {
  hovering: boolean;
  focused: boolean;
  isPasswordVisible: boolean;
}

export interface QInputInstance {
  state: QInputState;
  classes: ComputedRef<ClassValue>;
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

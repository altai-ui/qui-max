import { Ref } from 'vue';
import { Composer } from 'vue-i18n';

export interface QInputProps {
  modelValue: Nullable<string>;
  disabled: Nullable<boolean>;
  showSymbolLimit: Nullable<boolean>;
  validateEvent: Nullable<boolean>;
  suffixIcon: Nullable<string>;
  clearable: Nullable<boolean>;
  passwordSwitch: Nullable<boolean>;
}

export interface QInputState {
  hovering: boolean;
  focused: boolean;
  isPasswordVisible: boolean;
}

export interface QInput {
  state: QInputState;
  classes: Array<string | { [key: string]: string }>;
  inputDisabled: Ref<boolean>;
  isPasswordSwitchShown: Ref<boolean>;
  isSuffixVisible: Ref<boolean>;
  isClearButtonShown: Ref<boolean>;
  isSymbolLimitShown: Ref<boolean>;
  upperLimit: Ref<number>;
  textLength: Ref<number>;
  inputType: Ref<string>;
  // refs
  input: Ref<HTMLInputElement>;
  // methods
  handleBlur: (event: FocusEvent) => void;
  handleFocus: (event: FocusEvent) => void;
  handlePasswordVisible: () => void;
  handleClearClick: (event: MouseEvent) => void;
  t: Composer['t'];
}

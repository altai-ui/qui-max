import { Ref } from 'vue';

export interface State {
  hovering: boolean;
  focused: boolean;
  isPasswordVisible: boolean;
}

export interface QInput {
  state: State;
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
  t: (key: string) => string;
}

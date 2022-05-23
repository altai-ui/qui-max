import type { ComputedRef, Ref } from 'vue';

import type { Nullable } from '#/helpers';

export interface QInputNumberProps {
  modelValue: Nullable<number>;
  validateEvent: Nullable<boolean>;
  disabled: Nullable<boolean>;
  precision: Nullable<number>;
  min: Nullable<number>;
  max: Nullable<number>;
  prefix: Nullable<string>;
  suffix: Nullable<string>;
}

export interface QInputNumberInstance {
  inputRef: Ref<Nullable<HTMLInputElement>>;
  isDisabled: ComputedRef<boolean>;
  isPostfixVisible: ComputedRef<boolean>;
  handleInput: (event: Event) => void;
  handleChange: (event: Event) => void;
  handleFocus: (event: FocusEvent) => void;
  handleBlur: (event: FocusEvent) => void;
}

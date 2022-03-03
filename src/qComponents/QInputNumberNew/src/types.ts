import type { ComputedRef, Ref } from 'vue';

import type { Nullable } from '#/helpers';

export interface QInputNumberNewProps {
  modelValue: Nullable<number>;
  validateEvent: Nullable<boolean>;
  disabled: Nullable<boolean>;
  precision: Nullable<number>;
  min: Nullable<number>;
  max: Nullable<number>;
}

export interface QInputNumberNewInstance {
  inputRef: Ref<Nullable<HTMLInputElement>>;
  isDisabled: ComputedRef<boolean>;
  handleInput: (event: KeyboardEvent) => void;
  handleChange: (event: Event) => void;
  handleEvent: (event: Event) => void;
}

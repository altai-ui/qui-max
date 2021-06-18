import type { Ref, ComputedRef } from 'vue';
import type { Composer } from 'vue-i18n';

import type { Nullable } from '#/helpers';

export type QTextareaPropResize = 'vertical' | 'horizontal' | 'both' | 'none';
export type QTextareaPropAutosize = Nullable<
  boolean | { minRows: number; maxRows: number }
>;

export interface QTextareaProps {
  modelValue: Nullable<string>;
  resize: QTextareaPropResize;
  disabled: Nullable<boolean>;
  showSymbolLimit: Nullable<boolean>;
  autosize: QTextareaPropAutosize;
  validateEvent: Nullable<boolean>;
}

export interface QTextareaInstance {
  t: Composer['t'];
  textareaCalcStyle: Ref<{
    minHeight?: string | undefined;
    height?: string | undefined;
    resize?: string | undefined;
  }>;
  classes: ComputedRef<Record<string, boolean>>;
  textarea: Ref<Nullable<HTMLTextAreaElement>>;
  textareaStyle: ComputedRef<Record<string, string>>;
  isDisabled: ComputedRef<boolean>;
  isSymbolLimitShown: ComputedRef<boolean>;
  updateModel: (event: Event) => void;
  handleBlur: (event: FocusEvent) => void;
  handleFocus: (event: FocusEvent) => void;
  handleInput: (event: Event) => void;
  handleChange: (event: Event) => void;
  textLength: ComputedRef<number>;
}

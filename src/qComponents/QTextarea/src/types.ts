import { Ref, ComputedRef } from 'vue';

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
  t: (arg0: string) => string;
  textareaCalcStyle: Ref<{
    minHeight?: string | undefined;
    height?: string | undefined;
    resize?: string | undefined;
  }>;
  classes: ComputedRef<(string | Record<string, boolean>)[]>;
  textarea: Ref<HTMLTextAreaElement | null>;
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

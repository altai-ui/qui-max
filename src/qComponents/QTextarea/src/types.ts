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

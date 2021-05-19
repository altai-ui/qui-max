import { ComputedRef } from 'vue';

interface Option {
  value: number | string;
  label: string;
  children?: Nullable<Option[]>;
}

export type QCascaderPropModelValue = Nullable<
  number | string | string[] | number[]
>;
export type QCascaderPropOptions = Nullable<Option[]>;

export interface QCascaderProps {
  modelValue: QCascaderPropModelValue;
  options: QCascaderPropOptions;
  separator: Nullable<string>;
  multiple: Nullable<boolean>;
  clearable: Nullable<boolean>;
  disabled: Nullable<boolean>;
}

export interface QCascaderInstance {
  rootClasses: ComputedRef<Record<string, boolean>>;
}

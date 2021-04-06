import { Ref } from 'vue';

export type ModelValue = string | number | boolean;

export interface QRadioGroupProvider {
  modelValue: Ref<ModelValue>;
  disabled: Ref<boolean>;
  changeValue: (value: ModelValue) => void;
}

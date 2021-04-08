import { Ref } from 'vue';

export interface QCheckboxGroupProvider {
  modelValue: Ref<string[]>;
  min: Ref<number>;
  max: Ref<number>;
  disabled: Ref<boolean>;
  isLimitExceeded: Ref<boolean>;
  update: (value: string[]) => void;
}

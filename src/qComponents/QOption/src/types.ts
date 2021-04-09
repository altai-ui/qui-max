import { Ref } from 'vue';

export interface QOptionInterface {
  preparedLabel: Ref<string>;
  isVisible: Ref<boolean>;
  isSelected: Ref<boolean>;
  isLimitReached: Ref<boolean>;
  isDisabled: Ref<boolean>;
  disabled: Ref<boolean>;
  created: Ref<boolean>;
  label: Ref<string | number>;
  key: Ref<string>;
  modelValue: Ref<{
    value: {
      value: string;
    };
    label: string;
    disabled: boolean;
  }>;
}

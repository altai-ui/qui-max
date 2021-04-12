import { Ref, ComputedRef } from 'vue';

export interface QOptionInterface {
  created: Ref<boolean>;
  disabled: Ref<boolean>;
  isDisabled: ComputedRef<boolean>;
  isLimitReached: ComputedRef<boolean>;
  isSelected: ComputedRef<boolean>;
  isVisible: ComputedRef<boolean>;
  key: ComputedRef<string>;
  label: Ref<string | number>;
  modelValue: Ref<{
    value: {
      value: string;
    };
    label?: string;
    disabled?: boolean;
  }>;
  preparedLabel?: ComputedRef<string>;
}

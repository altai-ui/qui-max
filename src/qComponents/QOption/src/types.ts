import { Ref, ComputedRef } from 'vue';

import type { ModelValue } from '@/qComponents/QSelect/src/types';

export interface QOptionInterface {
  created: boolean;
  disabled: boolean;
  isDisabled: boolean;
  isLimitReached: boolean;
  isSelected: boolean;
  isVisible: boolean;
  key: string | number;
  label: string | number;
  modelValue: ModelValue;
  preparedLabel: string;
  $el?: HTMLElement | undefined;
}

export interface QOptionInterfaceRefs {
  created: Ref<boolean>;
  disabled: Ref<boolean>;
  isDisabled: ComputedRef<boolean>;
  isLimitReached: ComputedRef<boolean>;
  isSelected: ComputedRef<boolean>;
  isVisible: ComputedRef<boolean>;
  key: ComputedRef<string | number>;
  label: Ref<string | number>;
  modelValue: Ref<ModelValue>;
  preparedLabel: ComputedRef<string>;
  $el?: HTMLElement | undefined;
}

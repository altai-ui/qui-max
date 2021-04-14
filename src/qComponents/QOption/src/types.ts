import { Ref, Ref } from 'vue';

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

import type { Option } from '@/qComponents/QSelect/src/types';

export interface QOptionInterface {
  created: boolean;
  disabled: boolean;
  isDisabled: boolean;
  isLimitReached: boolean;
  isSelected: boolean;
  isVisible: boolean;
  key: string | number;
  label: string | number;
  modelValue: string | number | Option;
  preparedLabel: string;
  root?: HTMLElement | undefined;
}

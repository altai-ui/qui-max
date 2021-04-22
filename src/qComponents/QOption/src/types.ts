import { ComputedRef, Ref } from 'vue';

import type { Option } from '@/qComponents/QSelect';

export interface QOptionInstance {
  multiple: boolean;
  preparedLabel: ComputedRef<string>;
  isVisible: ComputedRef<Nullable<boolean>>;
  isSelected: ComputedRef<boolean>;
  isLimitReached: ComputedRef<boolean>;
  isDisabled: ComputedRef<boolean>;
  handleMouseEnter: () => void;
  handleOptionClick: () => void;
  root: Ref<Nullable<HTMLElement>>;
}

export interface QOptionProps {
  modelValue: Nullable<string | number | Option>;
  label: Nullable<string | number>;
  created: Nullable<boolean>;
  disabled: Nullable<boolean>;
}

export interface QOptionModel extends QOptionProps {
  preparedLabel: string;
  isVisible: Nullable<boolean>;
  isSelected: boolean;
  isLimitReached: boolean;
  isDisabled: boolean;
  key: string | number;
  root: Nullable<HTMLElement>;
}

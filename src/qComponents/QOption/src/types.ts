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
  root?: Ref<HTMLElement | null>;
}

export interface QOptionProvideInstance extends QOptionProps {
  preparedLabel: string;
  isVisible: Nullable<boolean>;
  isSelected: boolean;
  isLimitReached: boolean;
  isDisabled: boolean;
  key: string | number;
  root: HTMLElement | null;
}

export interface QOptionProps {
  modelValue: Nullable<string | number | Option>;
  label: Nullable<string | number>;
  created: Nullable<boolean>;
  disabled: Nullable<boolean>;
}

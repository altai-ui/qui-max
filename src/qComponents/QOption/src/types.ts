import type { Ref, ComputedRef } from 'vue';

export type QOptionPropValue = string | number | Record<string, unknown>;

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
  value: Nullable<QOptionPropValue>;
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

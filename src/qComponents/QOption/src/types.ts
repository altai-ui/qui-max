import type { Ref, ComputedRef } from 'vue';

import type { Nullable, Nillable, ClassValue } from '#/helpers';

export type QOptionPropValue = Nillable<
  string | number | Record<string, unknown>
>;
export type QOptionPropLabel = Nillable<string | number>;
export type QOptionPropCreated = Nullable<boolean>;
export type QOptionPropDisabled = Nullable<boolean>;

export interface QOptionProps {
  value: QOptionPropValue;
  label: QOptionPropLabel;
  created: QOptionPropCreated;
  disabled: QOptionPropDisabled;
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
  qOptionClasses: ComputedRef<ClassValue>;
}

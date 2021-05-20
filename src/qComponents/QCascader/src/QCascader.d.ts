import { Ref, ComputedRef, ComponentPublicInstance, UnwrapRef } from 'vue';

import type { QCascaderInputInstance } from './QCascaderInput';

export interface Option {
  value: number | string;
  label: string;
  disabled?: boolean;
  children?: Nullable<Option[]>;
}

export type QCascaderPropModelValue = Nullable<
  number | string | (number | string)[]
>;
export type QCascaderPropOptions = Nullable<Option[]>;
export type QCascaderPropTeleportTo = Nullable<string | HTMLElement>;

export interface QCascaderProps {
  modelValue: QCascaderPropModelValue;
  options: QCascaderPropOptions;
  separator: Nullable<string>;
  multiple: Nullable<boolean>;
  clearable: Nullable<boolean>;
  disabled: Nullable<boolean>;
  teleportTo: QCascaderPropTeleportTo;
}

type Reference = Ref<
  Nullable<ComponentPublicInstance<UnwrapRef<QCascaderInputInstance>>>
>;

export interface QCascaderInstance {
  reference: Reference;
  state: QCascaderState;
  isDisabled: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
  handleTriggerClick: () => void;
  handleDropdownClose: () => void;
}

export interface QCascaderState {
  isDropdownShown: boolean;
}

export interface QCascaderProvider {
  isDropdownShown: Ref<boolean>;
  modelValue: Ref<QCascaderPropModelValue>;
  options: Ref<QCascaderPropOptions>;
  disabled: ComputedRef<boolean>;
  multiple: Ref<Nullable<boolean>>;
  clearable: Ref<Nullable<boolean>>;
  uniqueId: string;
  popoverReference: Reference;
  updateValue: (value: string | number) => void;
}

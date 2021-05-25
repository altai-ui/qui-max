import type { Ref, ComputedRef, ComponentPublicInstance, UnwrapRef } from 'vue';

import type { QCascaderInputInstance } from './QCascaderInput/QCascaderInput';
import type { QCascaderDropdownInstance } from './QCascaderDropdown/QCascaderDropdown';

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
  checkStrictly: Nullable<boolean>;
  allLevelsShown: Nullable<boolean>;
  collapseTags: Nullable<boolean>;
  placeholder: Nullable<string>;
  teleportTo: QCascaderPropTeleportTo;
}

type Reference = Ref<
  Nullable<ComponentPublicInstance<UnwrapRef<QCascaderInputInstance>>>
>;
type Dropdown = Ref<
  Nullable<ComponentPublicInstance<UnwrapRef<QCascaderDropdownInstance>>>
>;

export interface QCascaderInstance {
  reference: Reference;
  dropdown: Dropdown;
  isDropdownShown: Ref<boolean>;
  isDisabled: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
  handleReferenceTrigger: () => void;
  handleDropdownClose: () => void;
}

export interface QCascaderProvider {
  isDropdownShown: Ref<boolean>;
  modelValue: Ref<QCascaderPropModelValue>;
  options: Ref<QCascaderPropOptions>;
  allLevelsShown: Ref<Nullable<boolean>>;
  separator: Ref<Nullable<string>>;
  disabled: ComputedRef<boolean>;
  multiple: Ref<Nullable<boolean>>;
  clearable: Ref<Nullable<boolean>>;
  checkStrictly: Ref<Nullable<boolean>>;
  collapseTags: Ref<Nullable<boolean>>;
  placeholder: Ref<Nullable<string>>;
  uniqueId: string;
  popoverReference: Reference;
  updateValue: (
    value: Nullable<number | string | (number | string)[]>,
    isExist?: boolean
  ) => void;
}

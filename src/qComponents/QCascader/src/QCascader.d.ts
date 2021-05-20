import { Ref, ComputedRef } from 'vue';

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

export interface QCascaderInstance {
  reference: Ref<Nullable<HTMLElement>>;
  state: QCascaderState;
  isDisabled: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
  isClearBtnShown: ComputedRef<boolean>;
  arrowIconClass: ComputedRef<string>;
  handleTriggerClick: () => void;
  handleDropdownClose: () => void;
}

export interface QCascaderState {
  isDropdownShown: boolean;
}

export interface QCascaderProvider {
  options: Ref<Nullable<Option[]>>;
  multiple: Ref<Nullable<boolean>>;
  uniqueId: string;
  popoverReference: Ref<HTMLElement | null>;
  updateValue: (value: string | number) => void;
}

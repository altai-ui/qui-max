import { Ref, ComputedRef } from 'vue';
import { Instance as PopperInstance } from '@popperjs/core';

import { QOptionInterface } from '@/qComponents/QOption';

type Option = {
  value: string | { value: unknown; label: string; disabled: boolean };
};
type ModelValue = string | number | Option[] | [] | null;

interface QSelectProvider {
  toggleMenu: () => void;
  toggleOptionSelection: (option: unknown) => void;
  setSelected: () => void;
  options: QOptionInterface[] | null;
  query: string;
  multipleLimit: Ref<number>;
  valueKey: Ref<string>;
  remote: Ref<boolean>;
  multiple: Ref<boolean>;
  hoverIndex: number;
  modelValue: Ref<ModelValue>;
}

interface QSelectState {
  options: QOptionInterface[];
  inputWidth: number;
  visible: boolean;
  selectedLabel: string;
  hoverIndex: number;
  query: string;
  inputHovering: boolean;
  menuVisibleOnFocus: boolean;
  popper: PopperInstance | null;
  isDropdownShown: boolean;
}

interface QSelectDropdownInstance {
  zIndex: Ref<number>;
  styles: ComputedRef<{
    zIndex: number;
    width: string | null;
  }>;
  isVisibleOptionExist: ComputedRef<boolean>;
  areAllSelected: ComputedRef<boolean>;
  isIndeterminate: ComputedRef<boolean>;
  navigateDropdown: (e: KeyboardEvent) => void;
  handleSelectAllClick: () => void;
  root: Ref<HTMLDivElement | null>;
  multiple: boolean | Ref<boolean>;
  scrollbar: HTMLDivElement | null;
  $el: HTMLElement;
}
export { QSelectProvider, QSelectState, QSelectDropdownInstance };
export type { Option, ModelValue };

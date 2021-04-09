import { Ref, ComputedRef } from 'vue';
import { Instance as PopperInstance } from '@popperjs/core';

import { QOptionInterface } from '@/qComponents/QOption';

export interface QSelectProvider {
  toggleMenu: () => void;
  toggleOptionSelection: (option: unknown) => void;
  setSelected: () => void;
  options: QOptionInterface[];
  query: string;
  multipleLimit: Ref<number>;
  valueKey: Ref<string>;
  remote: Ref<boolean>;
  multiple: Ref<boolean>;
  hoverIndex: number;
  modelValue: Ref<
    | string
    | number
    | {
        value:
          | string
          | {
              value: unknown;
              label: string;
              disabled: boolean;
            }[]
          | [];
      }
  >;
}

export interface State {
  options: QOptionInterface[];
  selected: QOptionInterface[] | null;
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

export interface QSelectDropdownInstance {
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
}

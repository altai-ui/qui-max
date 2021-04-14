import { Ref, ComputedRef } from 'vue';
import { Instance as PopperInstance } from '@popperjs/core';

import { QOptionInterface } from '@/qComponents/QOption';

type Option = {
  value: string | { value: unknown; label: string; disabled: boolean };
};
type ModelValue = string | number | Option | Option[] | [] | null;
type NewOption = {
  value: ModelValue;
  key: ModelValue;
  preparedLabel: string | number;
};

interface QSelectProvider {
  toggleMenu: () => void;
  toggleOptionSelection: (option: QOptionInterface) => void;
  setSelected: () => void;
  state: QSelectState;
  multipleLimit: Ref<number>;
  valueKey: Ref<string>;
  remote: Ref<boolean>;
  multiple: Ref<boolean>;
  modelValue: Ref<ModelValue>;
}

interface QSelectState {
  options: QOptionInterface[];
  selected:
    | QOptionInterface
    | NewOption
    | (QOptionInterface | NewOption)[]
    | null;
  inputWidth: number;
  visible: boolean;
  selectedLabel: string | number;
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

interface QSelectTagsInstance {
  handleBackspaceKeyDown: () => void;
  handleTagClose: (option: QOptionInterface[] | null) => void;
  handleInput: (event: KeyboardEvent) => void;
  emitExit: () => void;
  input: Ref<HTMLInputElement | null>;
}

export {
  QSelectProvider,
  QSelectState,
  QSelectDropdownInstance,
  QSelectTagsInstance
};
export type { Option, ModelValue, NewOption };

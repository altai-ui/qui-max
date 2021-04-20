import { Ref, ComputedRef } from 'vue';
import { Instance as PopperInstance } from '@popperjs/core';

import { QOptionInstance } from '@/qComponents/QOption';
import { QScrollbarInstance } from '@/qComponents/QScrollbar/src/types';

type Option = {
  value: string | { value: unknown; label: string; disabled: boolean };
};
type ModelValue =
  | string
  | number
  | Option
  | (string | number | Option)[]
  | null;
type NewOption = {
  value: ModelValue;
  key: ModelValue;
  preparedLabel: string | number;
};

interface QSelectProvider {
  toggleMenu: () => void;
  toggleOptionSelection: (option: QOptionInstance) => void;
  setSelected: () => void;
  addOption: (optionInstance: QOptionInstance) => void;
  removeOption: (optionInstance: QOptionInstance) => void;
  updateHoverIndex: (index: number) => void;
  multipleLimit: Ref<number>;
  filterable: Ref<boolean>;
  collapseTags: Ref<boolean>;
  isDisabled: ComputedRef<boolean>;
  autocomplete: Ref<'on' | 'off'>;
  valueKey: Ref<string>;
  remote: Ref<boolean>;
  multiple: Ref<boolean>;
  modelValue: Ref<ModelValue>;
}

interface QSelectState {
  options: QOptionInstance[];
  selected:
    | QOptionInstance
    | NewOption
    | (QOptionInstance | NewOption)[]
    | null;
  inputWidth: number;
  selectedLabel: string | number;
  hoverIndex: number;
  query: string | number;
  hover: boolean;
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
  multiple: Ref<boolean>;
  scrollbar: QScrollbarInstance;
  $el: HTMLElement;
}

interface QSelectTagsInstance {
  handleBackspaceKeyDown: () => void;
  handleTagClose: (option: QOptionInstance[] | null) => void;
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

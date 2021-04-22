import { Ref, ComputedRef } from 'vue';
import { Instance as PopperInstance } from '@popperjs/core';

import type { QOptionProvideInstance } from '@/qComponents/QOption';
import QScrollbar from '@/qComponents/QScrollbar';
import { TranslateResult, Path, Locale } from 'vue-i18n';
import { QInput } from '@/qComponents';
import QSelectTags from './QSelectTags.vue';
import QSelectDropdown from './QSelectDropdown.vue';

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

interface QSelectInstance {
  input: Ref<typeof QInput | null>;
  tags: Ref<typeof QSelectTags | null>;
  dropdown: Ref<typeof QSelectDropdown | null>;
  root: Ref<HTMLElement | null>;
  state: QSelectState;
  preparedPlaceholder: ComputedRef<Nullable<string>>;
  visibleOptionsCount: ComputedRef<number>;
  isCanLoadMoreShown: ComputedRef<boolean | null>;
  showEmptyContent: ComputedRef<boolean>;
  isReadonly: ComputedRef<Nullable<boolean>>;
  isDisabled: ComputedRef<boolean>;
  isClearBtnShown: ComputedRef<boolean | null>;
  iconClass: ComputedRef<string>;
  emptyText: ComputedRef<string>;
  isNewOptionShown: ComputedRef<boolean | null>;
  popperInit: () => void;
  showPopper: () => void;
  hidePopper: () => void;
  handleFocus: (event: MouseEvent) => void;
  handleBlur: (event: MouseEvent) => void;
  clearSelected: () => void;
  getValueIndex: (
    arr: (string | number | Option)[] | undefined,
    optionValue: string | number | Option
  ) => number;
  toggleOptionSelection: (option: QOptionProvideInstance) => void;
  emitValueUpdate: (value: ModelValue) => void;
  toggleMenu: () => void;
  handleEnterKeyUp: () => void;
  onInputChange: () => void;
  deleteTag: (tag: QOptionProvideInstance) => void;
  t: (key: Path, locale: Locale) => TranslateResult;
}

interface QSelectProvider {
  toggleMenu: () => void;
  toggleOptionSelection: (option: QOptionProvideInstance) => void;
  setSelected: () => void;
  addOption: (optionInstance: QOptionProvideInstance) => void;
  removeOption: (optionInstance: QOptionProvideInstance) => void;
  updateHoverIndex: (index: number) => void;
  state: Partial<QSelectState>;
  multipleLimit: Ref<Nullable<number>>;
  filterable: Ref<Nullable<boolean>>;
  collapseTags: Ref<Nullable<boolean>>;
  isDisabled: ComputedRef<boolean>;
  autocomplete: Ref<Nullable<'on' | 'off'>>;
  valueKey: Ref<Nullable<string>>;
  remote: Ref<Nullable<boolean>>;
  multiple: Ref<Nullable<boolean>>;
  modelValue: Ref<ModelValue>;
}

interface QSelectProps {
  selectAllShown: Nullable<boolean>;
  selectAllText: Nullable<string>;
  loadMoreText: Nullable<string>;
  filterable: Nullable<boolean>;
  collapseTags: Nullable<boolean>;
  autocomplete: Nullable<'on' | 'off'>;
  multiple: Nullable<boolean>;
  modelValue: Nullable<ModelValue>;
  placeholder: Nullable<string>;
  disabled: Nullable<boolean>;
  canLoadMore: Nullable<boolean>;
  loading: Nullable<boolean>;
  loadingText: Nullable<string>;
  noMatchText: Nullable<string>;
  noDataText: Nullable<string>;
  allowCreate: Nullable<boolean>;
  clearable: Nullable<boolean>;
  remote: Nullable<boolean>;
  valueKey: Nullable<string>;
  multipleLimit: Nullable<number>;
}

interface QSelectState {
  options: QOptionProvideInstance[];
  selected:
    | QOptionProvideInstance
    | NewOption
    | (QOptionProvideInstance | NewOption)[]
    | null;
  inputWidth: number;
  selectedLabel: string | number;
  hoverIndex: number;
  query: string;
  hover: boolean;
  menuVisibleOnFocus: boolean;
  popper: PopperInstance | null;
  isDropdownShown: boolean;
}

interface QSelectDropdownInstance {
  zIndex: Ref<number>;
  styles: ComputedRef<Record<string, string | number | null>>;
  isVisibleOptionExist: ComputedRef<boolean>;
  areAllSelected: ComputedRef<boolean>;
  isIndeterminate: ComputedRef<boolean>;
  navigateDropdown: (e: KeyboardEvent) => void;
  handleSelectAllClick: () => void;
  root: Ref<HTMLDivElement | null>;
  multiple: Ref<Nullable<boolean>> | boolean;
  scrollbar: Ref<typeof QScrollbar | null>;
  qSelectState: Partial<QSelectState> | null;
  $el?: HTMLElement;
}

interface QSelectDropdownProps {
  shown: Nullable<boolean>;
  selectAllShown: Nullable<boolean>;
  selectAllText: Nullable<string>;
  showEmptyContent: Nullable<boolean>;
  emptyText: Nullable<string>;
  isCanLoadMoreShown: Nullable<boolean>;
  loadMoreText: Nullable<string>;
  isNewOptionShown: Nullable<boolean>;
  width: Nullable<number>;
}

interface QSelectTagsInstance {
  filterable: Ref<Nullable<boolean> | boolean>;
  collapseTags: Ref<Nullable<boolean> | boolean>;
  isDisabled: Ref<Nullable<boolean> | boolean>;
  autocomplete: Ref<Nullable<string>>;
  selected: Ref<QSelectState['selected'] | undefined> | undefined;
  query: Ref<string | undefined> | undefined;
  handleBackspaceKeyDown: () => void;
  handleTagClose: (option: QOptionProvideInstance[] | null) => void;
  handleInput: (event: KeyboardEvent) => void;
  input: Ref<HTMLInputElement | null>;
}

export {
  Option,
  ModelValue,
  NewOption,
  QSelectInstance,
  QSelectProps,
  QSelectProvider,
  QSelectState,
  QSelectDropdownInstance,
  QSelectDropdownProps,
  QSelectTagsInstance
};

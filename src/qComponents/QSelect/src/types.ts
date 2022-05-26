import type { Instance as PopperInstance } from '@popperjs/core';
import type { Ref, ComputedRef } from 'vue';

import type { QInputInstance } from '@/qComponents/QInput';
import type { QOptionModel, QOptionPropValue } from '@/qComponents/QOption';
import type { QScrollbarInstance } from '@/qComponents/QScrollbar';

import type { Nullable, Optional, UnwrappedInstance } from '#/helpers';

export type QSelectPropModelValue = Nullable<
  string | number | QOptionPropValue | (string | number | QOptionPropValue)[]
>;

export type QSelectPropAutocomplete = Nullable<'on' | 'off'>;

export type QSelectPropCanLoadMore = Nullable<boolean>;

export type QSelectPropDisabled = Nullable<boolean>;

export type QSelectPropClearable = Nullable<boolean>;

export type QSelectPropFilterable = Nullable<boolean>;

export type QSelectPropAllowCreate = Nullable<boolean>;

export type QSelectPropLoading = Nullable<boolean>;

export type QSelectPropRemote = Nullable<boolean>;

export type QSelectPropLoadingText = Nullable<string>;

export type QSelectPropLoadMoreText = Nullable<string>;

export type QSelectPropNoMatchText = Nullable<string>;

export type QSelectPropNoDataText = Nullable<string>;

export type QSelectPropMultiple = Nullable<boolean>;

export type QSelectPropMultipleLimit = Nullable<number>;

export type QSelectPropPlaceholder = Nullable<string>;

export type QSelectPropSelectAllShown = Nullable<boolean>;

export type QSelectPropSelectAllText = Nullable<string>;

export type QSelectPropValueKey = Nullable<string>;

export type QSelectPropCollapseTags = Nullable<boolean>;

export type QSelectPropTeleportTo = Nullable<string | HTMLElement>;

interface QSelectProps {
  modelValue: QSelectPropModelValue;
  autocomplete: QSelectPropAutocomplete;
  canLoadMore: QSelectPropCanLoadMore;
  disabled: QSelectPropDisabled;
  clearable: QSelectPropClearable;
  filterable: QSelectPropFilterable;
  allowCreate: QSelectPropAllowCreate;
  loading: QSelectPropLoading;
  remote: QSelectPropRemote;
  loadingText: QSelectPropLoadingText;
  loadMoreText: QSelectPropLoadMoreText;
  noMatchText: QSelectPropNoMatchText;
  noDataText: QSelectPropNoDataText;
  multiple: QSelectPropMultiple;
  multipleLimit: QSelectPropMultipleLimit;
  placeholder: QSelectPropPlaceholder;
  selectAllShown: QSelectPropSelectAllShown;
  selectAllText: QSelectPropSelectAllText;
  valueKey: QSelectPropValueKey;
  collapseTags: QSelectPropCollapseTags;
  teleportTo: QSelectPropTeleportTo;
}

type NewOption = {
  value: QSelectPropModelValue;
  key: QSelectPropModelValue;
  preparedLabel: string | number;
};

interface QSelectInstance {
  input: Ref<UnwrappedInstance<QInputInstance>>;
  tags: Ref<UnwrappedInstance<QSelectTagsInstance>>;
  dropdown: Ref<UnwrappedInstance<QSelectDropdownInstance>>;
  root: Ref<Nullable<HTMLElement>>;
  state: QSelectState;
  preparedPlaceholder: ComputedRef<Nullable<string>>;
  visibleOptionsCount: ComputedRef<number>;
  isCanLoadMoreShown: ComputedRef<Nullable<boolean>>;
  showEmptyContent: ComputedRef<boolean>;
  isReadonly: ComputedRef<Nullable<boolean>>;
  isDisabled: ComputedRef<boolean>;
  isClearBtnShown: ComputedRef<Nullable<boolean>>;
  iconClass: ComputedRef<string>;
  emptyText: ComputedRef<string>;
  isNewOptionShown: ComputedRef<Nullable<boolean>>;
  popperInit: () => void;
  showPopper: () => void;
  hidePopper: () => void;
  handleFocus: (event: MouseEvent) => void;
  handleBlur: (event: MouseEvent) => void;
  clearSelected: () => void;
  getValueIndex: (
    arr: (string | number | QOptionPropValue)[],
    optionValue: string | number | QOptionPropValue
  ) => number;
  toggleOptionSelection: (option: QOptionModel) => void;
  emitValueUpdate: (value: QSelectPropModelValue) => void;
  toggleMenu: (event: MouseEvent | KeyboardEvent) => void;
  handleEnterKeyUp: (event: KeyboardEvent) => void;
  onInputChange: () => void;
  deleteTag: (tag: QOptionModel) => void;
  afterLeave: () => void;
  t: (key: string) => string;
}

interface QSelectProvider {
  toggleMenu: (event: MouseEvent | KeyboardEvent) => void;
  toggleOptionSelection: (option: QOptionModel) => void;
  setSelected: () => void;
  addOption: (optionInstance: QOptionModel) => void;
  removeOption: (optionInstance: QOptionModel) => void;
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
  modelValue: Ref<QSelectPropModelValue>;
}

interface QSelectState {
  options: QOptionModel[];
  selected: Nullable<QOptionModel | NewOption | (QOptionModel | NewOption)[]>;
  inputWidth: number;
  selectedLabel: string | number;
  hoverIndex: number;
  query: string;
  hover: boolean;
  menuVisibleOnFocus: boolean;
  popper: Nullable<PopperInstance>;
  isDropdownShown: boolean;
}

interface QSelectDropdownInstance {
  zIndex: Ref<number>;
  styles: ComputedRef<Record<string, Nullable<string | number>>>;
  isVisibleOptionExist: ComputedRef<boolean>;
  areAllSelected: ComputedRef<boolean>;
  isIndeterminate: ComputedRef<boolean>;
  navigateDropdown: (e: KeyboardEvent) => void;
  handleSelectAllClick: () => void;
  root: Ref<Nullable<HTMLDivElement>>;
  multiple: Ref<Nullable<boolean>> | boolean;
  scrollbar: Ref<UnwrappedInstance<QScrollbarInstance>>;
  qSelectState: Partial<Nullable<QSelectState>>;
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
  selected: Ref<Optional<QSelectState['selected']>>;
  query: Ref<Optional<string>>;
  handleBackspaceKeyDown: () => void;
  handleTagClose: (option: Nullable<QOptionModel | NewOption>) => void;
  handleInput: (event: KeyboardEvent) => void;
  input: Ref<Nullable<HTMLInputElement>>;
}

export {
  QOptionPropValue,
  NewOption,
  QSelectInstance,
  QSelectProps,
  QSelectProvider,
  QSelectState,
  QSelectDropdownInstance,
  QSelectDropdownProps,
  QSelectTagsInstance
};

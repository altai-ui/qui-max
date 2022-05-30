import type { ComputedRef, Ref, CSSProperties } from 'vue';

import type { QScrollbarInstance } from '@/qComponents/QScrollbar';
import type { QSelectState } from '@/qComponents/QSelect';

import type { Nullable, UnwrappedInstance } from '#/helpers';

export interface QSelectDropdownProps {
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

export interface QSelectDropdownInstance {
  zIndex: Ref<number>;
  styles: ComputedRef<CSSProperties>;
  isVisibleOptionExist: ComputedRef<boolean>;
  areAllSelected: ComputedRef<boolean>;
  isIndeterminate: ComputedRef<boolean>;
  navigateDropdown: (e: KeyboardEvent) => void;
  handleSelectAllClick: () => void;
  root: Ref<Nullable<HTMLDivElement>>;
  multiple: Ref<Nullable<boolean>>;
  scrollbar: Ref<UnwrappedInstance<QScrollbarInstance>>;
  qSelectState: Partial<Nullable<QSelectState>>;
}

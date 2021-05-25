import type { Ref, ComputedRef } from 'vue';

export interface MenuBar {
  value: number | string;
  label: string;
}

export interface QCascaderDropdownInstance {
  uniqueId: string;
  dropdown: Ref<Nullable<HTMLElement>>;
  zIndex: Ref<number>;
  columnList: ComputedRef<MenuBar[][]>;
  expandRow: (rowIndex: number, columnIndex: number) => void;
  updatePopperJs: () => Promise<void>;
}

export interface QCascaderDropdownProvider {
  expandedRows: Ref<number[]>;
  columnList: ComputedRef<MenuBar[][]>;
}

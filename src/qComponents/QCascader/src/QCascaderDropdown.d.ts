import { Ref, ComputedRef } from 'vue';

export interface MenuBar {
  value: number | string;
  label: string;
}

export interface QCascaderDropdownInstance {
  uniqueId: string;
  dropdown: Ref<HTMLElement | null>;
  zIndex: Ref<number>;
  columnList: ComputedRef<MenuBar[][]>;
  expandRow: (rowIndex: number, columnIndex: number) => void;
}

import { Ref, ComputedRef } from 'vue';

export interface QTableColgroupProps {
  isSelectable: boolean;
  // TODO
  groupsOfColumns: unknown[];
  checkboxColWidth: number;
  defaultColWidth: Nullable<string>;
}

export interface QTableColgroupInstance {
  checkboxColStyles: ComputedRef<Record<string, string>>;
  // TODO
  getColWidth: (column: unknown) => Record<string, string>;
}

export interface QTableDragElementsProps {
  parentSelector: string;
  limitBoxSelector: string;
  dummySelector: string;
  separatorSelector: string;
  targetSelector: string;
  dropZoneSelector: string;
  colIndex: number;
  isFirstBlocked: Nullable<boolean>;
}

export interface QTableDragElementsState {
  diff: number;
  colEl: Nullable<HTMLElement>;
  dummyEl: Nullable<HTMLElement>;
  separatorDummyEl: Nullable<HTMLElement>;
  parent: Nullable<HTMLElement>;
  parentBox: Nullable<DOMRect>;
  draggendIndex: Nullable<number>;
}

export interface QTableDragElementsInstance {
  root: Ref<Nullable<HTMLElement>>;
  handleColDrag: (e: MouseEvent) => void;
}

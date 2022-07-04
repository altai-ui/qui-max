import type { Ref, ComputedRef, Slots, StyleValue } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

interface SelectionColumn {
  enabled?: Nullable<boolean>;
  selectAllShown?: Nullable<boolean>;
  selectTotalShown?: Nullable<boolean>;
  sticky?: Nullable<boolean>;
}

export interface Column {
  key: string;
  value: Nullable<string | number>;
  isHidden?: boolean;
  sortable?: boolean;
  sortOrder?: Nullable<'ascending' | 'descending'>[];
  draggable?: boolean;
  align?: 'left' | 'right';
  slots?: Record<string, string>;
  width?: string;
  minWidth?: string;
  customCellClass?: string;
  sticky?: {
    position?: 'left' | 'right';
  };
  formatter?: (
    // TODO: TS generic?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    row: Record<string, unknown>,
    column: Column
  ) => unknown;
}

export interface GroupOfColumns {
  key: string;
  columns: Column[];
  color?: string;
  draggable?: boolean;
}

export interface SortBy {
  key: Nullable<string>;
  direction: Nullable<'ascending' | 'descending'>;
}

export type Row = Record<string, unknown>;

export type QTablePropGrid = Nullable<boolean>;
export type QTablePropFixedLayout = Nullable<boolean>;
export type QTablePropIsLoading = Nullable<boolean>;
export type QTablePropLoadingRowCount = Nullable<number>;
export type QTablePropDefaultColWidth = Nullable<string>;
export type QTablePropSelectionColumn = Nullable<SelectionColumn>;
export type QTablePropGroupsOfColumns = GroupOfColumns[];
export type QTablePropTotal = Nullable<Record<string, unknown>>;
export type QTablePropRows = Row[];
export type QTablePropCheckedRows = Nullable<number[]>;
export type QTablePropSortBy = Nullable<SortBy>;
export type QTablePropCustomRowClass = Nullable<
  (arg0: { row: Row; rowIndex: number }) => Nullable<ClassValue>
>;
export type QTablePropCustomRowStyle = Nullable<
  (arg0: { row: Row; rowIndex: number }) => Nullable<StyleValue>
>;
export type QTablePropEmptyText = Nullable<string>;

export interface QTableProps {
  grid: QTablePropGrid;
  fixedLayout: QTablePropFixedLayout;
  isLoading: QTablePropIsLoading;
  loadingRowCount: QTablePropLoadingRowCount;
  defaultColWidth: QTablePropDefaultColWidth;
  selectionColumn: QTablePropSelectionColumn;
  groupsOfColumns: QTablePropGroupsOfColumns;
  total: QTablePropTotal;
  rows: QTablePropRows;
  checkedRows: QTablePropCheckedRows;
  sortBy: QTablePropSortBy;
  customRowClass: QTablePropCustomRowClass;
  customRowStyle: QTablePropCustomRowStyle;
  emptyText: QTablePropEmptyText;
}

export interface QTableProvider {
  grided: Ref<Nullable<boolean>>;
  fixedLayout: Ref<Nullable<boolean>>;
  isLoading: Ref<Nullable<boolean>>;
  loadingRowCount: Ref<Nullable<number>>;
  defaultColWidth: Ref<Nullable<string>>;
  selectionColumn: Ref<QTablePropSelectionColumn>;
  groupsOfColumns: Ref<QTablePropGroupsOfColumns>;
  total: Ref<QTablePropTotal>;
  rows: Ref<QTablePropRows>;
  checkedRows: Ref<number[]>;
  sortBy: Ref<QTablePropSortBy>;
  customRowClass: Ref<QTablePropCustomRowClass>;
  customRowStyle: Ref<QTablePropCustomRowStyle>;
  slots: Readonly<Slots>;
  isRowClickable: ComputedRef<boolean>;
  updateCheckedRows: (value: number[]) => void;
  updateSortBy: (value: QTablePropSortBy) => void;
  updateGroupsOfColumns: (value: QTablePropGroupsOfColumns) => void;
  emitRowClick: (row: Row, rowIndex: number) => void;
}

export interface QTableInstance {
  isTableEmpty: ComputedRef<boolean>;
  rootClasses: ComputedRef<ClassValue>;
}

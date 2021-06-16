import type { Ref, ComputedRef, Slots } from 'vue';

interface SelectionColumn {
  enabled?: Nullable<boolean>;
  selectAllShown?: Nullable<boolean>;
  selectTotalShown?: Nullable<boolean>;
  sticky?: Nullable<boolean>;
}

interface Column {
  key: string;
  value: Nullable<string | number>;
  isHidden?: boolean;
  sortable?: boolean;
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
type Classes = Record<string, boolean>;
type Styles = Record<string, string | number>;

export type QTablePropSelectionColumn = Nullable<SelectionColumn>;
export type QTablePropGroupsOfColumns = GroupOfColumns[];
export type QTablePropTotal = Nullable<Record<string, unknown>>;
export type QTablePropRows = Row[];
export type QTablePropCheckedRows = Nullable<number[]>;
export type QTablePropSortBy = Nullable<SortBy>;
export type QTablePropCustomRowClass = Nullable<
  (arg0: {
    row: Row;
    rowIndex: number;
  }) => Nullable<string | string[] | Classes | Classes[]>
>;
export type QTablePropCustomRowStyle = Nullable<
  (arg0: {
    row: Row;
    rowIndex: number;
  }) => Nullable<string | string[] | Styles | Styles[]>
>;

export interface QTableProps {
  grid: Nullable<boolean>;
  fixedLayout: Nullable<boolean>;
  isLoading: Nullable<boolean>;
  loadingRowCount: Nullable<number>;
  defaultColWidth: Nullable<string>;
  selectionColumn: QTablePropSelectionColumn;
  groupsOfColumns: QTablePropGroupsOfColumns;
  total: QTablePropTotal;
  rows: QTablePropRows;
  checkedRows: QTablePropCheckedRows;
  sortBy: QTablePropSortBy;
  customRowClass: QTablePropCustomRowClass;
  customRowStyle: QTablePropCustomRowStyle;
  emptyText: Nullable<string>;
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
  emitRowClick: (row: Record<string, unknown>, rowIndex: number) => void;
}

export interface QTableInstance {
  isTableEmpty: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
}

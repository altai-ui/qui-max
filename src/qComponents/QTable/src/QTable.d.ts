import { Ref, ComputedRef, Slots } from 'vue';

interface Column {
  key: string;
  value: Nullable<string | number>;
  sortable?: boolean;
  slots?: Record<string, string>;
  width?: string;
  minWidth?: string;
  customCellClass?: string;
  formatter?: (
    value: unknown,
    row: Record<string, unknown>,
    column: Column
  ) => string;
}
export interface GroupOfColumns {
  key: string;
  columns: Column[];
  color?: string;
  draggabble?: boolean;
  align?: 'left' | 'right';
}

type Row = Record<string, unknown>;
export interface SortBy {
  key: Nullable<string>;
  direction: Nullable<'ascending' | 'descending'>;
}
type Classes = Record<string, boolean>;
type Styles = Record<string, string | number>;
export type QTablePropGroupsOfColumns = GroupOfColumns[];
export type QTablePropTotal = Nullable<Record<string, unknown>>;
export type QTablePropRows = Row[];
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
  groupsOfColumns: QTablePropGroupsOfColumns;
  total: QTablePropTotal;
  rows: QTablePropRows;
  sortBy: QTablePropSortBy;
  customRowClass: QTablePropCustomRowClass;
  customRowStyle: QTablePropCustomRowStyle;
  emptyText: Nullable<string>;
}

export interface QTableProvider {
  groupsOfColumns: Ref<QTablePropGroupsOfColumns>;
  total: Ref<QTablePropTotal>;
  rows: Ref<QTablePropRows>;
  sortBy: Ref<QTablePropSortBy>;
  customRowClass: Ref<QTablePropCustomRowClass>;
  customRowStyle: Ref<QTablePropCustomRowStyle>;
  slots: Readonly<Slots>;
}

export interface QTableInstance {
  isTableEmpty: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
}

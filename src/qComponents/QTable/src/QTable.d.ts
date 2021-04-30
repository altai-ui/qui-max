import { Ref, ComputedRef, Slots } from 'vue';

interface Column {
  key: string;
  value: Nullable<string | number>;
  sortable?: boolean;
  slots?: Record<string, string>;
  width?: string;
  minWidth?: string;
  customCellClass?: string;
  formatter?: () => string;
}
export interface GroupOfColumns {
  key: string;
  columns: Column[];
  color?: string;
  draggabble?: boolean;
  align?: 'left' | 'right';
}

export interface SortBy {
  key: Nullable<string>;
  direction: Nullable<'ascending' | 'descending'>;
}
export type QTablePropGroupsOfColumns = GroupOfColumns[];
export type QTablePropTotal = Nullable<Record<string, unknown>>;
export type QTablePropRows = Record<string, unknown>[];
export type QTablePropSortBy = Nullable<SortBy>;

export interface QTableProps {
  groupsOfColumns: QTablePropGroupsOfColumns;
  total: QTablePropTotal;
  rows: QTablePropRows;
  sortBy: QTablePropSortBy;
  emptyText: Nullable<string>;
}

export interface QTableProvider {
  groupsOfColumns: Ref<QTablePropGroupsOfColumns>;
  total: Ref<QTablePropTotal>;
  sortBy: Ref<QTablePropSortBy>;
  slots: Readonly<Slots>;
}

export interface QTableInstance {
  isTableEmpty: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
}

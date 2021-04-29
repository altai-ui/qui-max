import { ComputedRef } from 'vue';
import { Composer } from 'vue-i18n';

export interface QTableProps {
  emptyText: Nullable<string>;
}

export interface QTableInstance {}

export interface QTableEmptyProps {
  emptyText: Nullable<string>;
}

export interface QTableEmptyInstance {
  t: Composer['t'];
  image: string;
  noDataText: ComputedRef<string>;
}

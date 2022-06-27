import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export type QTableEmptyPropEmptyText = Nullable<string>;

export interface QTableEmptyProps {
  emptyText: QTableEmptyPropEmptyText;
}

export interface QTableEmptyInstance {
  t: (key: string) => string;
  image: string;
  noDataText: ComputedRef<string>;
}

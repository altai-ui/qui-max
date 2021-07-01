import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QTableEmptyProps {
  emptyText: Nullable<string>;
}

export interface QTableEmptyInstance {
  t: (key: string) => string;
  image: string;
  noDataText: ComputedRef<string>;
}

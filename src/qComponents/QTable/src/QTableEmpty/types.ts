import type { ComputedRef } from 'vue';
import type { Composer } from 'vue-i18n';

import type { Nullable } from '#/helpers';

export interface QTableEmptyProps {
  emptyText: Nullable<string>;
}

export interface QTableEmptyInstance {
  t: Composer['t'];
  image: string;
  noDataText: ComputedRef<string>;
}

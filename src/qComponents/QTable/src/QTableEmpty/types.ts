import type { ComputedRef } from 'vue';
import type { IVueI18n } from 'vue-i18n';

import type { Nullable } from '#/helpers';

export interface QTableEmptyProps {
  emptyText: Nullable<string>;
}

export interface QTableEmptyInstance {
  t: IVueI18n['t'];
  image: string;
  noDataText: ComputedRef<string>;
}

import { ComputedRef } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

export interface QTableTTotalInstance {
  columnList: ComputedRef<ExtendedColumn[]>;
}

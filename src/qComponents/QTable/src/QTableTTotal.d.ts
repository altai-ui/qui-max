import { ComputedRef } from 'vue';

import type { ExtendedColumn } from './QTableContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QTableTTotalProps {}

export interface QTableTTotalInstance {
  columnList: ComputedRef<ExtendedColumn[]>;
}

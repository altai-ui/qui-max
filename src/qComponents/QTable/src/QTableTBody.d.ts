import { ComputedRef } from 'vue';

export interface QTableTBodyInstance {
  randId: (prefix: string) => string;
  rowsList: ComputedRef<Record<string, unknown>[]>;
}

import { ComputedRef } from 'vue';

export interface QTableTInstance {
  isColgroupShown: ComputedRef<boolean>;
  isTotalShown: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
}

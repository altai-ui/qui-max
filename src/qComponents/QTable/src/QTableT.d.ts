import { Ref, ComputedRef } from 'vue';

export interface QTableTProvider {
  moveXInPx: Nullable<Ref<number>>;
}

export interface QTableTInstance {
  isColgroupShown: ComputedRef<boolean>;
  isTotalShown: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
}

import { Ref, ComputedRef, UnwrapRef } from 'vue';

import type { StickyConfig } from './types';

export interface QTableTProvider {
  moveXInPx: Nullable<Ref<number>>;
  stickyConfig: Ref<UnwrapRef<StickyConfig>[]>;
  stickyOffsetLeftArr: Ref<number[]>;
  stickyOffsetRightArr: Ref<number[]>;
}

export interface QTableTInstance {
  isColgroupShown: ComputedRef<boolean>;
  isTotalShown: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
}

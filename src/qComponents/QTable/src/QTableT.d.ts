import { Ref, ComputedRef, UnwrapRef } from 'vue';

import type { StickyConfig } from './types';

export interface QTableTProvider {
  stickyConfig: Ref<UnwrapRef<StickyConfig>[]>;
  stickedLeftColumnList: Ref<number[]>;
  stickedRightColumnList: Ref<number[]>;
  stickyOffsetLeftArr: Ref<number[]>;
  stickyOffsetRightArr: Ref<number[]>;
}

export interface QTableTInstance {
  isColgroupShown: ComputedRef<boolean>;
  isTotalShown: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
}

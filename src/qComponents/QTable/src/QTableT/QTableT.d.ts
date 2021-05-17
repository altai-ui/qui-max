import type { Ref, ComputedRef, UnwrapRef } from 'vue';

import type { StickyConfig } from '../helpers/sticky.d';

export interface QTableTProvider {
  selectionColumn: {
    isSticked: boolean;
    isLastSticked: boolean;
  };
  isSelectionColumnStickable: ComputedRef<boolean>;
  stickyConfig: Ref<UnwrapRef<StickyConfig>[]>;
  stickedLeftColumnList: Ref<number[]>;
  stickedRightColumnList: Ref<number[]>;
  stickyOffsetLeftArr: Ref<number[]>;
  stickyOffsetRightArr: Ref<number[]>;
}

export interface QTableTInstance {
  thead: Ref<Nullable<HTMLElement>>;
  isColgroupShown: ComputedRef<boolean>;
  isTotalShown: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
}

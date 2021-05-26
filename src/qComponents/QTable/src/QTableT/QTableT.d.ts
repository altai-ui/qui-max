import type { Ref, ComputedRef, ComponentPublicInstance, UnwrapRef } from 'vue';

import type {
  StickyGlobalConfig,
  QTableTStickyInstance
} from '../QTableTSticky/QTableTSticky';

export interface QTableTProvider {
  stickyGlobalConfig: ComputedRef<StickyGlobalConfig>;
}

export interface QTableTInstance {
  thead: Ref<Nullable<HTMLElement>>;
  sticky: Ref<
    Nullable<ComponentPublicInstance<UnwrapRef<QTableTStickyInstance>>>
  >;
  isColgroupShown: ComputedRef<boolean>;
  isTotalShown: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
}

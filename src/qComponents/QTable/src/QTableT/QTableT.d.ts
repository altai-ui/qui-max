import type { Ref, ComputedRef, ComponentPublicInstance, UnwrapRef } from 'vue';

import type { Nullable } from '#/helpers';

import type {
  StickyGlobalConfig,
  QTableTStickyInstance
} from '../QTableTSticky/QTableTSticky';

export interface QTableTProvider {
  tableHeight: Ref<Nullable<number>>;
  stickyGlobalConfig: ComputedRef<StickyGlobalConfig>;
}

export interface QTableTInstance {
  root: Ref<Nullable<HTMLElement>>;
  thead: Ref<Nullable<HTMLElement>>;
  sticky: Ref<
    Nullable<ComponentPublicInstance<UnwrapRef<QTableTStickyInstance>>>
  >;
  isColgroupShown: ComputedRef<boolean>;
  isTotalShown: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
}

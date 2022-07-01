import type { Ref, ComputedRef } from 'vue';

import type { Nullable, ClassValue, UnwrappedInstance } from '#/helpers';

import type {
  StickyGlobalConfig,
  QTableTStickyInstance
} from '../QTableTSticky/types';

export interface QTableTProvider {
  tableHeight: Ref<Nullable<number>>;
  stickyGlobalConfig: ComputedRef<StickyGlobalConfig>;
}

export interface QTableTInstance {
  root: Ref<Nullable<HTMLElement>>;
  thead: Ref<Nullable<HTMLElement>>;
  sticky: Ref<UnwrappedInstance<QTableTStickyInstance>>;
  isColgroupShown: ComputedRef<boolean>;
  isTotalShown: ComputedRef<boolean>;
  rootClasses: ComputedRef<ClassValue>;
}

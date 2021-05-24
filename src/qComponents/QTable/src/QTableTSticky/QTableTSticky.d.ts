import type { Ref, ComputedRef } from 'vue';

import type { ExtendedColumn } from '../QTableContainer/QTableContainer';

export interface StickyGlobalConfig {
  columnsLeftNew: Record<string, Nullable<number>>;
  columnsRightNew: Record<string, Nullable<number>>;
}

export interface QTableTStickyInstance {
  root: Ref<HTMLElement | null>;
  isSelectable: Nullable<ComputedRef<boolean>>;
  stickyConfig: {
    columnsLeftNew: Record<string, number | null>;
    columnsRightNew: Record<string, number | null>;
  };
  columnList: ComputedRef<ExtendedColumn[]>;
  setColRef: (el: HTMLElement, key: number | string) => void;
}

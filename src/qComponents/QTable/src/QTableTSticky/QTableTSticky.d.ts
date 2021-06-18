import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { ExtendedColumn } from '../QTableContainer/QTableContainer';

export interface StickyGlobalConfig {
  columnsLeftNew: Record<string, Nullable<number>>;
  columnsRightNew: Record<string, Nullable<number>>;
}

export interface QTableTStickyInstance {
  root: Ref<Nullable<HTMLElement>>;
  isSelectable: Nullable<ComputedRef<boolean>>;
  stickyConfig: {
    columnsLeftNew: Record<string, Nullable<number>>;
    columnsRightNew: Record<string, Nullable<number>>;
  };
  columnList: ComputedRef<ExtendedColumn[]>;
  setColRef: (el: HTMLElement, key: number | string) => void;
}

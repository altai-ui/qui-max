import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QPaginationProps {
  pageCount: Nullable<number>;
  total: Nullable<number>;
  pageSize: Nullable<number>;
  currentPage: number;
  disabled: Nullable<boolean>;
  pagerCount: number;
}

export interface QPaginationInstance {
  preparedPageCount: ComputedRef<number>;
  isPrevBtnDisabled: ComputedRef<boolean>;
  isNextBtnDisabled: ComputedRef<boolean>;
  isPrevQuickBtnShown: ComputedRef<boolean>;
  isNextQuickBtnShown: ComputedRef<boolean>;
  pagers: ComputedRef<number[]>;
  handlePrevBtnClick: () => void;
  handlePageBtnClick: (newPage: number) => void;
  handleNextBtnClick: () => void;
  handlePrevQuickBtnClick: () => void;
  handleNextQuickBtnClick: () => void;
}

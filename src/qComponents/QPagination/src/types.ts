export interface QPaginationProps {
  pageCount: Nullable<number>;
  total: Nullable<number>;
  pageSize: Nullable<number>;
  currentPage: number;
  disabled: Nullable<boolean>;
  pagerCount: number;
}

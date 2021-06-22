import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QUploadFileSinglePropValue {
  name?: string;
  loading?: number;
}

export interface QUploadFileSingleProps {
  value: QUploadFileSinglePropValue;
  isLoading: Nullable<boolean>;
  isDisabled: Nullable<boolean>;
  isClearable: Nullable<boolean>;
}

export interface QUploadFileSingleInstance {
  barStyle: ComputedRef<{ width?: string }>;
  fileName: ComputedRef<string>;
  handleRemoveFileBtnClick: () => void;
  handleAbortUploadingBtnClick: () => void;
}

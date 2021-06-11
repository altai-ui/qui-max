import type { Ref, ComputedRef } from 'vue';

export interface QMessageBoxContentProps {
  title: Nullable<string>;
  message: Nullable<string>;
  submessage: Nullable<string>;
  confirmButtonText: Nullable<string>;
  cancelButtonText: Nullable<string>;
}

export interface QMessageBoxContentInstance {
  isConfirmBtnLoading: Ref<boolean>;
  isCancelBtnLoading: Ref<boolean>;
  isActionsSectionShown: ComputedRef<boolean>;
  handleConfirmBtnClick: () => void;
  handleCancelBtnClick: () => void;
}

import { Ref } from 'vue';

export type QMessageBoxAction = 'confirm' | 'cancel' | 'close';

export interface QMessageBoxEvent {
  action: QMessageBoxAction;
  payload?: unknown;
}

export interface QMessageBoxBeforeClose extends QMessageBoxEvent {
  ctx: {
    isConfirmBtnLoading: Ref<boolean>;
    isCancelBtnLoading: Ref<boolean>;
  };
}

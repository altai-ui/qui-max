import type { Ref } from 'vue';

type QMessageBoxAction = 'confirm' | 'cancel' | 'close';

export interface QMessageBoxEvent {
  action: QMessageBoxAction;
  payload?: unknown;
}

export interface QMessageBoxFnBeforeCloseArg extends QMessageBoxEvent {
  ctx: {
    isConfirmBtnLoading: Ref<boolean>;
    isCancelBtnLoading: Ref<boolean>;
  };
}

export type QMessageBoxPropTeleportTo = Nullable<string | HTMLElement>;
export type QMessageBoxPropBeforeClose = Nullable<
  (arg0: QMessageBoxFnBeforeCloseArg) => Promise<boolean>
>;
type Classes = Record<string, boolean>;
type Styles = Record<string, string | number>;

export interface QMessageBoxProps {
  isVisible: Nullable<boolean>;
  zIndex: Nullable<number>;
  teleportTo: QMessageBoxPropTeleportTo;
  title: Nullable<string>;
  message: Nullable<string>;
  submessage: Nullable<string>;
  confirmButtonText: Nullable<string>;
  cancelButtonText: Nullable<string>;
  closeOnClickShadow: Nullable<boolean>;
  distinguishCancelAndClose: Nullable<boolean>;
  beforeClose: QMessageBoxPropBeforeClose;
  wrapClass: Nullable<string | Classes | Classes[]>;
  wrapStyle: Nullable<string | Styles | Styles[]>;
}

export interface QMessageBoxInstance {
  wrapZIndex: Ref<number>;
  isRendered: Ref<boolean>;
  messageBox: Ref<Nullable<HTMLElement>>;
  isConfirmBtnLoading: Ref<boolean>;
  isCancelBtnLoading: Ref<boolean>;
  isActionsSectionShown: Ref<boolean>;
  closeBox: ({ action, payload }: QMessageBoxEvent) => Promise<void>;
  handleAfterLeave: () => void;
  handleConfirmBtnClick: () => void;
  handleCancelBtnClick: () => void;
  emitCloseEvent: () => void;
}

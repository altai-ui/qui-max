import type { App, ComponentPublicInstance, UnwrapRef, Ref } from 'vue';
import type { QMessageBoxContainerInstance } from './QMessageBoxContainer';

import type { QMessageBoxAction } from './constants';

export interface QMessageBoxContent {
  title: string;
}

type Classes = Record<string, boolean>;
type Styles = Record<string, string | number>;

export type QMessageBoxOptionWrapClass = Nullable<string | Classes | Classes[]>;
export type QMessageBoxOptionWrapStyle = Nullable<string | Styles | Styles[]>;

export interface QMessageBoxOptions {
  closeOnClickShadow?: Nullable<boolean>;
  distinguishCancelAndClose?: Nullable<boolean>;
  wrapClass?: QMessageBoxOptionWrapClass;
  wrapStyle?: QMessageBoxOptionWrapStyle;
  onMounted?: (
    app: App<Element>,
    container: ComponentPublicInstance<UnwrapRef<QMessageBoxContainerInstance>>
  ) => void;
  onUnmounted?: (app: App<Element>) => void;
}

export interface QMessageBoxEvent {
  action: QMessageBoxAction;
  payload?: unknown;
}

export interface MessageBoxPromise {
  resolve: (event: QMessageBoxEvent) => void;
  reject: (event: QMessageBoxEvent) => void;
}

//
//
//

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

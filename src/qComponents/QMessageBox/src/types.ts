import type { App, ComponentInternalInstance } from 'vue';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import type { QMessageBoxAction } from './constants';
import type {
  QMessageBoxContainerPropContent,
  QMessageBoxContainerInstance
} from './QMessageBoxContainer';

export interface ComponentInternalInstanceWithProvides
  extends ComponentInternalInstance {
  provides: Record<symbol | string, unknown>;
}

export type QMessageBoxContent = QMessageBoxContainerPropContent;

export interface QMessageBoxHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

type Classes = Record<string, boolean>;
type Styles = Record<string, string | number>;

export type QMessageBoxOptionWrapClass = Nullable<string | Classes | Classes[]>;
export type QMessageBoxOptionWrapStyle = Nullable<string | Styles | Styles[]>;

export interface QMessageBoxOptions {
  closeOnClickShadow?: Nullable<boolean>;
  distinguishCancelAndClose?: Nullable<boolean>;
  preventFocusAfterClosing?: Nullable<boolean>;
  wrapClass?: QMessageBoxOptionWrapClass;
  wrapStyle?: QMessageBoxOptionWrapStyle;
  parentInstance?: Nullable<ComponentInternalInstance>;
  onBeforeMount?: (app: App<Element>) => Promise<void> | void;
  onMounted?: (
    app: App<Element>,
    container: NonNullable<UnwrappedInstance<QMessageBoxContainerInstance>>
  ) => Promise<void> | void;
  onUnmounted?: (app: App<Element>) => Promise<void> | void;
}

export interface QMessageBoxEvent {
  action: QMessageBoxAction;
  payload?: unknown;
}

export interface MessageBoxPromise {
  resolve: (event: QMessageBoxEvent) => void;
  reject: (event: QMessageBoxEvent) => void;
}

export interface QMessageBox {
  (
    content: QMessageBoxContent,
    options?: QMessageBoxOptions
  ): Promise<QMessageBoxEvent>;
}

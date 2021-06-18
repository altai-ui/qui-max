import type { App, ComponentPublicInstance, UnwrapRef } from 'vue';

import type { Nullable } from '#/helpers';

import type {
  QMessageBoxContainerPropContent,
  QMessageBoxContainerInstance
} from './QMessageBoxContainer';
import type { QMessageBoxAction } from './constants';

export type QMessageBoxContent = QMessageBoxContainerPropContent;

type Classes = Record<string, boolean>;
type Styles = Record<string, string | number>;

export type QMessageBoxOptionWrapClass = Nullable<string | Classes | Classes[]>;
export type QMessageBoxOptionWrapStyle = Nullable<string | Styles | Styles[]>;

export interface QMessageBoxOptions {
  closeOnClickShadow?: Nullable<boolean>;
  distinguishCancelAndClose?: Nullable<boolean>;
  wrapClass?: QMessageBoxOptionWrapClass;
  wrapStyle?: QMessageBoxOptionWrapStyle;
  onBeforeMount?: (app: App<Element>) => void;
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

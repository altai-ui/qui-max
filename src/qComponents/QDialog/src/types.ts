import { App, Component, ComponentInternalInstance } from 'vue';
import type { Nullable } from '#/helpers';
import { UnwrappedInstance } from '#/helpers';
import {
  QDialogContainerInstance,
  QDialogContainerPropContent
} from './QDialogContainer/types';
import { QDialogAction } from './constants';

export type QDialogContent = QDialogContainerPropContent;

export type QDialogContainerPropBeforeClose = Nullable<
  (hide: () => void) => void
>;
export type QDialogContainerPropTeleportTo = Nullable<string | HTMLElement>;

export interface QDialogHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface QDialogOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
  closeOnClickShadow?: Nullable<boolean>;
  onBeforeMount?: (app: App<Element>) => void;
  onMounted?: (
    app: App<Element>,
    container: NonNullable<UnwrappedInstance<QDialogContainerInstance>>
  ) => void;
  onUnmounted?: (app: App<Element>) => void;
}

export interface QDialogEvent {
  action: QDialogAction;
  payload?: unknown;
}

export interface QDialogPromise {
  resolve: (evt: QDialogEvent) => void;
  reject: (evt: QDialogEvent) => void;
}

// for hook

export interface QDialog {
  (content: Component, options?: QDialogOptions): Promise<QDialogEvent>;
}

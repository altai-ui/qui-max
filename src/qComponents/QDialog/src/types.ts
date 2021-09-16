import { App, Component, ComponentInternalInstance } from 'vue';
import type { Nullable } from '#/helpers';
import { UnwrappedInstance } from '#/helpers';
import {
  QDialogContainerInstance,
  QDialogContainerPropContent
} from './QDialogContainer/types';
import { QDialogContainerAction } from './constants';

export type QDialogPropBeforeClose = Nullable<(hide: () => void) => void>;
export type QDialogPropTeleportTo = Nullable<string | HTMLElement>;

export type QDialogContent = QDialogContainerPropContent;

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

// for hook
export interface QDialogPromise {
  resolve: (evt: QDialogEvent) => void;
  reject: (evt: QDialogEvent) => void;
}

export interface QDialogEvent {
  action: QDialogContainerAction;
  payload?: unknown;
}

export interface QDialogHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface Dialog {
  (content: Component, options?: QDialogOptions): Promise<QDialogEvent>;
}

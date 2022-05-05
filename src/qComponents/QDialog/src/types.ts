import type { App, Component, ComponentInternalInstance } from 'vue';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import type { QDialogAction } from './constants';
import type { QDialogContainerInstance } from './QDialogContainer';

export interface ComponentInternalInstanceWithProvides
  extends ComponentInternalInstance {
  provides: Record<symbol | string, unknown>;
}

export interface QDialogComponent {
  component: Component;
  props?: { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDialogContent = Component | QDialogComponent;

export interface QDialogHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export type QDialogOptionsBeforeClose = Nullable<
  (action: QDialogAction) => Promise<boolean>
>;
export type QDialogOptionsTeleportTo = Nullable<string | HTMLElement>;

export interface QDialogOptions {
  offsetTop?: Nullable<string | number>;
  distinguishCancelAndClose?: Nullable<boolean>;
  preventFocusAfterClosing?: Nullable<boolean>;
  customClass?: Nullable<string>;
  beforeClose?: Nullable<QDialogOptionsBeforeClose>;
  teleportTo?: QDialogOptionsTeleportTo;
  parentInstance?: Nullable<ComponentInternalInstance>;
  onBeforeMount?: (app: App<Element>) => Promise<void> | void;
  onMounted?: (
    app: App<Element>,
    container: NonNullable<UnwrappedInstance<QDialogContainerInstance>>
  ) => Promise<void> | void;
  onUnmounted?: (app: App<Element>) => Promise<void> | void;
}

export interface QDialogEvent {
  action: QDialogAction;
  payload?: unknown;
}

export interface DialogPromise {
  resolve: (event: QDialogEvent) => void;
  reject: (event: QDialogEvent) => void;
}

export interface QDialog {
  (content: QDialogContent, options?: QDialogOptions): Promise<QDialogEvent>;
}

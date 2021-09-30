import type { App, Component, ComponentInternalInstance } from 'vue';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import type { QDrawerContainerInstance } from './QDrawerContainer';
import type { QDrawerAction } from './constants';

export interface ComponentInternalInstanceWithProvides
  extends ComponentInternalInstance {
  provides: Record<symbol | string, unknown>;
}

export interface QDrawerComponent {
  component: Component;
  props?: { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDrawerContent = Component | QDrawerComponent;

export interface QDrawerHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export type QDrawerOptionsPosition = 'left' | 'right';
export type QDrawerOptionsBeforeClose = Nullable<
  (action: QDrawerAction) => Promise<boolean>
>;
export type QDrawerOptionsTeleportTo = Nullable<string | HTMLElement>;

export interface QDrawerOptions {
  width?: Nullable<string | number>;
  closeOnClickShadow?: Nullable<boolean>;
  distinguishCancelAndClose?: Nullable<boolean>;
  preventFocusAfterClosing?: Nullable<boolean>;
  position?: QDrawerOptionsPosition;
  customClass?: Nullable<string>;
  beforeClose?: Nullable<QDrawerOptionsBeforeClose>;
  teleportTo?: QDrawerOptionsTeleportTo;
  parentInstance?: Nullable<ComponentInternalInstance>;
  onBeforeMount?: (app: App<Element>) => Promise<void> | void;
  onMounted?: (
    app: App<Element>,
    container: NonNullable<UnwrappedInstance<QDrawerContainerInstance>>
  ) => Promise<void> | void;
  onUnmounted?: (app: App<Element>) => Promise<void> | void;
}

export interface QDrawerEvent {
  action: QDrawerAction;
  payload?: unknown;
}

export interface DrawerPromise {
  resolve: (event: QDrawerEvent) => void;
  reject: (event: QDrawerEvent) => void;
}

export interface QDrawer {
  (content: QDrawerContent, options?: QDrawerOptions): Promise<QDrawerEvent>;
}

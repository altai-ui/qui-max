import type {
  Ref,
  ComputedRef,
  ComponentInternalInstance,
  Component,
  App
} from 'vue';

import type { Nullable, UnwrappedInstance } from '#/helpers';

export type QDrawerPropBeforeClose = Nullable<(hide: () => void) => void>;
export type QDrawerPropPosition = 'left' | 'right';
export type QDrawerPropTeleportTo = Nullable<string | HTMLElement>;

export interface QDrawerProps {
  width: Nullable<string | number>;
  title: Nullable<string>;
  // visible: Nullable<boolean>;
  destroyOnClose: Nullable<boolean>;
  wrapperClosable: Nullable<boolean>;
  beforeClose: QDrawerPropBeforeClose;
  position: QDrawerPropPosition;
  customClass: Nullable<string>;
  // teleportTo: QDrawerPropTeleportTo;
  // renderOnMount: Nullable<boolean>;
}

export interface QDrawerInstance {
  drawer: Ref<Nullable<HTMLElement>>;
  zIndex: Ref<number>;
  isRendered: Ref<boolean>;
  isVisible: Ref<boolean>;
  drawerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  drawerClass: ComputedRef<string>;
  afterEnter: () => void;
  afterLeave: () => void;
  closeDrawer: () => void;
  handleWrapperClick: () => void;
  doneConfirm: (event: QDrawerEvent) => Promise<void>;
}

export interface QDrawerContainerProps extends QDrawerProps {
  content: Component;
}

// for the content component
export interface QDrawerParams {
  title?: string;
}

// for the content component
export interface QDrawerContentInstance {
  handleDone: () => void;
}

export interface QDrawerComponent {
  component: Component;
  props?: QDrawerProps | { [propName: string]: unknown } | string;
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export interface QDrawerHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface QDrawerOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
  onBeforeMount?: (app: App<Element>) => void;
  onMounted?: (
    app: App<Element>,
    container: NonNullable<UnwrappedInstance<QDrawerInstance>>
  ) => void;
  onUnmounted?: (app: App<Element>) => void;
}

export enum QDrawerAction {
  open = 'open',
  close = 'close',
  done = 'done'
}

export interface QDrawerEvent {
  action: QDrawerAction;
  payload?: unknown;
}

export interface QDrawerPromise {
  resolve: (event: QDrawerEvent) => void;
  reject: (event: QDrawerEvent) => void;
}

export type QDrawerContainerPropContent = Component | QDrawerComponent;

export interface DrawerPlugin {
  (content: Component, options?: QDrawerOptions): Promise<QDrawerEvent>;
}

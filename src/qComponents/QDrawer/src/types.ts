import type {
  App,
  ComponentInternalInstance,
  Ref,
  ComputedRef,
  Component
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
  teleportTo: QDrawerPropTeleportTo;
  // renderOnMount: Nullable<boolean>;
}

export interface QDrawerInstance {
  drawer: Ref<Nullable<HTMLElement>>;
  zIndex: Ref<number>;
  isRendered: Ref<boolean>;
  isVisible: Ref<boolean>;
  drawerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  drawerClass: ComputedRef<string>;
  preparedContent: ComputedRef<QDrawerComponent>;
  afterEnter: () => void;
  afterLeave: () => void;
  closeDrawer: () => void;
  handleWrapperClick: () => void;
}

export interface QDrawerHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface QDrawerOptions extends QDrawerProps {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export enum QDrawerAction {
  open = 'open',
  close = 'close'
}

export interface QDrawerEvent {
  action: QDrawerAction;
  payload?: unknown;
}

export interface QDrawerPromise {
  resolve: (event: QDrawerEvent) => void;
  reject: (event: QDrawerEvent) => void;
}

export interface QDrawerParams {
  testProp: string;
}

export interface QDrawerComponent {
  component: Component;
  props?: QDrawerParams | { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDrawerContent = QDrawerProps | QDrawerComponent | Component;

export interface QDrawerContainerProps extends QDrawerProps {
  content: Component;
}

export interface QDrawerPlugin {
  (content: Component, options?: QDrawerOptions): Promise<QDrawerEvent>;
}

import type { Ref, ComputedRef, Component } from 'vue';

import type { Nullable } from '#/helpers';
import type { QDrawerParams } from '../QDrawerContent/types';
import type { QDrawerEvent } from '@/qComponents/QDrawer/types';

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
  doneEmit: (event: QDrawerEvent) => Promise<void>;
}

export interface QDrawerComponent {
  component: Component;
  props?: QDrawerProps | { [propName: string]: unknown } | string;
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDrawerContainerPropContent =
  | QDrawerParams
  | Component
  | QDrawerComponent;

export interface QDrawerContainerProps extends QDrawerProps {
  content: QDrawerContainerPropContent;
}

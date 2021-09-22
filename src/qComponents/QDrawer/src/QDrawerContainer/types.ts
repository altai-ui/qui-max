import type { Component, Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QDrawerEvent } from '../types';

export interface QDrawerComponent {
  component: Component;
  props?: { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDrawerContainerPropContent = Component | QDrawerComponent;
export type QDrawerContainerPropTeleportTo = Nullable<string | HTMLElement>;
export type QDrawerContainerPropPosition = 'left' | 'right';

export interface QDrawerContainerProps {
  content: QDrawerContainerPropContent;
  width: Nullable<string | number>;
  position: QDrawerContainerPropPosition;
  teleportTo: QDrawerContainerPropTeleportTo;
  customClass: Nullable<string>;
  closeOnClickShadow?: Nullable<boolean>;
  distinguishCancelAndClose?: Nullable<boolean>;
}

export interface QDrawerContainerInstance {
  drawer: Ref<Nullable<HTMLElement>>;
  zIndex: number;
  isShown: Ref<boolean>;
  drawerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  drawerClass: ComputedRef<string>;
  preparedContent: ComputedRef<QDrawerComponent>;
  handleAfterLeave: () => void;
  closeBox: (event: QDrawerEvent) => Promise<void>;
  emitCloseEvent: () => void;
}

import type { Component, Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QDrawerBoxEvent, QDrawerBoxOptions } from '../types';
import { QDrawerBoxAction } from '../constants';

export type QDrawerBoxPropBeforeClose = Nullable<(hide: () => void) => void>;
export type QDrawerBoxPropTeleportTo = Nullable<string | HTMLElement>;
export type QDrawerBoxPropPosition = 'left' | 'right';
export type QDrawerBoxContentPropBeforeClose = Nullable<
  (action: QDrawerBoxAction) => Promise<boolean>
>;

export interface QDrawerBoxParams {
  title: Nullable<string>;
  width: Nullable<string | number>;
  wrapperClosable: Nullable<boolean>;
  position: QDrawerBoxPropPosition;
  customClass: Nullable<string>;
  teleportTo: QDrawerBoxPropTeleportTo;
  beforeClose?: Nullable<QDrawerBoxContentPropBeforeClose>;
}

export interface QDrawerBoxComponent {
  component: Component;
  props?: QDrawerBoxParams | { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDrawerBoxContainerPropContent =
  | QDrawerBoxParams
  | Component
  | QDrawerBoxComponent;

export interface QDrawerBoxContainerProps extends QDrawerBoxOptions {
  content: QDrawerBoxContainerPropContent;
}

export interface QDrawerBoxContainerInstance {
  drawerBox: Ref<Nullable<HTMLElement>>;
  zIndex: number;
  isShown: Ref<boolean>;
  drawerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  drawerClass: ComputedRef<string>;
  preparedContent: ComputedRef<QDrawerBoxComponent>;
  handleAfterLeave: () => void;
  handleWrapperClick: () => void;
  closeBox: (event: QDrawerBoxEvent) => Promise<void>;
}

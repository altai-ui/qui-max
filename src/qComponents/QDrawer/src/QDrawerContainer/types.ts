import type { Component, Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QDrawerEvent, QDrawerOptions } from '../types';
import { QDrawerAction } from '../constants';

export type QDrawerPropBeforeClose = Nullable<(hide: () => void) => void>;
export type QDrawerPropTeleportTo = Nullable<string | HTMLElement>;
export type QDrawerPropPosition = 'left' | 'right';
export type QDrawerContentPropBeforeClose = Nullable<
  (action: QDrawerAction) => Promise<boolean>
>;

export interface QDrawerComponent {
  component: Component;
  props?: QDrawerOptions | { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDrawerContainerPropComponent =
  | QDrawerOptions
  | Component
  | QDrawerComponent;

export interface QDrawerContainerProps extends QDrawerOptions {
  content: QDrawerContainerPropComponent;
}

export interface QDrawerContainerInstance {
  drawer: Ref<Nullable<HTMLElement>>;
  zIndex: number;
  isShown: Ref<boolean>;
  drawerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  drawerClass: ComputedRef<string>;
  preparedContent: ComputedRef<QDrawerComponent>;
  handleAfterLeave: () => void;
  handleWrapperClick: () => void;
  closeBox: (event: QDrawerEvent) => Promise<void>;
}

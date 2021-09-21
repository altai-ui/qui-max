import type { Component, Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QDrawerEvent, QDrawerOptions } from '../types';

export type QDrawerPropTeleportTo = Nullable<string | HTMLElement>;
export type QDrawerPropPosition = 'left' | 'right';

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
  closeBox: (event: QDrawerEvent) => Promise<void>;
  emitCloseEvent: () => void;
}

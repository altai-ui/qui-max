import type { Component, ComputedRef, Ref } from 'vue';

import type { Nullable } from '#/helpers';
import type { QDialogEvent } from '../types';
import { QDialogAction } from '../constants';

export interface QDialogComponent {
  component: Component;
  props?: { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDialogContainerPropContent = Component | QDialogComponent;

export type QDialogContainerPropBeforeClose = Nullable<
  (action: QDialogAction) => Promise<boolean>
>;

export type QDialogContainerPropTeleportTo = Nullable<string | HTMLElement>;

export interface QDialogContainerProps {
  content: QDialogContainerPropContent;
  closeOnClickShadow?: Nullable<boolean>;
  distinguishCancelAndClose?: Nullable<boolean>;
  width: Nullable<string | number>;
  offsetTop: Nullable<string | number>;
  customClass: Nullable<string>;
  teleportTo: QDialogContainerPropTeleportTo;
  beforeClose: Nullable<QDialogContainerPropBeforeClose>;
}

export interface QDialogContainerInstance {
  dialog: Ref<Nullable<HTMLElement>>;
  zIndex: number;
  isShown: Ref<boolean>;
  dialogStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  containerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  preparedContent: ComputedRef<QDialogComponent>;
  afterLeave: () => void;
  closeDialog: (event: QDialogEvent) => Promise<void>;
  emitCloseEvent: () => void;
}

export interface QDialogContainerProvider {
  emitCloseEvent: () => void;
}

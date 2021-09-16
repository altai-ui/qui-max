import { Component, ComponentInternalInstance } from 'vue';

import type { Ref, ComputedRef } from 'vue';
import type { Nullable } from '#/helpers';
import { QDialogActions } from '@/qComponents/QDialog/src/constants';

export type QDialogPropBeforeClose = Nullable<(hide: () => void) => void>;
export type QDialogPropTeleportTo = Nullable<string | HTMLElement>;

export interface QDialogProps {
  parentInstance?: Nullable<ComponentInternalInstance>;
  width: Nullable<string | number>;
  offsetTop: Nullable<string | number>;
  title: Nullable<string>;
  wrapperClosable: Nullable<boolean>;
  beforeClose: QDialogPropBeforeClose;
  customClass: Nullable<string>;
  teleportTo: QDialogPropTeleportTo;
}

export interface QDialogContainerProps extends QDialogProps {
  content: QDialogPropContent;
}

export type QDialogPropContent = Component | QDialogComponent;

export interface QDialogInstance {
  dialog: Ref<Nullable<HTMLElement>>;
  zIndex: Ref<number>;
  isVisible: Ref<boolean>;
  dialogStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  containerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  afterEnter: () => void;
  afterLeave: () => void;
  closeBox: () => Promise<void>;
  handleWrapperClick: () => void;
  preparedDialogContent: ComputedRef<QDialogComponent>;
}

export interface QDialogComponent {
  component: Component;
  props?: QDialogProps | { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

// for hook
export interface QDialogPromise {
  resolve: (evt: QDialogEvent) => void;
  reject: (evt: QDialogEvent) => void;
}

export interface QDialogEvent {
  action: QDialogActions;
  payload?: unknown;
}

export interface QDialogHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export type Dialog = (
  content: Component,
  options?: QDialogProps
) => Promise<QDialogEvent>;

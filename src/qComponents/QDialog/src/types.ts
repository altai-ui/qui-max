import { Component, ComponentInternalInstance } from 'vue';

import type { Ref, ComputedRef } from 'vue';
import type { Nullable } from '#/helpers';
import { QDialogActions } from '@/qComponents/QDialog/src/constants';

export type QDialogPropBeforeClose = Nullable<(hide: () => void) => void>;
export type QDialogPropTeleportTo = Nullable<string | HTMLElement>;

export interface QDialogProps {
  width: Nullable<string | number>;
  offsetTop: Nullable<string | number>;
  title: Nullable<string>;
  visible: Nullable<boolean>;
  destroyOnClose: Nullable<boolean>;
  wrapperClosable: Nullable<boolean>;
  beforeClose: QDialogPropBeforeClose;
  customClass: Nullable<string>;
  teleportTo: QDialogPropTeleportTo;
  renderOnMount: Nullable<boolean>;
}

export interface QDialogContainerProps extends QDialogProps {
  content: Component;
}

export interface QDialogInstance {
  dialog: Ref<Nullable<HTMLElement>>;
  zIndex: Ref<number>;
  isRendered: Ref<boolean>;
  isVisible: Ref<boolean>;
  dialogStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  containerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  afterEnter: () => void;
  afterLeave: () => void;
  closeDialog: () => void;
  handleWrapperClick: () => void;
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

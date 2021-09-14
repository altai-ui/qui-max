import { Component, ComponentInternalInstance } from 'vue';

import type { Ref, ComputedRef } from 'vue';
import type { Nullable } from '#/helpers';
import { QMessageBoxParams } from '@/qComponents/QMessageBox/src/QMessageBoxContainer/types';

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
  preparedContent: ComputedRef<QDialogContentComponent>;
}

// for hook
export interface QDialogPromise {
  resolve: (evt: string) => void;
  reject: (evt: string) => void;
}

export interface QDialogHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface QDialogOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export type Dialog = (
  content: Component,
  options?: QDialogProps
) => Promise<boolean | string>;

export interface QDialogParams {
  title: string;
}

export interface QDialogContentComponent {
  component: Component;
  props?: QDialogParams | { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

import { Component, ComputedRef, Ref } from 'vue';
import { Nullable } from '#/helpers';
import {
  QDialogOptions,
  QDialogPropBeforeClose,
  QDialogPropTeleportTo
} from '@/qComponents/QDialog/src/types';

export interface QDialogParams {
  width: Nullable<string | number>;
  offsetTop: Nullable<string | number>;
  closeOnClickShadow: Nullable<boolean>;
  beforeClose: QDialogPropBeforeClose;
  customClass: Nullable<string>;
  teleportTo: QDialogPropTeleportTo;
}

export interface QDialogComponent {
  component: Component;
  props?: QDialogParams | { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDialogContainerPropContent = Component | QDialogComponent;

export interface QDialogContainerProps extends QDialogOptions {
  content: QDialogContainerPropContent;
}

export interface QDialogContainerInstance {
  dialog: Ref<Nullable<HTMLElement>>;
  zIndex: Ref<number>;
  isShown: Ref<boolean>;
  dialogStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  containerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  afterEnter: () => void;
  afterLeave: () => void;
  closeBox: () => Promise<void>;
  handleWrapperClick: () => void;
  preparedContent: ComputedRef<QDialogComponent>;
}

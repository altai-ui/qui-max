import type { Component, Ref, ComputedRef } from 'vue';

import type {
  QMessageBoxEvent,
  QMessageBoxOptionWrapClass,
  QMessageBoxOptionWrapStyle,
  QMessageBoxOptions
} from '../types';

export interface QMessageBoxParams {
  title: string;
  message: Nullable<string>;
  submessage: Nullable<string>;
  confirmButtonText: Nullable<string>;
  cancelButtonText: Nullable<string>;
}

export interface QMessageBoxComponent {
  component: Component;
  props?: QMessageBoxParams | { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QMessageBoxContainerPropContent =
  | QMessageBoxParams
  | Component
  | QMessageBoxComponent;

export type QMessageBoxContainerPropWrapClass = QMessageBoxOptionWrapClass;
export type QMessageBoxContainerPropWrapStyle = QMessageBoxOptionWrapStyle;

export interface QMessageBoxContainerProps extends QMessageBoxOptions {
  content: QMessageBoxContainerPropContent;
}

export interface QMessageBoxContainerInstance {
  messageBox: Ref<Nullable<HTMLElement>>;
  zIndex: number;
  isShown: Ref<boolean>;
  preparedContent: ComputedRef<QMessageBoxComponent>;
  closeBox: (event: QMessageBoxEvent) => Promise<void>;
  emitCloseEvent: () => void;
  handleAfterLeave: () => void;
}

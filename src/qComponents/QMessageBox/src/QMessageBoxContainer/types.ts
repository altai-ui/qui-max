import type { Component } from 'vue';

import type {
  QMessageBoxOptionWrapClass,
  QMessageBoxOptionWrapStyle,
  QMessageBoxOptions
} from '../types';

export interface QMessageBoxParams {
  title: Nullable<string>;
  message: Nullable<string>;
  submessage: Nullable<string>;
  confirmButtonText: Nullable<string>;
  cancelButtonText: Nullable<string>;
}

export interface QMessageBoxComponent {
  component: Component;
  props?: { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QMessageBoxContainerPropContent = Component | QMessageBoxComponent;

export type QMessageBoxContainerPropWrapClass = QMessageBoxOptionWrapClass;
export type QMessageBoxContainerPropWrapStyle = QMessageBoxOptionWrapStyle;

export interface QMessageBoxContainerProps extends QMessageBoxOptions {
  content: QMessageBoxContainerPropContent;
}

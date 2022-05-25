import type { Component, Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QMessageBoxAction } from '../constants';
import type {
  QMessageBoxEvent,
  QMessageBoxOptionWrapClass,
  QMessageBoxOptionWrapStyle
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

type Classes = Record<string, boolean>;
type Styles = Record<string, string | number>;

export type QMessageBoxContainerPropWrapClass = Nullable<
  string | Classes | Classes[]
>;
export type QMessageBoxContainerPropWrapStyle = Nullable<
  string | Styles | Styles[]
>;
export type QMessageBoxContainerPropBeforeClose = Nullable<
  (action: QMessageBoxAction) => Promise<boolean>
>;
export type QMessageBoxContainerPropTeleportTo = Nullable<string | HTMLElement>;

export interface QMessageBoxContainerProps {
  content: QMessageBoxContainerPropContent;
  closeOnClickShadow: Nullable<boolean>;
  distinguishCancelAndClose: Nullable<boolean>;
  preventFocusAfterClosing: Nullable<boolean>;
  wrapClass: QMessageBoxOptionWrapClass;
  wrapStyle: QMessageBoxOptionWrapStyle;
  beforeClose: Nullable<QMessageBoxContainerPropBeforeClose>;
  teleportTo: QMessageBoxContainerPropTeleportTo;
}

export interface QMessageBoxContainerProvider {
  emitDoneEvent: (props: QMessageBoxEvent) => Promise<void>;
  emitCloseEvent: () => void;
}

export interface QMessageBoxContainerInstance {
  messageBox: Ref<Nullable<HTMLElement>>;
  zIndex: number;
  isShown: Ref<boolean>;
  preparedContent: ComputedRef<QMessageBoxComponent>;
  afterLeave: () => void;
  emitCloseEvent: () => void;
}

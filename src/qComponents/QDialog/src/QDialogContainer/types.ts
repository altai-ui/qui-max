import type { Component, ComputedRef, Ref } from 'vue';
import { App, ComponentInternalInstance } from 'vue';

import type { Nullable } from '#/helpers';
import type { QDialogEvent } from '../types';
import { UnwrappedInstance } from '#/helpers';

export interface QDialogComponent {
  component: Component;
  props?: { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDialogContainerPropContent = Component | QDialogComponent;

export type QDialogContainerPropTeleportTo = Nullable<string | HTMLElement>;

export interface QDialogContainerProps {
  content: QDialogContainerPropContent;
  parentInstance?: Nullable<ComponentInternalInstance>;
  closeOnClickShadow?: Nullable<boolean>;
  distinguishCancelAndClose?: Nullable<boolean>;
  onBeforeMount?: (app: App<Element>) => void;
  onMounted?: (
    app: App<Element>,
    container: NonNullable<UnwrappedInstance<QDialogContainerInstance>>
  ) => void;
  onUnmounted?: (app: App<Element>) => void;
  width: Nullable<string | number>;
  offsetTop: Nullable<string | number>;
  customClass: Nullable<string>;
  teleportTo: QDialogContainerPropTeleportTo;
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

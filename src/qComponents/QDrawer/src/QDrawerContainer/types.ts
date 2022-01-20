import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QDrawerComponent, QDrawerContent, QDrawerEvent } from '../types';
import type { QDrawerAction } from '../constants';

export type QDrawerContainerPropContent = QDrawerContent;
export type QDrawerContainerPropPosition = 'left' | 'right';
export type QDrawerContainerPropBeforeClose = Nullable<
  (action: QDrawerAction) => Promise<boolean>
>;
export type QDrawerContainerPropTeleportTo = Nullable<string | HTMLElement>;

export interface QDrawerContainerProps {
  content: QDrawerContainerPropContent;
  width: Nullable<string | number>;
  closeOnClickShadow: Nullable<boolean>;
  distinguishCancelAndClose: Nullable<boolean>;
  preventFocusAfterClosing: Nullable<boolean>;
  position: QDrawerContainerPropPosition;
  customClass: Nullable<string>;
  beforeClose: Nullable<QDrawerContainerPropBeforeClose>;
  teleportTo: QDrawerContainerPropTeleportTo;
}

export interface QDrawerContainerProvider {
  emitDoneEvent: (props: QDrawerEvent) => Promise<void>;
  emitCloseEvent: () => void;
}

export interface QDrawerContainerInstance {
  drawer: Ref<Nullable<HTMLElement>>;
  zIndex: number;
  isShown: Ref<boolean>;
  drawerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  drawerClass: ComputedRef<string>;
  preparedContent: ComputedRef<QDrawerComponent>;
  afterLeave: () => void;
  emitCloseEvent: () => void;
}

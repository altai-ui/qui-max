import type { ComputedRef, Ref } from 'vue';

import type { Nullable } from '#/helpers';

import type { QDialogComponent, QDialogContent, QDialogEvent } from '../types';
import type { QDialogAction } from '../constants';

export type QDialogContainerPropContent = QDialogContent;

export type QDialogContainerPropBeforeClose = Nullable<
  (action: QDialogAction) => Promise<boolean>
>;

export type QDialogContainerPropTeleportTo = Nullable<string | HTMLElement>;

export interface QDialogContainerProps {
  content: QDialogContainerPropContent;
  offsetTop: Nullable<string | number>;
  distinguishCancelAndClose: Nullable<boolean>;
  preventFocusAfterClosing: Nullable<boolean>;
  customClass: Nullable<string>;
  beforeClose: Nullable<QDialogContainerPropBeforeClose>;
  teleportTo: QDialogContainerPropTeleportTo;
}

export interface QDialogContainerProvider {
  emitDoneEvent: ({ action, payload }: QDialogEvent) => Promise<void>;
  emitCloseEvent: () => void;
}

export interface QDialogContainerInstance {
  dialog: Ref<Nullable<HTMLElement>>;
  zIndex: number;
  isShown: Ref<boolean>;
  dialogStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  preparedContent: ComputedRef<QDialogComponent>;
  afterLeave: () => void;
  emitCloseEvent: () => void;
}

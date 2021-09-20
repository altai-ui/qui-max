import { App, ComponentInternalInstance } from 'vue';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import {
  QDialogContainerPropContent,
  QDialogContainerInstance
} from './QDialogContainer';
import { QDialogAction } from './constants';
import { QDialogContainerPropTeleportTo } from '@/qComponents/QDialog/src/QDialogContainer/types';

export type QDialogContent = QDialogContainerPropContent;

export interface QDialogHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface QDialogOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
  closeOnClickShadow?: Nullable<boolean>;
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

export interface QDialogEvent {
  action: QDialogAction;
  payload?: unknown;
}

export interface QDialogPromise {
  resolve: (evt: QDialogEvent) => void;
  reject: (evt: QDialogEvent) => void;
}

export interface QDialog {
  (content: QDialogContent, options?: QDialogOptions): Promise<QDialogEvent>;
}

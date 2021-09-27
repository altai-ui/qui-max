import type { App, ComponentInternalInstance } from 'vue';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import type {
  QDrawerContainerPropContent,
  QDrawerContainerInstance,
  QDrawerContainerPropPosition,
  QDrawerContainerPropTeleportTo
} from './QDrawerContainer';
import type { QDrawerAction } from './constants';

export type QDrawerContent = QDrawerContainerPropContent;

export interface QDrawerHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface QDrawerOptions {
  width?: Nullable<string | number>;
  closeOnClickShadow?: Nullable<boolean>;
  distinguishCancelAndClose?: Nullable<boolean>;
  position?: QDrawerContainerPropPosition;
  customClass?: Nullable<string>;
  teleportTo?: QDrawerContainerPropTeleportTo;
  parentInstance?: Nullable<ComponentInternalInstance>;
  onBeforeMount?: (app: App<Element>) => void;
  onMounted?: (
    app: App<Element>,
    container: NonNullable<UnwrappedInstance<QDrawerContainerInstance>>
  ) => void;
  onUnmounted?: (app: App<Element>) => void;
}

export interface QDrawerEvent {
  action: QDrawerAction;
  payload?: unknown;
}

export interface DrawerPromise {
  resolve: (event: QDrawerEvent) => void;
  reject: (event: QDrawerEvent) => void;
}

export interface QDrawer {
  (content: QDrawerContent, options?: QDrawerOptions): Promise<QDrawerEvent>;
}

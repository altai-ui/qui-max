import type { App, ComponentInternalInstance } from 'vue';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import type {
  QDrawerContainerPropComponent,
  QDrawerContainerInstance,
  QDrawerPropPosition,
  QDrawerPropTeleportTo
} from './QDrawerContainer';
import type { QDrawerAction } from './constants';

export type QDrawerContent = QDrawerContainerPropComponent;

export interface QDrawerHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface QDrawerOptions {
  title: Nullable<string>;
  width: Nullable<string | number>;
  position: QDrawerPropPosition;
  teleportTo?: QDrawerPropTeleportTo;
  parentInstance?: Nullable<ComponentInternalInstance>;
  closeOnClickShadow?: Nullable<boolean>;
  distinguishCancelAndClose?: Nullable<boolean>;
  customClass?: Nullable<string>;
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

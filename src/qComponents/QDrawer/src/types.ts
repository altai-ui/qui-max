import { App, ComponentInternalInstance } from 'vue';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import type {
  QDrawerContainerPropComponent,
  QDrawerContainerInstance,
  QDrawerPropPosition,
  QDrawerContentPropBeforeClose,
  QDrawerPropTeleportTo,
  QDrawerContainerProps
} from './QDrawerContainer/types';
import type { QDrawerAction } from './constants';

export type { QDrawerContainerPropComponent, QDrawerContainerProps };

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
  customClass?: Nullable<string>;
  beforeClose?: Nullable<QDrawerContentPropBeforeClose>;
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
  (
    content: QDrawerContainerPropComponent,
    options?: QDrawerOptions
  ): Promise<QDrawerEvent>;
}

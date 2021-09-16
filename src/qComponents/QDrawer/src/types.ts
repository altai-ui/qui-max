import { App, ComponentInternalInstance } from 'vue';
import { Nullable, UnwrappedInstance } from '#/helpers';
import type {
  QDrawerContainerPropContent,
  QDrawerInstance
} from './QDrawerContainer/types';
import { QDrawerAction } from './constants';

export interface QDrawerHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface QDrawerOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
  onBeforeMount?: (app: App<Element>) => void;
  onMounted?: (
    app: App<Element>,
    container: NonNullable<UnwrappedInstance<QDrawerInstance>>
  ) => void;
  onUnmounted?: (app: App<Element>) => void;
}

export interface QDrawerEvent {
  action: QDrawerAction;
  payload?: unknown;
}

export interface QDrawerPromise {
  resolve: (event: QDrawerEvent) => void;
  reject: (event: QDrawerEvent) => void;
}

export interface DrawerPlugin {
  (
    content: QDrawerContainerPropContent,
    options?: QDrawerOptions
  ): Promise<QDrawerEvent>;
}

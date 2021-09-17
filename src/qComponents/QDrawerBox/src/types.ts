import { App, ComponentInternalInstance } from 'vue';
import { Nullable, UnwrappedInstance } from '#/helpers';
import type {
  QDrawerBoxContainerPropContent,
  QDrawerBoxContainerInstance,
  QDrawerBoxPropPosition
} from './QDrawerContainer/types';
import { QDrawerBoxAction } from './constants';

export type QDrawerBoxContent = QDrawerBoxContainerPropContent;

export interface QDrawerBoxHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface QDrawerBoxOptions {
  width: Nullable<string | number>;
  title: Nullable<string>;
  position: QDrawerBoxPropPosition;
  parentInstance?: Nullable<ComponentInternalInstance>;
  wrapperClosable?: Nullable<boolean>;
  customClass?: Nullable<string>;
  onBeforeMount?: (app: App<Element>) => void;
  onMounted?: (
    app: App<Element>,
    container: NonNullable<UnwrappedInstance<QDrawerBoxContainerInstance>>
  ) => void;
  onUnmounted?: (app: App<Element>) => void;
}

export interface QDrawerBoxEvent {
  action: QDrawerBoxAction;
  payload?: unknown;
}

export interface QDrawerBoxPromise {
  resolve: (event: QDrawerBoxEvent) => void;
  reject: (event: QDrawerBoxEvent) => void;
}

export interface Drawer {
  (
    content: QDrawerBoxContent,
    options?: QDrawerBoxOptions
  ): Promise<QDrawerBoxEvent>;
}

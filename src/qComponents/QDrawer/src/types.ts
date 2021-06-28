import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export type QDrawerPropBeforeClose = Nullable<(hide: () => void) => void>;
export type QDrawerPropPosition = 'left' | 'right';
export type QDrawerPropTeleportTo = Nullable<string | HTMLElement>;

export interface QDrawerProps {
  width: Nullable<string | number>;
  title: Nullable<string>;
  visible: Nullable<boolean>;
  destroyOnClose: Nullable<boolean>;
  wrapperClosable: Nullable<boolean>;
  beforeClose: QDrawerPropBeforeClose;
  position: QDrawerPropPosition;
  customClass: Nullable<string>;
  teleportTo: QDrawerPropTeleportTo;
  renderOnMount: Nullable<boolean>;
}

export interface QDrawerInstance {
  drawer: Ref<Nullable<HTMLElement>>;
  zIndex: Ref<number>;
  isRendered: Ref<boolean>;
  drawerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  drawerClass: ComputedRef<string>;
  afterEnter: () => void;
  afterLeave: () => void;
  closeDrawer: () => void;
  handleWrapperClick: () => void;
}

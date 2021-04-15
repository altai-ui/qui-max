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

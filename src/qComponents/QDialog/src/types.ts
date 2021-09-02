import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export type QDialogPropBeforeClose = Nullable<(hide: () => void) => void>;
export type QDialogPropTeleportTo = Nullable<string | HTMLElement>;

export interface QDialogProps {
  width: Nullable<string | number>;
  offsetTop: Nullable<string | number>;
  title: Nullable<string>;
  visible: Nullable<boolean>;
  destroyOnClose: Nullable<boolean>;
  wrapperClosable: Nullable<boolean>;
  beforeClose: QDialogPropBeforeClose;
  customClass: Nullable<string>;
  teleportTo: QDialogPropTeleportTo;
  renderOnMount: Nullable<boolean>;
}

export interface QDialogInstance {
  dialog: Ref<Nullable<HTMLElement>>;
  zIndex: Ref<number>;
  isRendered: Ref<boolean>;
  dialogStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  containerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  afterEnter: () => void;
  afterLeave: () => void;
  closeDialog: () => void;
  handleWrapperClick: () => void;
}

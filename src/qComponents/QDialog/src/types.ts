import { ComponentInternalInstance } from 'vue';

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
  isVisible: Ref<boolean>;
  dialogStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  containerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  afterEnter: () => void;
  afterLeave: () => void;
  closeDialog: () => void;
  handleWrapperClick: () => void;
}

// for hook
export interface QDialogPromise {
  resolve: (evt: boolean) => void;
}

export interface QDialogHookOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export interface QDialogOptions {
  parentInstance?: Nullable<ComponentInternalInstance>;
}

export type Dialog = (content: QDialogProps) => Promise<boolean>;

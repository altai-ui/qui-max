import type { App, Ref, ComponentPublicInstance } from 'vue';

import type { NotifyType } from './constants';

export type QNotifyId = string | number;

export interface QNotifyOptions {
  id?: QNotifyId;
  type?: NotifyType;
  icon?: Nullable<string>;
  duration?: Nullable<number>;
  onClick?: (callback: () => void) => void;
  onClose?: () => void;
}

export type QNotifyContent = string;

export interface QNotifyItem extends QNotifyOptions {
  id: QNotifyId;
  content: QNotifyContent;
}

export interface QNotify {
  (content: QNotifyContent, options?: QNotifyOptions): QNotifyId;

  close(id: QNotifyId): void;
  closeAll(): void;

  success: (
    content: QNotifyContent,
    options?: QNotifyOptions & { type?: NotifyType.SUCCESS }
  ) => QNotifyId;

  info: (
    content: QNotifyContent,
    options?: QNotifyOptions & { type?: NotifyType.INFO }
  ) => QNotifyId;

  error: (
    content: QNotifyContent,
    options?: QNotifyOptions & { type?: NotifyType.ERROR }
  ) => QNotifyId;

  warning: (
    content: QNotifyContent,
    options?: QNotifyOptions & { type?: NotifyType.WARNING }
  ) => QNotifyId;
}

export interface QNotificationOptions {
  list: Ref<QNotifyItem[]>;
  onMounted?: (
    containerComponent: ComponentPublicInstance,
    containerApp: App<Element>
  ) => void;
}

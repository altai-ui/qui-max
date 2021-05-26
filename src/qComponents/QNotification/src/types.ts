import { Ref, ComputedRef } from 'vue';

export type QNotificationCloudPropType =
  | 'success'
  | 'warning'
  | 'info'
  | 'error';

export type QNotificationCloudPropOnClose = Nullable<(id: string) => void>;

export interface QNotificationProps {
  icon: Nullable<string>;
  duration: Nullable<number>;
}

export interface QNotificationCloudItem {
  id?: string;
  message?: Nullable<string>;
  type?: QNotificationCloudPropType;
  dangerouslyUseHTMLString?: Nullable<boolean>;
  icon?: Nullable<string>;
  duration?: Nullable<number>;
  onClose?: QNotificationCloudPropOnClose;
}

export type QNotificationMethodAddCloud = (
  cloud?: QNotificationCloudItem
) => void;

export interface QNotificationInstance {
  clouds: Ref<QNotificationCloudItem[]>;
  removeCloud: (cloudId?: Nullable<string>) => void;
}

export interface QNotificationCloudProps {
  uniqId: string;
  message: Nullable<string>;
  type: QNotificationCloudPropType;
  dangerouslyUseHtmlString: Nullable<boolean>;
  icon: Nullable<string>;
  duration: Nullable<number>;
  onClose: QNotificationCloudPropOnClose;
}

export interface QNotificationCloudInstance {
  notificationClasses: ComputedRef<Record<string, boolean>>;
  iconClass: ComputedRef<string>;
  clearTimer: () => void;
  startTimer: () => void;
  close: () => void;
}

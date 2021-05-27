import type { Ref, ComputedRef } from 'vue';

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

export interface Cloud extends QNotificationCloudItem {
  id: string;
}

export type QNotificationMethodAddCloud = (cloud?: Cloud) => void;

export interface QNotificationInstance {
  clouds: Ref<Cloud[]>;
  removeCloud: (cloudId?: Nullable<string>) => void;
}

export type QNotificationCloudPropMessage = Nullable<string>;
export type QNotificationCloudPropDangerouslyUseHtmlString = Nullable<boolean>;
export interface QNotificationCloudProps {
  uniqId: string;
  message: QNotificationCloudPropMessage;
  type: QNotificationCloudPropType;
  dangerouslyUseHtmlString: QNotificationCloudPropDangerouslyUseHtmlString;
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

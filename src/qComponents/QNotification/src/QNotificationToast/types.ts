import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QNotifyContent } from '../types';
import type { NotifyType } from '../constants';

export type QNotificationToastPropType = NotifyType;
export type QNotificationToastPropOnClose = Nullable<(id: string) => void>;
export type QNotificationToastPropContent = QNotifyContent;

export interface QNotificationToastProps {
  uniqId: string;
  content: QNotificationToastPropContent;
  type: QNotificationToastPropType;
  icon: Nullable<string>;
  duration: Nullable<number>;
  onClose: QNotificationToastPropOnClose;
}

export interface QNotificationToastInstance {
  notificationClasses: ComputedRef<Record<string, boolean>>;
  iconClass: ComputedRef<string>;
  clearTimer: () => void;
  startTimer: () => void;
  close: () => void;
}

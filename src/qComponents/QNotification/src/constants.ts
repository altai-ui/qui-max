import type { InjectionKey } from 'vue';

export const DEFAULT_DURATION = 3000;
export enum NotifyType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEFAULT = 'default'
}

export const NOTIFICATION_INJECTION_KEY: InjectionKey<string> =
  Symbol('QNotification');

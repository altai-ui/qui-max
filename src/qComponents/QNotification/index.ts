import { getCurrentInstance, provide, inject } from 'vue';
import type { App, Plugin } from 'vue';

import { createNotification } from './src';
import { NotifyType, NOTIFICATION_INJECTION_KEY } from './src/constants';
import type { QNotify, QNotificationOptions } from './src/types';

const QNotification: Plugin = {
  install: (app: App, options?: QNotificationOptions): void => {
    const notify = createNotification(options);
    app.provide<QNotify>(NOTIFICATION_INJECTION_KEY, notify);
  }
};

const provideNotify = (options?: QNotificationOptions): void => {
  const notify = createNotification(options);

  provide<QNotify>(NOTIFICATION_INJECTION_KEY, notify);
};

const useNotify = (options?: QNotificationOptions): QNotify => {
  const notify = getCurrentInstance()
    ? inject<QNotify>(NOTIFICATION_INJECTION_KEY)
    : null;

  return notify ?? createNotification(options, false);
};

export type { QNotifyId } from './src/types';
export { NotifyType, provideNotify, useNotify };
export default QNotification;

import { getCurrentInstance, provide, inject } from 'vue';
import type { App, Plugin } from 'vue';

import { createNotification } from './src';
import { NotifyType, Q_NOTIFY_INJECTION_KEY } from './src/constants';
import type { QNotify, QNotificationOptions } from './src/types';

const QNotification: Plugin = {
  install: (app: App, options?: QNotificationOptions): void => {
    const notify = createNotification(options);
    app.provide<QNotify>(Q_NOTIFY_INJECTION_KEY, notify);
  }
};

const provideNotify = (options?: QNotificationOptions): void => {
  const notify = createNotification(options);

  provide<QNotify>(Q_NOTIFY_INJECTION_KEY, notify);
};

const useNotify = (options?: QNotificationOptions): QNotify => {
  const notify = getCurrentInstance()
    ? inject<QNotify>(Q_NOTIFY_INJECTION_KEY)
    : null;

  return notify ?? createNotification(options, false);
};

export type { QNotify, QNotifyId } from './src/types';
export { Q_NOTIFY_INJECTION_KEY, NotifyType, provideNotify, useNotify };
export default QNotification;

import type { App } from 'vue';

import { eventBus, randId } from '@/qComponents/helpers';
import QNotification from './src/QNotification.vue';
import type { QNotificationCloudItem } from './src/types';

/* istanbul ignore next */
QNotification.install = (app: App): void => {
  app.component(QNotification.name, QNotification);
};

const notify = (cloud: QNotificationCloudItem): string => {
  const id = randId();
  eventBus.emit('QNotification/add', { id, ...cloud });
  return id;
};

const notifyCloseAll = (): void => {
  eventBus.emit('QNotification/removeAll');
};

const notifyClose = (id?: Nullable<string>): void => {
  eventBus.emit('QNotification/remove', id);
};

export type {
  QNotificationProps,
  QNotificationCloudItem,
  QNotificationInstance
} from './src/types';
export { notify, notifyClose, notifyCloseAll };
export default QNotification as SFCWithInstall<App, typeof QNotification>;

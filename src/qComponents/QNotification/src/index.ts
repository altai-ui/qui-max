import { createApp, ref, nextTick } from 'vue';

import { isServer } from '@/qComponents/constants/isServer';
import { randId } from '@/qComponents/helpers';

import { NotifyType } from './constants';
import QNotificationContainer from './QNotificationContainer';
import type {
  QNotify,
  QNotifyItem,
  QNotifyContent,
  QNotifyOptions,
  QNotificationOptions,
  QNotifyId
} from './types';

let notifyList = ref<QNotifyItem[]>([]);

export const createNotification = (
  config?: QNotificationOptions,
  mountContainer = true
): QNotify => {
  if (config?.list) notifyList = config.list;

  const closeNotify = (id: QNotifyId): void => {
    if (!id) return;

    const index = notifyList.value.findIndex(({ id: itemId }) => itemId === id);

    if (index >= 0) notifyList.value.splice(index, 1);
  };

  if (!isServer && mountContainer) {
    nextTick(() => {
      const app = createApp(QNotificationContainer, {
        ...config,
        list: notifyList,
        onRemove: closeNotify
      });

      const component = app.mount(document.createElement('div'));

      config?.onMounted?.(component, app);
    });
  }

  const notify = (
    content: QNotifyContent,
    options?: QNotifyOptions
  ): QNotifyId => {
    const toast: QNotifyItem = {
      id: randId(),
      type: NotifyType.DEFAULT,
      content,
      ...options
    };

    notifyList.value.push(toast);

    return toast.id;
  };

  notify.close = closeNotify;
  notify.closeAll = (): void => {
    notifyList.value = [];
  };

  const defineTypedNotify = <T extends NotifyType>(type: T) => {
    return (
      content: QNotifyContent,
      options?: QNotifyOptions & { type?: T }
    ): QNotifyId => notify(content, { ...(options ?? {}), type });
  };

  notify.success = defineTypedNotify(NotifyType.SUCCESS);
  notify.info = defineTypedNotify(NotifyType.INFO);
  notify.error = defineTypedNotify(NotifyType.ERROR);
  notify.warning = defineTypedNotify(NotifyType.WARNING);

  return notify;
};

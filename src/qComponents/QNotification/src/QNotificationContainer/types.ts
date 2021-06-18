import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QNotifyItem, QNotifyId } from '../types';

export interface QNotificationContainerProps {
  list: Ref<QNotifyItem[]>;
  icon: Nullable<string>;
  duration: Nullable<number>;
}

export interface QNotificationContainerInstance {
  notifyList: ComputedRef<QNotifyItem[]>;
  handleRemove: (id: QNotifyId) => void;
}

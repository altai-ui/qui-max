// eslint-disable-next-line import/no-extraneous-dependencies
import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import { useNotify, NotifyType } from '@/qComponents/QNotification';
import QNotificationToast, {
  QNotificationToastProps
} from '@/qComponents/QNotification/src/QNotificationToast';
import type { QNotifyId } from '@/qComponents/QNotification';
import type { Nullable } from '#/helpers';
import iconsList from '../core/iconsList';

const storyMetadata: Meta = {
  title: 'Components/QNotification',
  component: QNotificationToast,
  argTypes: {
    icon: { control: { type: 'select', options: iconsList } },
    type: { control: { type: 'select', options: Object.values(NotifyType) } }
  }
};

const QNotificationStory: Story<QNotificationToastProps> = args =>
  defineComponent({
    setup() {
      const notify = useNotify();

      let lastCloudId: Nullable<QNotifyId> = null;

      const handleClick = (): void => {
        const notifyId = notify(args.content, {
          type: args.type,
          duration: args.duration,
          icon: args.icon
        });

        lastCloudId = notifyId;
      };

      const handleCloseLastClick = (): void => {
        if (lastCloudId) notify.close(lastCloudId);
      };

      const handleCloseAllClick = (): void => {
        notify.closeAll();
      };

      return {
        handleClick,
        handleCloseLastClick,
        handleCloseAllClick
      };
    },
    template: `
      <q-button @click="handleClick">Click to open</q-button>
      <q-button @click="handleCloseLastClick">Close last</q-button>
      <q-button
        theme="secondary"
        @click="handleCloseAllClick"
      >Close all</q-button>
    `
  });

QNotificationStory.storyName = 'Default';
QNotificationStory.args = {
  content: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
  type: NotifyType.WARNING,
  duration: null,
  icon: null
};

export { QNotificationStory };
export default storyMetadata;

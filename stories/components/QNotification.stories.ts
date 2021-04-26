// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import QNotification, {
  notify,
  notifyClose,
  notifyCloseAll
} from '@/qComponents/QNotification';
import QNotificationCloud from '@/qComponents/QNotification/src/QNotificationCloud.vue';
import type { QNotificationCloudItem } from '@/qComponents/QNotification';
import iconsList from '../core/iconsList';

const storyMetadata: Meta = {
  title: 'Components/QNotification',
  component: QNotificationCloud,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [null, 'success', 'warning', 'info', 'error']
      }
    },
    icon: { control: { type: 'select', options: iconsList } }
  }
};

const QNotificationStory: Story<QNotificationCloudItem> = args =>
  defineComponent({
    components: { QNotification },
    setup() {
      let lastCloudId: string | null = null;

      const handleClick = (): void => {
        const notifyId = notify({
          message: args.message,
          type: args.type,
          dangerouslyUseHTMLString: args.dangerouslyUseHTMLString,
          duration: args.duration,
          icon: args.icon
        });

        lastCloudId = notifyId;
      };

      const handleCloseLastClick = (): void => {
        notifyClose(lastCloudId);
      };

      const handleCloseAllClick = (): void => {
        notifyCloseAll();
      };

      return {
        handleClick,
        handleCloseLastClick,
        handleCloseAllClick
      };
    },
    template: `
      <q-notification />

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
  message: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.'
};

export { QNotificationStory };
export default storyMetadata;

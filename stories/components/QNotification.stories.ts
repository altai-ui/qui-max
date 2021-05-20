// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import QNotification, {
  notify,
  notifyClose,
  notifyCloseAll
} from '@/qComponents/QNotification';

import QNotificationCloud from '@/qComponents/QNotification/src/QNotificationCloud.vue';
import type {
  QNotificationProps,
  QNotificationCloudItem
} from '@/qComponents/QNotification';
import iconsList from '../core/iconsList';

const storyMetadata: Meta = {
  title: 'Components/QNotification',
  component: QNotification,
  subcomponents: { QNotificationCloud },
  argTypes: {
    icon: { control: { type: 'select', options: iconsList } },
    notifyArgs: { control: { type: 'object' } }
  }
};

interface Args extends QNotificationProps {
  notifyArgs: QNotificationCloudItem;
}

const QNotificationStory: Story<Args> = args =>
  defineComponent({
    components: { QNotification },
    setup() {
      let lastCloudId: Nullable<string> = null;

      const handleClick = (): void => {
        const notifyId = notify(args.notifyArgs);

        lastCloudId = notifyId;
      };

      const handleCloseLastClick = (): void => {
        notifyClose(lastCloudId);
      };

      const handleCloseAllClick = (): void => {
        notifyCloseAll();
      };

      return {
        args,
        handleClick,
        handleCloseLastClick,
        handleCloseAllClick
      };
    },
    template: `
      <q-notification
        :icon="args.icon"
        :duration="args.duration"
      />

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
  notifyArgs: {
    message: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
    type: 'warning',
    dangerouslyUseHTMLString: false,
    duration: null,
    icon: null
  }
};

export { QNotificationStory };
export default storyMetadata;

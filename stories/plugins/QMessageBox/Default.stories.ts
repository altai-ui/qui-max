import type { Story, Meta } from '@storybook/vue3';
import { defineComponent } from 'vue';

import { QMessageBoxContent, useMessageBox } from '@/qComponents/QMessageBox';
import type {
  QMessageBoxContentPropBeforeClose,
  QMessageBoxContentProps
} from '@/qComponents/QMessageBox/src/QMessageBoxContent';

const storyMetadata: Meta = {
  title: 'Plugins/QMessageBox',
  component: QMessageBoxContent
};

const QMessageBoxStory: Story<QMessageBoxContentProps> = args =>
  defineComponent({
    setup() {
      const beforeClose: QMessageBoxContentPropBeforeClose = async action => {
        if (action !== 'confirm') return true;

        const promise = (): Promise<string> =>
          new Promise(resolve => {
            setTimeout(() => resolve('готово!'), 1000);
          });

        try {
          await promise();

          return true;
        } catch {
          return false;
        }
      };

      const handleClick = async (): Promise<void> => {
        try {
          const result = await useMessageBox(
            {
              title: args.title,
              message: args.message,
              submessage: args.submessage,
              confirmButtonText: args.confirmButtonText,
              cancelButtonText: args.cancelButtonText,
              beforeClose
            },
            {
              onMounted: (app, container) => {
                // eslint-disable-next-line no-console
                console.log('onMounted', app, container);
              },
              onUnmounted: app => {
                // eslint-disable-next-line no-console
                console.log('onUnmounted', app);
              }
            }
          );

          // eslint-disable-next-line no-console
          console.log('resolve', result);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log('reject', err);
        }
      };

      return { handleClick };
    },
    template: '<q-button @click="handleClick">Click to open</q-button>'
  });

export const Default = QMessageBoxStory.bind({});
Default.args = {
  title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula volutpat nulla et egestas. Mauris mollis, lorem vel aliquam gravida.',
  submessage:
    'Sed sit amet nibh consequat, pellentesque arcu ut, congue lorem.',
  confirmButtonText: 'Fusce blandit',
  cancelButtonText: 'Integer non'
};

export default storyMetadata;

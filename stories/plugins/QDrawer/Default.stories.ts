import type { Meta, Story } from '@storybook/vue3';

import { defineComponent } from 'vue';
import {
  useDrawer,
  QDrawerContent,
  QDrawerParams
} from '@/qComponents/QDrawer';
import { QDrawerContentPropBeforeClose } from '@/qComponents/QDrawer/src/QDrawerContent/types';

const storyMetadata: Meta = {
  title: 'Plugins/QDrawer/Default',
  component: QDrawerContent,
  argTypes: {
    visible: { control: { type: 'none' } },
    width: { control: { type: 'number' } },
    position: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' }
    }
  }
};

const QDrawerStoryComponent: Story<QDrawerParams> = args =>
  defineComponent({
    setup() {
      const drawer = useDrawer();

      const beforeClose: QDrawerContentPropBeforeClose = async action => {
        if (action !== 'confirm') return true;

        const promise = (): Promise<string> =>
          new Promise(resolve => {
            setTimeout(() => resolve('done!'), 1000);
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
          const result = await drawer(
            {
              title: args.title,
              info: args.info,
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
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('reject', error);
        }
      };

      return { handleClick };
    },
    template: '<q-button @click="handleClick">Click to open</q-button>'
  });

export const Default = QDrawerStoryComponent.bind({});

Default.args = {
  title: 'What is Lorem Ipsum?',
  info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula volutpat nulla et egestas. Mauris mollis, lorem vel aliquam gravida',
  confirmButtonText: 'Fusce blandit',
  cancelButtonText: 'Integer non'
};

export default storyMetadata;

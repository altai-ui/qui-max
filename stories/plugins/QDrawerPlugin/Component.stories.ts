import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { QDrawer, useDrawer } from '@/qComponents/QDrawer/index';

const storyMetadata: Meta = {
  title: 'Plugins/QDrawerPlugin/Default',
  component: QDrawer,
  argTypes: {
    visible: { control: { type: 'none' } },
    width: { control: { type: 'number' } },
    position: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' }
    }
  }
};

const QDrawerStoryComponent: Story<never> = () =>
  defineComponent({
    setup() {
      const drawerPlugin = useDrawer();

      const handleOpen = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleOpen');
      };

      const handleOpened = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleOpened');
      };

      const handleClose = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleClose');
      };

      const handleClosed = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleClosed');
      };

      const handleClick = async (): Promise<void> => {
        try {
          await drawerPlugin(
            defineAsyncComponent(
              () => import('@/qComponents/QDrawer/src/QDrawerContent/index')
            )
          );
          // eslint-disable-next-line no-console
          console.log('resolve');
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('reject', error);
        }
      };

      return {
        handleOpen,
        handleOpened,
        handleClose,
        handleClosed,
        handleClick
      };
    },
    template: '<q-button @click="handleClick">Click to open</q-button>'
  });

export const Default = QDrawerStoryComponent.bind({});

// Default.args = {
//   title: 'What is Lorem Ipsum?',
//   width: 350
// };

export default storyMetadata;

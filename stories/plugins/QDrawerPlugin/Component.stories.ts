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

      const handleClick = async (): Promise<void> => {
        try {
          const result = await drawerPlugin(
            defineAsyncComponent(() => import('./QDrawerSampleContent.vue'))
          );
          // eslint-disable-next-line no-console
          console.log('resolve', result);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('reject', error);
        }
      };

      return {
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

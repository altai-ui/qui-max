import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import QDrawer from '@/qComponents/QDrawer';
import { useDrawer } from '@/qComponents/QDrawer/src/drawer-hook';

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

const QDrawerStory: Story<never> = () =>
  defineComponent({
    setup() {
      const drawerPlugin = useDrawer();

      const handleClick = async (): Promise<void> => {
        try {
          const result = await drawerPlugin(
            defineAsyncComponent(() => import('./QDrawerTest.vue'))
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

export const Default = QDrawerStory.bind({});

export default storyMetadata;

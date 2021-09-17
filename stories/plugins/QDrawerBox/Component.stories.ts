import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDrawer } from '@/qComponents/QDrawerBox';

const storyMetadata: Meta = {
  title: 'Plugins/QDrawerBox/Component'
};

const QDrawerStoryComponent: Story<never> = () =>
  defineComponent({
    setup() {
      const drawerBox = useDrawer();

      const handleClick = async (): Promise<void> => {
        try {
          const result = await drawerBox(
            defineAsyncComponent(() => import('./QDrawerSampleContent.vue')),
            { width: 350, position: 'right', title: 'What is Lorem Ipsum?' }
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

export const Component = QDrawerStoryComponent.bind({});

export default storyMetadata;

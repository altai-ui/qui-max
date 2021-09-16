import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDrawer, QDrawerContent } from '@/qComponents/QDrawer';

const storyMetadata: Meta = {
  title: 'Plugins/QDrawerPlugin/Component',
  component: QDrawerContent
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

export const Component = QDrawerStoryComponent.bind({});

export default storyMetadata;

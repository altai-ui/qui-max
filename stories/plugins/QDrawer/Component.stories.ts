import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDrawer } from '@/qComponents/QDrawer';
import type { QDrawerContainerProps } from '@/qComponents/QDrawer/src/QDrawerContainer';

const storyMetadata: Meta = {
  title: 'Plugins/QDrawer/Component',
  argTypes: {
    title: { control: { type: 'text' } },
    width: { control: { type: 'number' } },
    position: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' }
    }
  }
};

const QDrawerStoryComponent: Story<QDrawerContainerProps> = args =>
  defineComponent({
    setup() {
      const drawer = useDrawer();

      const handleClick = async (): Promise<void> => {
        try {
          const result = await drawer(
            defineAsyncComponent(() => import('./QDrawerSampleContent.vue')),
            {
              width: args.width,
              position: args.position,
              title: args.title
            }
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

Component.args = {
  title: 'What is Lorem Ipsum?',
  width: 350,
  position: 'right'
};

export default storyMetadata;

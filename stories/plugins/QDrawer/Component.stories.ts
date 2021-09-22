import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDrawer } from '@/qComponents';
import type { QDrawerOptions } from '@/qComponents';

const storyMetadata: Meta = {
  title: 'Plugins/QDrawer/Component',
  argTypes: {
    width: { control: { type: 'number' } },
    position: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' }
    },
    customClass: { control: { type: 'text' } },
    distinguishCancelAndClose: { control: { type: 'boolean' } },
    closeOnClickShadow: { control: { type: 'boolean' } }
  }
};

const QDrawerStoryComponent: Story<QDrawerOptions> = args =>
  defineComponent({
    setup() {
      const drawer = useDrawer();

      const handleClick = async (): Promise<void> => {
        try {
          const result = await drawer(
            defineAsyncComponent(() => import('./QDrawerSampleContent.vue')),
            {
              ...args
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
  width: 350
};

export default storyMetadata;

import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDrawer } from '@/qComponents';
import { QDrawerContainer } from '@/qComponents/QDrawer/src/QDrawerContainer';
import type { QDrawerOptions } from '@/qComponents';

const storyMetadata: Meta = {
  title: 'Plugins/QDrawer/Extended',
  component: QDrawerContainer,
  argTypes: {
    content: { control: { type: 'none' } },
    teleportTo: { control: { type: 'none' } },
    position: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' }
    }
  }
};

const QDrawerStoryComponent: Story<QDrawerOptions> = args =>
  defineComponent({
    setup() {
      const drawer = useDrawer();

      const handleClick = async (): Promise<void> => {
        try {
          const result = await drawer(
            {
              component: defineAsyncComponent(
                () => import('./DrawerFormTest.vue')
              ),
              props: {
                someExternalProp: 'Some external prop here'
              },
              listeners: {
                nameInput: (value: string) => {
                  console.log(`listeners - nameInput: ${value}`);
                }
              }
            },
            args
          );

          console.log('resolve', result);
        } catch (result) {
          console.log('reject', result);
        }
      };

      return { handleClick };
    },
    template: '<q-button @click="handleClick">Click to open drawer</q-button>'
  });

export const Extended = QDrawerStoryComponent.bind({});
export default storyMetadata;

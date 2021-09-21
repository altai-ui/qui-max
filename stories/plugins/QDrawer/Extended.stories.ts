import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDrawer } from '@/qComponents';

import type { QDrawerContainerProps } from '@/qComponents';

const storyMetadata: Meta = {
  title: 'Plugins/QDrawer/Extended',
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

const QDrawerStoryComponent: Story<QDrawerContainerProps> = args =>
  defineComponent({
    setup() {
      const drawer = useDrawer();

      const handleClick = async (): Promise<void> => {
        try {
          const result = await drawer(
            {
              component: defineAsyncComponent(
                () => import('./QDrawerSampleContent.vue')
              ),
              props: {
                someExternalProp: 'some external prop here'
              },
              listeners: {
                nameInput: (value: string) => {
                  // eslint-disable-next-line no-console
                  console.log(`listeners - nameInput: ${value}`);
                }
              }
            },
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

      return { handleClick };
    },
    template: '<q-button @click="handleClick">Click to open</q-button>'
  });

export const Extended = QDrawerStoryComponent.bind({});

Extended.args = {
  title: 'What is Lorem Ipsum?',
  width: 350,
  position: 'right',
  distinguishCancelAndClose: true
};

export default storyMetadata;

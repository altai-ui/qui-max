import type { Meta, Story } from '@storybook/vue3';

import { defineAsyncComponent, defineComponent } from 'vue';
import { useDrawer } from '@/qComponents/QDrawerBox';

import { QDrawerBoxContainerProps } from '@/qComponents/QDrawerBox/src/QDrawerContainer';

const storyMetadata: Meta = {
  title: 'Plugins/QDrawerBox/Extended',
  argTypes: {
    visible: { control: { type: 'none' } },
    width: { control: { type: 'number' } },
    position: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' }
    }
  }
};

const QDrawerStoryComponent: Story<QDrawerBoxContainerProps> = args =>
  defineComponent({
    setup() {
      const drawerBox = useDrawer();

      const handleClick = async (): Promise<void> => {
        try {
          const result = await drawerBox(
            {
              component: defineAsyncComponent(
                () => import('./QDrawerSampleContent.vue')
              ),
              props: {
                someExternalProp: 'some external prop here'
              },
              listeners: {
                // wip
              }
            },
            { title: args.title, width: args.width, position: args.position }
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
  position: 'right'
};

export default storyMetadata;

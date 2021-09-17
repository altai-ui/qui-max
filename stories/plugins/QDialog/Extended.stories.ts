import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDialog } from '@/qComponents/QDialog';
import { Default } from './Default.stories';

import { QDialogOptions } from '@/qComponents/QDialog/src/types';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog/Extended',
  argTypes: {
    offsetTop: { control: { type: 'number' } },
    width: { control: { type: 'number' } },
    closeOnClickShadow: { control: { type: 'boolean', default: false } }
  }
};

const QDialogExtendedStory: Story<QDialogOptions> = args =>
  defineComponent({
    setup() {
      const dialog = useDialog();

      const handleClick = async (): Promise<void> => {
        try {
          const result = await dialog(
            {
              component: defineAsyncComponent(
                () => import('./DialogFormTest.vue')
              ),
              props: {
                someExternalProp: 'Some value of some external component'
              },
              listeners: {
                nameInput: (value: string) => {
                  // eslint-disable-next-line no-console
                  console.log('listeners - nameInput:', value);
                }
              }
            },
            { ...args }
          );
          // eslint-disable-next-line no-console
          console.log('event:', result);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      };

      return { handleClick };
    },
    template: `
      <q-button @click="handleClick">open</q-button>
    `
  });

export const Extended = QDialogExtendedStory.bind({});
Default.args = {
  width: null,
  offsetTop: null,
  closeOnClickShadow: false
};
export default storyMetadata;

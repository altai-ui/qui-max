import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDialog } from '@/qComponents/QDialog';
import { QDialogParams } from '@/qComponents/QDialog/src/QDialogContainer/types';
import { Default } from './Default.stories';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog/Extended',
  argTypes: {
    offsetTop: { control: { type: 'number' } },
    width: { control: { type: 'number' } }
  }
};

const QDialogExtendedStory: Story<QDialogParams> = args =>
  defineComponent({
    setup() {
      const dialog = useDialog();

      const openDialog = async (): Promise<void> => {
        try {
          const res = await dialog(
            {
              component: defineAsyncComponent(
                () => import('./QdialogContent.vue')
              ),
              props: {
                someExternalProp: 'Some value of some external component'
              },
              listeners: {
                clickButton: () => {
                  // eslint-disable-next-line no-console
                  console.log('listeners - clickButton: clicked');
                }
              }
            },
            { ...args, closeOnClickShadow: true }
          );
          // eslint-disable-next-line no-console
          console.log('event:', res);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      };

      return { openDialog };
    },
    template: `
      <q-button @click="openDialog">open</q-button>
    `
  });

export const Extended = QDialogExtendedStory.bind({});
Default.args = {
  width: null,
  offsetTop: null
};
export default storyMetadata;

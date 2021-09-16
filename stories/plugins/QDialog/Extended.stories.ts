import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { QDialog, useDialog } from '@/qComponents/QDialog';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog/Extended',
  component: QDialog,
  argTypes: {
    offsetTop: { control: { type: 'text' } },
    width: { control: { type: 'text' } }
  }
};

const QDialogExtendedStory: Story<never> = args =>
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
            { closeOnClickShadow: true }
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

export default storyMetadata;

import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { QDialog, useDialog } from '@/qComponents/QDialog';
import type { QDialogProps } from '@/qComponents/QDialog';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog',
  component: QDialog,
  argTypes: {
    offsetTop: { control: { type: 'text' } },
    width: { control: { type: 'text' } }
  }
};

const QDialogStory: Story<QDialogProps> = args =>
  defineComponent({
    setup() {
      const dialog = useDialog();

      const handleOpen = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleOpen');
      };

      const handleOpened = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleOpened');
      };

      const handleClose = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleClose');
      };

      const handleClosed = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleClosed');
      };

      const openDialog = async (): Promise<void> => {
        try {
          const res = await dialog(
            defineAsyncComponent(
              () =>
                import(
                  '@/qComponents/QDialog/src/QDialogContent/QdialogContent.vue'
                )
            ),
            { ...args }
          );
          // eslint-disable-next-line no-console
          console.log('event:', res);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      };

      return {
        args,
        handleOpen,
        handleOpened,
        handleClose,
        handleClosed,
        openDialog
      };
    },
    template: `
      <q-button @click="openDialog">open</q-button>
    `
  });

export const Default = QDialogStory.bind({});
Default.args = {
  title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.'
};

export default storyMetadata;

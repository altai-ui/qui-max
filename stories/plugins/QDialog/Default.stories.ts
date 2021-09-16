import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';
import { QDialog, useDialog } from '@/qComponents';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog',
  component: QDialog,
  argTypes: {
    offsetTop: { control: { type: 'text' } },
    width: { control: { type: 'text' } }
  }
};

const QDialogStory: Story<never> = args =>
  defineComponent({
    setup() {
      const dialog = useDialog();

      const openDialog = async (): Promise<void> => {
        try {
          const res = await dialog(
            defineAsyncComponent(() => import('./QdialogContent.vue')),
            { closeOnClickShadow: true }
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
        openDialog
      };
    },
    template: `
      <q-button @click="openDialog">open</q-button>
    `
  });

export const Default = QDialogStory.bind({});
export default storyMetadata;

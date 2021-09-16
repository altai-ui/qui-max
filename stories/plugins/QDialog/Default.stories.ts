import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';
import { useDialog } from '@/qComponents';
import {
  QDialogContainerProps,
  QDialogParams
} from '@/qComponents/QDialog/src/QDialogContainer/types';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog',
  argTypes: {
    offsetTop: { control: { type: 'number' } },
    width: { control: { type: 'number' } }
  }
};

const QDialogStory: Story<QDialogParams> = args =>
  defineComponent({
    setup() {
      const dialog = useDialog();

      const openDialog = async (): Promise<void> => {
        try {
          const res = await dialog(
            defineAsyncComponent(() => import('./QdialogContent.vue')),
            { ...args, closeOnClickShadow: true }
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
Default.args = {
  width: null,
  offsetTop: null
};
export default storyMetadata;

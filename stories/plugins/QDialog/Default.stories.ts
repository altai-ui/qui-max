import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDialog } from '@/qComponents';

import { QDialogOptions } from '@/qComponents/QDialog/src/types';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog',
  argTypes: {
    offsetTop: { control: { type: 'number' } },
    width: { control: { type: 'number' } },
    closeOnClickShadow: { control: { type: 'boolean', default: false } }
  }
};

const QDialogStory: Story<QDialogOptions> = args =>
  defineComponent({
    setup() {
      const dialog = useDialog();

      const handleClick = async (): Promise<void> => {
        try {
          const result = await dialog(
            defineAsyncComponent(() => import('./DialogFormTest.vue')),
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

export const Default = QDialogStory.bind({});
Default.args = {
  width: null,
  offsetTop: null,
  closeOnClickShadow: false
};
export default storyMetadata;

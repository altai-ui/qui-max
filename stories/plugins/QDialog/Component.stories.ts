import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDialog, QDialogOptions } from '@/qComponents';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog/Component',
  argTypes: {
    offsetTop: { control: { type: 'number' } },
    width: { control: { type: 'number' } },
    closeOnClickShadow: { control: { type: 'boolean' } },
    customClass: { control: { type: 'text' } },
    distinguishCancelAndClose: { control: { type: 'boolean' } }
  }
};

const QDialogComponentStory: Story<QDialogOptions> = args =>
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
          console.log('resolve', result);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log('reject', err);
        }
      };

      return { handleClick };
    },
    template: '<q-button @click="handleClick">Click to open</q-button>'
  });

export const Component = QDialogComponentStory.bind({});

export default storyMetadata;

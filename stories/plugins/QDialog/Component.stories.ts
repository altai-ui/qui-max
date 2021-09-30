import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDialog } from '@/qComponents';
import { QDialogContainer } from '@/qComponents/QDialog/src/QDialogContainer';
import type { QDialogOptions } from '@/qComponents';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog/Component',
  component: QDialogContainer,
  argTypes: {
    content: { control: { type: 'none' } },
    teleportTo: { control: { type: 'none' } }
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
            args
          );

          // eslint-disable-next-line no-console
          console.log('resolve', result);
        } catch (result) {
          // eslint-disable-next-line no-console
          console.log('reject', result);
        }
      };

      return { handleClick };
    },
    template: '<q-button @click="handleClick">Click to open dialog</q-button>'
  });

export const Component = QDialogComponentStory.bind({});
export default storyMetadata;

import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDialog } from '@/qComponents';
import type { QDialogOptions } from '@/qComponents';
import { QDialogContainer } from '@/qComponents/QDialog/src/QDialogContainer';

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

          console.log('resolve', result);
        } catch (result) {
          console.log('reject', result);
        }
      };

      return { handleClick };
    },
    template: '<q-button @click="handleClick">Click to open dialog</q-button>'
  });

export const Component = QDialogComponentStory.bind({});
export default storyMetadata;

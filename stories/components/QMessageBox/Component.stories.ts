import type { Story, Meta } from '@storybook/vue3';
import { defineComponent, defineAsyncComponent } from 'vue';

import { QMessageBoxContent, useMessageBox } from '@/qComponents/QMessageBox';

const storyMetadata: Meta = {
  title: 'Components/QMessageBox',
  component: QMessageBoxContent
};

const QMessageBoxComponentStory: Story<never> = () =>
  defineComponent({
    setup() {
      const handleClick = async (): Promise<void> => {
        try {
          const result = await useMessageBox(
            defineAsyncComponent(() => import('./MessageBoxFormTest.vue')),
            { distinguishCancelAndClose: true }
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

export const Component = QMessageBoxComponentStory.bind({});

export default storyMetadata;

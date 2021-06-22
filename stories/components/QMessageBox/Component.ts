import type { Story } from '@storybook/vue3';
import { defineComponent, defineAsyncComponent } from 'vue';

import { useMessageBox } from '@/qComponents/QMessageBox';

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

QMessageBoxComponentStory.storyName = 'Component';

export default QMessageBoxComponentStory;

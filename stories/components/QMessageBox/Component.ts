// eslint-disable-next-line import/no-extraneous-dependencies
import type { Story } from '@storybook/vue3';
import { defineComponent, defineAsyncComponent, ref } from 'vue';

import type { QMessageBoxProps } from '@/qComponents/QMessageBox';

const QMessageBoxComponentStory: Story<QMessageBoxProps> = () =>
  defineComponent({
    components: {
      MessageBoxFormTest: defineAsyncComponent(
        () => import('./MessageBoxFormTest.vue')
      )
    },
    setup() {
      const isVisible = ref(false);

      const handleClick = async (): Promise<void> => {
        isVisible.value = true;
      };

      return { isVisible, handleClick };
    },
    template: `
      <q-button @click="handleClick">Click to open</q-button>

      <message-box-form-test v-model:isVisible="isVisible"/>
    `
  });

QMessageBoxComponentStory.storyName = 'Component';

export default QMessageBoxComponentStory;

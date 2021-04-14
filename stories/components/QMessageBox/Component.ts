// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { defineComponent, defineAsyncComponent, ref } from 'vue';

const QMessageBoxComponentStory: Story = () =>
  defineComponent({
    components: {
      MessageBoxFormTest: defineAsyncComponent(
        () => import('./MessageBoxFormTest.vue')
      )
    },
    setup() {
      const isVisible = ref(false);

      const handleClick = async () => {
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

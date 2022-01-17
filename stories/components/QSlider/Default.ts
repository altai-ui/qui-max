import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

const QSliderStory: Story = args =>
  defineComponent({
    setup() {
      const value = ref<string>('easy');

      return {
        args,
        value
      };
    },

    template: `
      <q-slider
        v-model="value"
        v-bind="args"
      />
    `
  });

QSliderStory.args = {
  data: [
    {
      value: 'easy',
      label: 'Легкий уровень'
    },
    {
      value: 'normal',
      label: 'Средний уровень'
    },
    {
      value: 'hard',
      label: 'Тяжелый уровень'
    }
  ]
};

export default QSliderStory;

import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import type { QSliderPropData } from '@/qComponents/QSlider';

const QSliderStory: Story = args =>
  defineComponent({
    setup() {
      const value = ref<number>(0);

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

const data: QSliderPropData<number> = Array(100)
  .fill(null)
  .map((_, index) => ({
    value: index,
    label: index === 0 || index === 99 ? String(index) : undefined
  }));

QSliderStory.args = {
  data
};

export default QSliderStory;

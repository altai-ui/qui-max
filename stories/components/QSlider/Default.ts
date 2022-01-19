import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import { t } from '@/qComponents/locale';

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
      label: t('qSlider.easyLevel')
    },
    {
      value: 'normal',
      label: t('qSlider.mediumlevel')
    },
    {
      value: 'hard',
      label: t('qSlider.hardLevel')
    }
  ]
};

export default QSliderStory;

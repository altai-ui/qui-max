import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import { t } from '@/qComponents/locale';
import type {
  QSliderPropModelValue,
  QSliderPropData
} from '@/qComponents/QSlider';

type ModelValue = 'easy' | 'normal' | 'hard';

const QSliderStory: Story = args =>
  defineComponent({
    setup() {
      const value = ref<QSliderPropModelValue<ModelValue>>('easy');

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

const data: QSliderPropData = [
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
];

QSliderStory.args = {
  data
};

export default QSliderStory;

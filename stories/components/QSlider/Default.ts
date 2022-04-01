import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import { t } from '@/qComponents/locale';
import type {
  QSliderPropModelValue,
  QSliderPropData
} from '@/qComponents/QSlider';

type ModelValue = QSliderPropModelValue<'easy' | 'normal' | 'hard'>;

const QSliderStory: Story = args =>
  defineComponent({
    setup() {
      const value = ref<ModelValue>('easy');

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

const data: QSliderPropData<ModelValue> = [
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

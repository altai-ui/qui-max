import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import { t } from '@/qComponents/locale';
import type {
  QSliderPropModelValue,
  QSliderPropData
} from '@/qComponents/QSlider';

type ModelValue = QSliderPropModelValue<'easy' | 'normal' | 'hard'>;

type SlotDataTest = {
  description: string;
};

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
      >
        <template #caption="{ label, data }">
          <div style="margin: 0; font-size: 14px; line-height: 18px;">{{ label }}</div>
          <div style="margin-top: 4px; font-size: 10px; line-height: 12px;">{{ data?.description }}</div>
        </template>
      </q-slider>
    `
  });

const data: QSliderPropData<ModelValue, SlotDataTest> = [
  {
    value: 'easy',
    label: t('qSlider.easyLevel'),
    style: {
      width: '100px'
    },
    slotData: {
      description: t('qSlider.captionDescription')
    }
  },

  {
    value: 'normal',
    label: t('qSlider.mediumlevel'),
    style: "width: '127px'",
    slotData: {
      description: t('qSlider.captionDescription')
    }
  },

  {
    value: 'hard',
    label: t('qSlider.hardLevel'),
    style: {
      width: '135px'
    },
    slotData: {
      description: t('qSlider.captionDescription')
    }
  }
];

QSliderStory.args = {
  disabled: false,
  data
};

export default QSliderStory;

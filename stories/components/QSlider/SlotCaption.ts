import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import { t } from '@/qComponents/locale';

const QSliderStory: Story = args =>
  defineComponent({
    setup() {
      const value = ref<string>('mac');

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

QSliderStory.args = {
  disabled: true,
  data: [
    {
      value: 'mac',
      label: t('qSlider.easyLevel'),
      style: {
        width: '100px'
      },
      slotData: {
        description: t('qSlider.captionDescription')
      }
    },

    {
      value: 'phone',
      label: t('qSlider.mediumlevel'),
      style: {
        width: '127px'
      },
      slotData: {
        description: t('qSlider.captionDescription')
      }
    },

    {
      value: 'sms',
      label: t('qSlider.hardLevel'),
      style: {
        width: '135px'
      },
      slotData: {
        description: t('qSlider.captionDescription')
      }
    }
  ]
};

export default QSliderStory;

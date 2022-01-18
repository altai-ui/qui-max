import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

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
  data: [
    {
      value: 'mac',
      label: 'Валидные мак-адреса',
      style: {
        width: '100px'
      },
      slotData: {
        title: 'Валидные мак-адреса',
        description: 'Данные пригодные для рекламы'
      }
    },

    {
      value: 'phone',
      label: 'Есть номер телефона',
      style: {
        width: '127px'
      },
      slotData: {
        title: 'Есть номер телефона',
        description: 'Зарегистрирован в базе ГПМ Дата'
      }
    },

    {
      value: 'sms',
      label: 'Есть разрешение на смс',
      style: {
        width: '135px'
      },
      slotData: {
        title: 'Есть разрешение на смс',
        description: 'Подтвержденное согласие на рассылки'
      }
    }
  ]
};

export default QSliderStory;

import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

const QSliderStory: Story = args =>
  defineComponent({
    setup() {
      const value = ref(50);

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
          <h3 style="margin: 0;">{{ label }}</h3>
          <div style="margin-top: 4px;">{{ data?.description }}</div>
        </template>
      </q-slider>
    `
  });

QSliderStory.args = {
  data: [
    {
      label: 'Валидные мак-адреса',
      value: 'mac',
      slotData: {
        title: 'Валидные мак-адреса',
        description: 'Данные пригодные для рекламы'
      }
    },

    {
      label: 'Есть номер телефона',
      value: 'phone',
      slotData: {
        title: 'Есть номер телефона',
        description: 'Зарегистрирован в базе ГПМ Дата'
      }
    },

    {
      label: 'Есть разрешение на смс',
      value: 'sms',
      slotData: {
        title: 'Есть разрешение на смс',
        description: 'Подтвержденное согласие на рассылки'
      }
    },
  ]
};

export default QSliderStory;

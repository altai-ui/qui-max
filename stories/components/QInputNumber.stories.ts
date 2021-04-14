// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QInputNumber from '@/qComponents/QInputNumber';

export default {
  title: 'Components/QInputNumber',
  component: QInputNumber,
  argTypes: {
    modelValue: { control: { type: 'none' } },
    placeholder: { control: { type: 'text' } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } }
  }
};

export const QInputNumberStory: Story = args =>
  defineComponent({
    setup() {
      const numberValue = ref('2');

      const handleEmit = (value: number, type: string) => {
        console.log(value, type);
      };

      return { args, numberValue, handleEmit };
    },

    template: `
      <q-input-number
        v-model="numberValue"
        :precision="args.precision"
        :disabled="args.disabled"
        :no-controls="args.noControls"
        :validate-event="args.validateEvent"
        @input="handleEmit($event, 'input')"
        @change="handleEmit($event, 'change')"
      />
    `
  });

QInputNumberStory.storyName = 'Default';

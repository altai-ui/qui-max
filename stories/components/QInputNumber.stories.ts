import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import { QInputNumber } from '@/qComponents/QInputNumber';
import type { QInputNumberProps } from '@/qComponents/QInputNumber';

const storyMetadata: Meta = {
  title: 'Components/QInputNumber',
  component: QInputNumber,
  argTypes: {
    modelValue: { control: { type: 'none' } },
    placeholder: { control: { type: 'text' } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    prefix: { control: { type: 'text' } },
    suffix: { control: { type: 'text' } },
    precision: { control: { type: 'number', min: 0 } }
  }
};

const Template: Story<QInputNumberProps> = args =>
  defineComponent({
    setup() {
      const numberValue = ref<number>(1234567.89);

      const handleEmit = (value: string, type: string): void => {
        console.log(value, type);
      };

      return { args, numberValue, handleEmit };
    },

    template: `
      <div style="width:300px">
        <q-input-number
          v-model="numberValue"
          :min="args.min"
          :max="args.max"
          :placeholder="args.placeholder"
          :precision="args.precision"
          :disabled="args.disabled"
          :validate-event="args.validateEvent"
          :prefix="args.prefix"
          :suffix="args.suffix"
          @input="handleEmit($event, 'input')"
          @change="handleEmit($event, 'change')"
        />
      </div>
    `
  });

export const Default = Template.bind({});
export const Disabled = Template.bind({});
export const PositiveOnly = Template.bind({});
export const WithPrecision = Template.bind({});

Default.args = {};

Disabled.args = {
  disabled: true
};

PositiveOnly.args = {
  min: 0
};

WithPrecision.args = {
  precision: 2
};

export default storyMetadata;

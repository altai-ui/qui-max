import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QInputNumber from '@/qComponents/QInputNumber';
import type { QInputNumberProps } from '@/qComponents/QInputNumber';

const storyMetadata: Meta = {
  title: 'Components/QInputNumber',
  component: QInputNumber,
  argTypes: {
    modelValue: { control: { type: 'none' } },
    placeholder: { control: { type: 'text' } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
    precision: { control: { type: 'number', min: 0 } },
    localization: { control: { disable: true } }
  }
};

const QInputNumberStory: Story<QInputNumberProps> = args =>
  defineComponent({
    setup() {
      const numberValue = ref<string>('1234');

      const handleEmit = (value: number, type: string): void => {
        // eslint-disable-next-line no-console
        console.log(value, type);
      };

      return { args, numberValue, handleEmit };
    },

    template: `
      <div style="width:300px">
        <q-input-number
          v-model="numberValue"
          :prefix="args.prefix"
          :suffix="args.suffix"
          :step="args.step"
          :min="args.min"
          :max="args.max"
          :useGrouping="args.useGrouping"
          :placeholder="args.placeholder"
          :precision="args.precision"
          :disabled="args.disabled"
          :localization="args.localization"
          :no-controls="args.noControls"
          :validate-event="args.validateEvent"
          @input="handleEmit($event, 'input')"
          @change="handleEmit($event, 'change')"
        />
      </div>
    `
  });

export const Default = QInputNumberStory.bind({});
export default storyMetadata;

import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QInputNumberNew from '@/qComponents/QInputNumberNew';
import type { QInputNumberNewProps } from '@/qComponents/QInputNumberNew';

const storyMetadata: Meta = {
  title: 'Components/QInputNumberNew',
  component: QInputNumberNew,
  argTypes: {
    modelValue: { control: { type: 'none' } },
    placeholder: { control: { type: 'text' } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    precision: { control: { type: 'number', min: 0 } }
  }
};

const QInputNumberNewStory: Story<QInputNumberNewProps> = args =>
  defineComponent({
    setup() {
      const numberValue = ref<string>('1234');

      const handleEmit = (value: string, type: string): void => {
        console.log(value, type);
      };

      return { args, numberValue, handleEmit };
    },

    template: `
      <div style="width:300px">
        <q-input-number-new
          v-model="numberValue"
          :min="args.min"
          :max="args.max"
          :placeholder="args.placeholder"
          :precision="args.precision"
          :disabled="args.disabled"
          :validate-event="args.validateEvent"
          @input="handleEmit($event, 'input')"
          @change="handleEmit($event, 'change')"
        />
      </div>
    `
  });

export const Default = QInputNumberNewStory.bind({});
export default storyMetadata;

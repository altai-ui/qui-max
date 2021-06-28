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
    step: { control: { type: 'number' } }
  }
};

const QInputNumberStory: Story<QInputNumberProps> = args =>
  defineComponent({
    setup() {
      const numberValue = ref<string>('1124');
      const useGrouping = ref<boolean>(true);
      const precision = ref<number>(2);

      const handleEmit = (value: number, type: string): void => {
        // eslint-disable-next-line no-console
        console.log(value, type);
      };

      return { args, numberValue, useGrouping, precision, handleEmit };
    },

    template: `
      <q-input-number
        v-model="numberValue"
        :precision="precision"
        :disabled="args.disabled"
        :use-grouping="useGrouping"
        prefix=">"
        suffix="<"
        :no-controls="args.noControls"
        :validate-event="args.validateEvent"
        @input="handleEmit($event, 'input')"
        @change="handleEmit($event, 'change')"
      />
    `
  });

export const Default = QInputNumberStory.bind({});
export default storyMetadata;

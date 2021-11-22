import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QRadioGroup from '@/qComponents/QRadioGroup';
import QRadio from '@/qComponents/QRadio';
import type { QRadioGroupProps } from '@/qComponents/QRadioGroup';

const storyMetadata: Meta = {
  title: 'Components/QRadioGroup',
  component: QRadioGroup,
  subcomponents: { QRadio },
  argTypes: {
    modelValue: { control: { type: 'none' } },
    direction: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' }
    }
  }
};

const QRadioGroupStory: Story<QRadioGroupProps> = args =>
  defineComponent({
    components: { QRadio, QRadioGroup },
    setup() {
      const value = ref<number>(1);
      const handleChange = (modelValue: number): void => {
        console.log(modelValue, 'change');
      };

      return { value, args, handleChange };
    },
    template: `
      <q-radio-group
        v-model="value"
        :direction="args.direction"
        :disabled="args.disabled"
        :tag="args.tag"
        @change="handleChange"
      >
        <q-radio :value="1" label="Option A" />
        <q-radio :value="2" label="Option B" />
        <q-radio :value="3" label="Option C" />
      </q-radio-group>
    `
  });

export const Default = QRadioGroupStory.bind({});
export default storyMetadata;

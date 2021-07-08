import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QRadio from '@/qComponents/QRadio';
import type { QRadioProps } from '@/qComponents/QRadio';

const storyMetadata: Meta = {
  title: 'Components/QRadio',
  component: QRadio,
  argTypes: {
    checked: { control: { type: 'none' } },
    value: { control: { type: 'none' } },
    label: { control: 'text' }
  }
};

const QRadioStory: Story<QRadioProps> = args =>
  defineComponent({
    components: { QRadio },
    setup() {
      const radio1 = ref<number>(1);
      const radio2 = ref<number>(1);
      const handleChange = (value: number): void => {
        // eslint-disable-next-line no-console
        console.log(value, 'change');
        radio1.value = value;
      };

      return { radio1, radio2, args, handleChange };
    },
    template: `
      <div>
        <q-radio
          :checked="radio1 === 1"
          :value="1"
          :label="args.label"
          :disabled="args.disabled"
          :name="args.name"
          @change="handleChange"
        />
        <br /><br />
        <q-radio
          :checked="radio1 === 2"
          :value="2"
          label="Option B"
          @change="handleChange"
        />
        <br /><br />
        <q-radio
          :checked="radio1 === 3"
          :value="3"
          label="Option C"
          @change="handleChange"
        />
        <br /><br />
        <q-radio
          :checked="radio1 === 4"
          :value="4"
          disabled
          label="Disabled"
          @change="handleChange"
        />
        <br /><br />
        <q-radio
          :checked="radio2 === 1"
          :value="1"
          disabled
          label="Checked & disabled"
          @change="radio2 = $event"
        />
      </div>
    `
  });

export const Default = QRadioStory.bind({});
Default.args = {
  label: 'Option A'
};

export default storyMetadata;

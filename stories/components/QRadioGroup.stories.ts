// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QRadioGroup from '@/qComponents/QRadioGroup';
import QRadio from '@/qComponents/QRadio';

export default {
  title: 'Components/QRadio/QRadioGroup',
  component: QRadioGroup,
  subcomponents: { QRadio },
  argTypes: {
    modelValue: { control: { type: 'none' } },
    direction: {
      control: { type: 'inline-radio', options: ['vertical', 'horizontal'] }
    }
  }
};

export const QRadioGroupStory: Story = args =>
  defineComponent({
    components: { QRadio, QRadioGroup },
    setup() {
      const value = ref(3);

      return { value, args };
    },
    template: `
      <q-radio-group
        v-model="value"
        :direction="args.direction"
        :disabled="args.disabled"
        :tag="args.tag"
      >
        <q-radio :value="3" label="Option A" />
        <q-radio :value="6" label="Option B" />
        <q-radio :value="9" label="Option C" />
      </q-radio-group>
    `
  });

QRadioGroupStory.storyName = 'Default';

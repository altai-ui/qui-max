import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import { QSwitch } from '@/qComponents';
import type { QSwitchProps } from '@/qComponents/QSwitch';

const storyMetadata: Meta = {
  title: 'Components/QSwitch',
  component: QSwitch,

  argTypes: {
    modelValue: { control: { type: 'none' } },
    validateEvent: { control: { type: 'none' } },
    activeValue: { control: { type: 'text' } },
    inactiveValue: { control: { type: 'text' } }
  }
};

const QSwitchStory: Story<QSwitchProps> = args =>
  defineComponent({
    setup() {
      const isOn = ref(true);

      return {
        args,
        isOn
      };
    },

    template: `
        <q-switch v-model="isOn" :loading="args.loading" :disabled="args.disabled" :active-value="args.activeValue" :inactive-value="args.inactiveValue"  />
        `
  });

export const Default = QSwitchStory.bind({});
export default storyMetadata;

import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import { QSwitcher } from '@/qComponents';
import type { QSwitcherProps } from '@/qComponents/QSwitcher';

const storyMetadata: Meta = {
  title: 'Components/QSwitcher',
  component: QSwitcher,

  argTypes: {
    modelValue: { control: { type: 'none' } },
    validateEvent: { control: { type: 'none' } },
    activeValue: { control: { type: 'text' } },
    inactiveValue: { control: { type: 'text' } }
  }
};

const QSwitcherStory: Story<QSwitcherProps> = args =>
  defineComponent({
    setup() {
      const isOn = ref(true);

      return {
        args,
        isOn
      };
    },

    template: `
        <q-switcher v-model="isOn" :loading="args.loading" :disabled="args.disabled" :active-value="args.activeValue" :inactive-value="args.inactiveValue"  />
        `
  });

export const Default = QSwitcherStory.bind({});
export default storyMetadata;

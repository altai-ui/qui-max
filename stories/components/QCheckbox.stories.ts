// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QCheckbox from '@/qComponents/QCheckbox';

export default {
  title: 'Components/QCheckbox/QCheckbox',
  component: QCheckbox,
  argTypes: {
    modelValue: { control: { type: 'none' } }
  }
};

const Template: Story = args =>
  defineComponent({
    components: { QCheckbox },
    setup() {
      const isChecked = ref(true);

      return {
        isChecked,
        args
      };
    },

    template: `
      <q-checkbox
        v-model="isChecked"
        :label="args.label"
        :indeterminate="args.indeterminate"
        :disabled="args.disabled"
        :rootTag="args.rootTag"
      />
    `
  });

export const Default: Story = Template.bind({});
Default.args = {
  label: 'Option A'
};

export const Disabled: Story = Template.bind({});
Disabled.args = {
  label: 'Option A',
  disabled: true
};

export const Indeterminate: Story = Template.bind({});
Indeterminate.args = {
  label: 'Option A',
  indeterminate: true
};

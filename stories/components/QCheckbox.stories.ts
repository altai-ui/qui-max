// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QCheckbox from '@/qComponents/QCheckbox';
import type { QCheckboxProps } from '@/qComponents/QCheckbox';

const storyMetadata: Meta = {
  title: 'Components/QCheckbox/QCheckbox',
  component: QCheckbox,
  argTypes: {
    modelValue: { control: { type: 'none' } }
  }
};

const Template: Story<QCheckboxProps> = args =>
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

const Default: Story<QCheckboxProps> = Template.bind({});
Default.args = {
  label: 'Option A'
};

const Disabled: Story<QCheckboxProps> = Template.bind({});
Disabled.args = {
  label: 'Option A',
  disabled: true
};

const Indeterminate: Story<QCheckboxProps> = Template.bind({});
Indeterminate.args = {
  label: 'Option A',
  indeterminate: true
};

export { Default, Disabled, Indeterminate };
export default storyMetadata;

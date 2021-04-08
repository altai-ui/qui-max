import { ref } from 'vue';
import QCheckbox from '@/qComponents/QCheckbox';

export default {
  title: 'Components/QCheckbox/QCheckbox',
  component: QCheckbox,
  argTypes: {
    modelValue: { control: { type: 'none' } }
  }
};

const Template = (args: any) => ({
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

export const Default: any = Template.bind({});
Default.args = {
  label: 'Option A'
};

export const Disabled: any = Template.bind({});
Disabled.args = {
  label: 'Option A',
  disabled: true
};

export const Indeterminate: any = Template.bind({});
Indeterminate.args = {
  label: 'Option A',
  indeterminate: true
};

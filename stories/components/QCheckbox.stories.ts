import { ref } from 'vue';
import QCheckbox from '@/qComponents/QCheckbox';

export default {
  title: 'Components/QCheckbox/QCheckbox',
  component: QCheckbox,
  argTypes: {
    modelValue: { control: { type: 'none' } },
  }
};

const Template = (args: any) => ({
  components: { QCheckbox },
  setup() {
    const checked1 = ref(true);

    return {
      checked1,
      args
    }
  },
  
  template: `
    <q-checkbox
      v-model="checked1"
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

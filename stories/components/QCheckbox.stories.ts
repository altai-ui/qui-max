import { ref } from 'vue';
import QCheckbox from '@/qComponents/QCheckbox';

export default {
  title: 'Components/QCheckbox/QCheckbox',
  component: QCheckbox,
  argTypes: {
    'v-model': { control: { type: 'none' } },
    value: { control: { type: 'none' } }
  }
};

const Template = (args: any) => ({
  setup() {
    const checked1 = ref(true);
    const checked2 = ref(false);
    const checked3 = ref(false);
    const checked4 = ref(false);
    const checked5 = ref(true);

    return {
      checked1,
      checked2,
      checked3,
      checked4,
      checked5
    }
  },

  data() {
    return {
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: true,
      args
    };
  },
  
  template: `
    <div>
      <q-checkbox v-model="checked1" v-bind="args" />
      <br /><br />
      <q-checkbox v-model="checked2" label="Option B" />
      <br /><br />
      <q-checkbox v-model="checked3" label="Option C" />
      <br /><br />
      <q-checkbox
        v-model="checked4"
        label="Disabled"
        disabled
      />
      <br /><br />
      <q-checkbox
        v-model="checked5"
        label="Checked & Disabled"
        disabled
      />
    </div>
  `
});

export const QCheckboxStory: any = Template.bind({});
QCheckboxStory.args = {
  label: 'Option A'
};

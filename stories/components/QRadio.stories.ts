import { ref } from 'vue';

import QRadio from '@/qComponents/QRadio';

export default {
  title: 'Components/QRadio/QRadio',
  component: QRadio,
  argTypes: {
    modelValue: { control: { type: 'none' } },
    value: { control: { type: 'none' } },
    label: { control: 'text' }
  }
};

export const QRadioStory = (args: unknown): unknown => ({
  components: { QRadio },
  setup() {
    const radio1 = ref('1');
    const radio2 = ref('1');

    return { radio1, radio2, args };
  },
  template: `
    <div>
      <q-radio
        v-model="radio1"
        value="1"
        :label="args.label"
        :disabled="args.disabled"
        :name="args.name"
      />
      <br /><br />
      <q-radio
        v-model="radio1"
        value="2"
        label="Option B"
      />
      <br /><br />
      <q-radio
        v-model="radio1"
        value="3"
        label="Option C"
      />
      <br /><br />
      <q-radio
        v-model="radio1"
        disabled
        value="4"
        label="Disabled"
      />
      <br /><br />
      <q-radio
        v-model="radio2"
        disabled
        value="1"
        label="Checked & disabled"
      />
    </div>
  `
});

QRadioStory.storyName = 'Default';
QRadioStory.args = {
  label: 'Option A'
};

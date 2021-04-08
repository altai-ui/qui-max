import { ref } from 'vue';

import QRadio from '@/qComponents/QRadio';

export default {
  title: 'Components/QRadio/QRadio',
  component: QRadio,
  argTypes: {
    value: { control: { type: 'none' } },
    label: { control: 'text' }
  }
};

export const QRadioStory = (args: unknown): unknown => ({
  components: { QRadio },
  setup() {
    const radio1 = ref(1);
    const radio2 = ref(1);

    return { radio1, radio2, args };
  },
  template: `
    <div>
      <q-radio
        :checked="radio1 === 1"
        :value="1"
        :label="args.label"
        :disabled="args.disabled"
        :name="args.name"
        @change="radio1 = $event"
      />
      <br /><br />
      <q-radio
        :checked="radio1 === 2"
        :value="2"
        label="Option B"
        @change="radio1 = $event"
      />
      <br /><br />
      <q-radio
        :checked="radio1 === 3"
        :value="3"
        label="Option C"
        @change="radio1 = $event"
      />
      <br /><br />
      <q-radio
        :checked="radio1 === 4"
        :value="4"
        disabled
        label="Disabled"
        @change="radio1 = $event"
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

QRadioStory.storyName = 'Default';
QRadioStory.args = {
  label: 'Option A'
};

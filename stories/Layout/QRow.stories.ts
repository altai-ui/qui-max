// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';

import QRow from '@/qComponents/QRow';
import QCol from '@/qComponents/QCol';
import './layout.scss';

export default {
  title: 'Components/Layout/QRow',
  component: QRow,
  subcomponents: { QCol },
  argTypes: {
    alignV: {
      control: {
        type: 'select',
        options: [null, 'start', 'end', 'center', 'baseline', 'stretch']
      }
    },
    alignH: {
      control: {
        type: 'select',
        options: [null, 'start', 'end', 'center', 'between', 'around']
      }
    }
  }
};

export const QRowStory: Story = args => ({
  components: { QRow, QCol },
  setup() {
    return { args };
  },
  template: `
    <div class="demo">
      <q-row
        class="demo__row"
        :align-v="args.alignV"
        :align-h="args.alignH"
        :tag="args.tag"
      >
        <q-col class="demo-col" cols="2">
          <div class="demo__content">2</div>
        </q-col>

        <q-col class="demo__col" cols="4">
          <div class="demo__content" style="height: 25px;">4</div>
        </q-col>

        <q-col class="demo__col" cols="2">
          <div class="demo__content">2</div>
        </q-col>
      </q-row>
    </div>
  `
});

QRowStory.storyName = 'Default';
QRowStory.args = {
  tag: 'div'
};

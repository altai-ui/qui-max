// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';

import QRow from '@/qComponents/QRow';
import QCol from '@/qComponents/QCol';
import './layout.scss';

export default {
  title: 'Components/Layout/QCol',
  component: QCol,
  subcomponents: { QRow },
  argTypes: {
    cols: {
      control: {
        type: 'select',
        options: [null, 'auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },
    offset: {
      control: {
        type: 'select',
        options: [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    }
  }
};

export const QColStory: Story = args => ({
  components: { QRow, QCol },
  setup() {
    return { args };
  },
  template: `
    <div class="demo">
      <q-row class="demo__row">
        <q-col class="demo__col" cols="2">
          <div class="demo__content">2</div>
        </q-col>

        <q-col
          class="demo__col"
          :tag="args.tag"
          :cols="args.cols"
          :offset="args.offset"
        >
          <div class="demo__content">dyn</div>
        </q-col>

        <q-col class="demo__col" cols="2">
          <div class="demo__content">2</div>
        </q-col>
      </q-row>
    </div>
  `
});

QColStory.storyName = 'Default';
QColStory.args = {
  tag: 'div',
  cols: 5,
  offset: 3
};

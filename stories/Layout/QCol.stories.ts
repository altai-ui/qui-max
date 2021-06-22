// eslint-disable-next-line import/no-extraneous-dependencies
import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import QRow from '@/qComponents/QRow';
import QCol from '@/qComponents/QCol';
import type { QColProps } from '@/qComponents/QCol';
import './layout.scss';

const storyMetadata: Meta = {
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

const QColStory: Story<QColProps> = args =>
  defineComponent({
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

export const Default = QColStory.bind({});
Default.args = {
  tag: 'div',
  cols: 5,
  offset: 3
};
export default storyMetadata;

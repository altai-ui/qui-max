import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import { QCol } from '@/qComponents/QCol';
import { QRow } from '@/qComponents/QRow';
import type { QRowProps } from '@/qComponents/QRow';
import './layout.scss';

const storyMetadata: Meta = {
  title: 'Components/Layout/QRow',
  component: QRow,
  subcomponents: { QCol },
  argTypes: {
    alignV: {
      options: [null, 'start', 'end', 'center', 'baseline', 'stretch'],
      control: { type: 'select' }
    },
    alignH: {
      options: [null, 'start', 'end', 'center', 'between', 'around'],
      control: { type: 'select' }
    }
  }
};

const QRowStory: Story<QRowProps> = args =>
  defineComponent({
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

export const Default = QRowStory.bind({});
QRowStory.args = {
  tag: 'div'
};
export default storyMetadata;

// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QTabPane from '@/qComponents/QTabPane';
import QTabs from '@/qComponents/QTabs';
import type { QTabPaneProps } from '@/qComponents/QTabPane';

const storyMetadata: Meta = {
  title: 'Components/QTabs/QTabPane',
  component: QTabPane,
  subcomponents: { QTabs },
  argTypes: {
    width: { control: { type: 'number' } }
  }
};

const QTabPaneStory: Story<QTabPaneProps> = args =>
  defineComponent({
    components: { QTabs, QTabPane },
    setup() {
      const activeTab = ref('first_tab');

      return { args, activeTab };
    },
    template: `
      <q-tabs v-model="activeTab">
        <q-tab-pane
          :width="args.width"
          :name="args.name"
          :title="args.title"
          :description="args.description"
          :disabled="args.disabled"
        />
        <q-tab-pane
          name="second_tab"
          title="Second tab"
        />
        <q-tab-pane
          name="third_tab"
          title="Third tab"
        />
      </q-tabs>
    `
  });

QTabPaneStory.storyName = 'Default';
QTabPaneStory.args = {
  name: 'first_tab',
  title: 'First tab',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
};

export { QTabPaneStory };
export default storyMetadata;

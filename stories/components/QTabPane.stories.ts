// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { ref } from 'vue';

import QTabPane from '@/qComponents/QTabPane';
import QTabs from '@/qComponents/QTabs';

export default {
  title: 'Components/QTabs/QTabPane',
  component: QTabPane,
  subcomponents: { QTabs },
  argTypes: {
    width: { control: { type: 'number' } }
  }
};

export const QTabPaneStory: Story = args => ({
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

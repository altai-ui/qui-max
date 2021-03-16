import { ref } from 'vue';

import QTabPane from '@/qComponents/QTabPane';
import QTabs from '@/qComponents/QTabs';

export default {
  title: 'Components/QTabs/QTabPane',
  component: QTabPane,
  subcomponents: { QTabs },
  argTypes: { width: { control: { type: 'number' } } }
};

const Template = (args: any) => ({
  components: { QTabs, QTabPane },
  setup() {
    const activeTab = ref('first_tab');

    return { args, activeTab };
  },
  template: `
    <q-tabs v-model="activeTab">
      <q-tab-pane v-bind="args" />
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

export const QTabPaneStory: any = Template.bind({});
QTabPaneStory.storyName = 'Default';
QTabPaneStory.args = {
  name: 'first_tab',
  title: 'First tab',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
};

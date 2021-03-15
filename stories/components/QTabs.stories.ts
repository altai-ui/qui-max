import { ref } from 'vue';

import QTabs from '../../src/qComponents/QTabs';
import QTabPane from '../../src/qComponents/QTabPane';

export default {
  title: 'Components/QTabs/QTabs',
  component: QTabs,
  subcomponents: { QTabPane },
  sd: QTabs,
  argTypes: {
    modelValue: { control: { type: 'none' } },
    tabWidth: { control: { type: 'number' } }
  }
};

const Template = args => ({
  components: { QTabs, QTabPane },
  setup() {
    const activeTab = ref('first_tab');

    return { args, activeTab };
  },
  template: `
    <q-tabs
      v-bind="args"
      v-model="activeTab"
    >
      <q-tab-pane
        name="first_tab"
        title="First tab"
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

export const QTabsStory = Template.bind({});
QTabsStory.storyName = 'Default';

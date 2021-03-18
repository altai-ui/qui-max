import { ref } from 'vue';

import QTabs from '@/qComponents/QTabs';
import QTabPane from '@/qComponents/QTabPane';

export default {
  title: 'Components/QTabs/QTabs',
  component: QTabs,
  subcomponents: { QTabPane },
  argTypes: {
    modelValue: { control: { type: 'none' } },
    tabWidth: { control: { type: 'number' } }
  }
};

const Template = (args: any) => ({
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

export const QTabsStory: any = Template.bind({});
QTabsStory.storyName = 'Default';

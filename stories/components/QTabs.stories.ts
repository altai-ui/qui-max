import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QTabs from '@/qComponents/QTabs';
import QTabPane from '@/qComponents/QTabPane';
import type { QTabsProps } from '@/qComponents/QTabs';

const storyMetadata: Meta = {
  title: 'Components/QTabs',
  component: QTabs,
  subcomponents: { QTabPane },
  argTypes: {
    modelValue: { control: { type: 'none' } },
    tabWidth: { control: { type: 'number' } }
  }
};

const QTabsStory: Story<QTabsProps> = args =>
  defineComponent({
    components: { QTabs, QTabPane },
    setup() {
      const activeTab = ref<string>('first_tab');

      return { args, activeTab };
    },
    template: `
      <q-tabs
        v-model="activeTab"
        :tab-width="args.tabWidth"
        :disabled="args.disabled"
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

export const Default = QTabsStory.bind({});
export default storyMetadata;

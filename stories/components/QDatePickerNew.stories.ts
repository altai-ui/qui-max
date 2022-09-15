import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import { QDatePickerNew } from '@/qComponents/QDatePickerNew';

const storyMetadata: Meta = {
  title: 'Components/QDatePickerNew',
  component: QDatePickerNew
};

const Template: Story = () =>
  defineComponent({
    components: { QDatePickerNew },
    template: `
    <div style="width: 220px; height:300px">
      <q-date-picker-new />
    </div>
    `
  });

export const Default = Template.bind({});

export default storyMetadata;

import type { Story, Meta } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QCheckboxGroup from '@/qComponents/QCheckboxGroup';
import QCheckbox from '@/qComponents/QCheckbox';
import type { QCheckboxGroupProps } from '@/qComponents/QCheckboxGroup';

const storyMetadata: Meta = {
  title: 'Components/QCheckbox/QCheckboxGroup',
  component: QCheckboxGroup,
  argTypes: {
    direction: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' }
    }
  }
};

const QCheckboxGroupStory: Story<QCheckboxGroupProps> = args =>
  defineComponent({
    components: { QCheckboxGroup, QCheckbox },
    setup() {
      const checkedCities = ref<string[]>(['Shanghai', 'Beijing']);
      const cities = ref<string[]>([
        'Shanghai',
        'Beijing',
        'Guangzhou',
        'Shenzhen'
      ]);

      return { checkedCities, cities, args };
    },

    template: `
      <q-checkbox-group
        v-model="checkedCities"
        :direction="args.direction"
        :min="args.min"
        :max="args.max"
        :disabled="args.disabled"
      >
        <q-checkbox
          v-for="city in cities"
          :key="city"
          :label="city"
        >{{
          city
        }}</q-checkbox>
      </q-checkbox-group>
    `
  });

export const Default = QCheckboxGroupStory.bind({});
Default.args = {
  min: 1,
  max: 3
};

export default storyMetadata;

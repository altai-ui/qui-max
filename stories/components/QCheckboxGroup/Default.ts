// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QCheckboxGroup from '@/qComponents/QCheckboxGroup';
import QCheckbox from '@/qComponents/QCheckbox';

const QCheckboxGroupStory: Story = args =>
  defineComponent({
    components: { QCheckboxGroup, QCheckbox },
    setup() {
      const checkedCities = ref(['Shanghai', 'Beijing']);
      const cities = ref(['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']);

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

QCheckboxGroupStory.storyName = 'Default';
QCheckboxGroupStory.args = {
  min: 1,
  max: 3
};

export default QCheckboxGroupStory;

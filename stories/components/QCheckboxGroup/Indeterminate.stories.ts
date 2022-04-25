import type { Story, Meta } from '@storybook/vue3';
import { defineComponent, ref, watch } from 'vue';

import { QCheckbox } from '@/qComponents/QCheckbox';
import { QCheckboxGroup } from '@/qComponents/QCheckboxGroup';
import type { QCheckboxGroupProps } from '@/qComponents/QCheckboxGroup';

const storyMetadata: Meta = {
  title: 'Components/QCheckboxGroup/Indeterminate',
  component: QCheckboxGroup,
  argTypes: {
    direction: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' }
    }
  }
};

const QCheckboxGroupIndeterminateStory: Story<QCheckboxGroupProps> = args =>
  defineComponent({
    components: { QCheckboxGroup, QCheckbox },
    setup() {
      const areAllChecked = ref<boolean>(false);
      const checkedCities = ref<string[]>(['Option A', 'Option C']);
      const cities = ref<string[]>([
        'Option A',
        'Option B',
        'Option C',
        'Option D'
      ]);
      const isIndeterminate = ref<boolean>(true);

      const handleChange = (value: boolean): void => {
        checkedCities.value = value ? cities.value : [];
        isIndeterminate.value = false;
      };

      watch(checkedCities, value => {
        const checkedCount = value.length;
        areAllChecked.value = checkedCount === cities.value.length;
        isIndeterminate.value =
          checkedCount > 0 && checkedCount < cities.value.length;
      });

      return {
        args,
        areAllChecked,
        checkedCities,
        cities,
        isIndeterminate,
        handleChange
      };
    },
    template: `
      <div>
        <q-checkbox
          v-model="areAllChecked"
          :indeterminate="isIndeterminate"
          @change="handleChange"
        >
          Check all
        </q-checkbox>
        <br/><br/>
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
          >
            {{ city }}
          </q-checkbox>
        </q-checkbox-group>
      </div>
    `
  });

export const Indeterminate = QCheckboxGroupIndeterminateStory.bind({});

export default storyMetadata;

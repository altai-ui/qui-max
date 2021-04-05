import { ref } from 'vue';
import QCheckboxGroup from '@/qComponents/QCheckboxGroup';
import QCheckbox from '@/qComponents/QCheckbox';

const argsValues = {
  min: 0,
  max: 3
};

export default {
  title: 'Components/QCheckbox/QCheckboxGroup',
  component: QCheckboxGroup,
  subcomponents: { QCheckbox },
  argTypes: {
    value: { control: { type: 'none' } },
    min: { control: { type: 'none' } },
    max: { control: { type: 'none' } },
    direction: {
      control: { type: 'inline-radio', options: ['vertical', 'horizontal'] }
    }
  }
};

export const Template = (args: any) => ({
  setup() {
    const checkedCities = ref(['Shanghai', 'Beijing']);
    const cities = ref(['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']);

    return {
      checkedCities,
      cities,
      args
    }
  },
  template: `
    <q-checkbox-group
      v-model="checkedCities"
      v-bind="args"
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

Template.args = argsValues;

export const Indeterminate = (args: any) => ({
  components: { QCheckbox, QCheckboxGroup },
  setup() {
    const checkAll = ref(false);
    const checkedCities = ref(['Option A', 'Option C']);
    const cities = ref(['Option A', 'Option B', 'Option C', 'Option D']);
    const isIndeterminate = ref(true);

    const handleCheckAllChange = (val) => {
      checkedCities.value = val ? cities.value : [];
      isIndeterminate.value = false;
    }

    const handleCheckedCitiesChange = (value) => {
      const checkedCount = value.length;
      checkAll.value = checkedCount === cities.value.length;
      isIndeterminate.value =
        checkedCount > 0 && checkedCount < cities.value.length;
    }

    return {
      args,
      checkAll,
      checkedCities,
      cities,
      isIndeterminate,
      handleCheckAllChange,
      handleCheckedCitiesChange
    }
  },
  template: `
    <div>
      <q-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        style="margin-bottom: 16px"
        @change="handleCheckAllChange"
        :disabled="disabled"
      >
        Check all
      </q-checkbox>

      <q-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
        v-bind="args"
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

Indeterminate.args = argsValues;

import QSelect from '@/qComponents/QSelect';
import QOption from '@/qComponents/QOption';
import { watch, reactive } from 'vue';

export default {
  title: 'Components/QSelect',
  component: QSelect,
  subcomponents: { QOption },
  argTypes: {
    value: { control: { type: 'none' } }
  }
};

const options = [
  {
    value: { value: 'value1' },
    label: 'Option 1'
  },
  {
    value: { value: 'value2' },
    label: 'Option 2'
  },
  {
    value: { value: 'value3' },
    label:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    value: { value: 'value4' },
    label: 'Option 4',
    disabled: true
  },
  {
    value: { value: 'value5' },
    label: 'Sed sit amet nibh consequat, pellentesque arcu ut, congue lorem.',
    disabled: true
  },
  {
    value: { value: 'value6' },
    label: 'Option 6'
  }
];

const Template = (args: any) => ({
  setup() {
    const state = reactive({
      remoteLoading: false,
      value: null,
      options
    })

    watch(() => args.multiple, () => {
      state.value = null;
    })

    watch(() => args.remote, (value) => {
      if(!value) state.options = options;
    })

    const handleSearch = (query: string) => {
      if (!args.remote) return;

      state.remoteLoading = true;

      setTimeout(() => {
        state.remoteLoading = false;

        if (query !== '') {
          state.options = options.filter(item => {
            return item.label.toLowerCase().includes(query.toLowerCase());
          });
        } else {
          state.options = options;
        }
      }, 2000);
    }

    return {
      handleSearch,
      args,
      state
    }
  },

  template: `
    <div style="width: 304px;">
      <q-select
        v-bind="args"
        v-model="state.value"
        :loading="state.remoteLoading"
        @search="handleSearch"
        placeholder="Pick an option"
      >
        <q-option
          v-for="item in state.options"
          :key="item.value.id"
          :label="item.label"
          :model-value="item.value"
          :disabled="item.disabled"
        />
      </q-select>
    </div>
  `
});

export const Default = Template.bind({});

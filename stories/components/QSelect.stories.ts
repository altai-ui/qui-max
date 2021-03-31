import QSelect from '@/qComponents/QSelect'
import QOption from '@/qComponents/QOption';

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
  data() {
    return {
      remoteLoading: false,
      value: null,
      options
    };
  },

  watch: {
    multiple() {
      this.value = null;
    },

    remote(value) {
      if (!value) this.options = options;
    }
  },

  methods: {
    handleSearch(query) {
      if (!this.remote) return;

      this.remoteLoading = true;

      setTimeout(() => {
        this.remoteLoading = false;

        if (query !== '') {
          this.options = options.filter(item => {
            return item.label.toLowerCase().includes(query.toLowerCase());
          });
        } else {
          this.options = options;
        }
      }, 2000);
    }
  },

  template: `
      <div style="width: 304px;">
        <q-select
          v-model="value"
          v-bind="$props"
          :loading="loading || remoteLoading"
          @search="handleSearch"
          placeholder="Pick an option"
        >
          <q-option
            v-for="item in options"
            :key="item.value.id"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </q-select>
      </div>
    `
});

export const Default = Template.bind({});

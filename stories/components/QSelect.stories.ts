import QSelect from '@/qComponents/QSelect';
import QOption from '@/qComponents/QOption';
import { watch, reactive } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Args, Meta, Story } from '@storybook/vue3';

export default <Meta>{
  title: 'Components/QSelect',
  component: QSelect,
  subcomponents: { QOption },
  argTypes: {
    modelValue: { control: { type: 'none' } },
    loading: { control: { type: 'none' } }
  }
};

const options = [
  {
    value: 'value1',
    label: 'Option 1'
  },
  {
    value: 'value2',
    label: 'Option 2'
  },
  {
    value: 'value3',
    label:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    value: 'value4',
    label: 'Option 4',
    disabled: true
  },
  {
    value: 'value5',
    label: 'Sed sit amet nibh consequat, pellentesque arcu ut, congue lorem.',
    disabled: true
  },
  {
    value: 'value6',
    label: 'Option 6'
  }
];

const Template: Story = (args: Args) => ({
  setup() {
    const state = reactive({
      remoteLoading: false,
      value: null,
      options
    });

    watch(
      () => args.multiple,
      () => {
        state.value = null;
      }
    );

    watch(
      () => args.remote,
      value => {
        if (!value) state.options = options;
      }
    );

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
    };

    return {
      handleSearch,
      args,
      state
    };
  },

  template: `
    <div style="width: 304px;">
      <q-select
        v-model="state.value"
        :disabled="args.disabled"
        :autocomplete="args.autocomplete"
        :can-load-more="args.canLoadMore"
        :clearable="args.clearable"
        :filterable="args.filterable"
        :allow-create="args.allowCreate"
        :remote="args.remote"
        :loading-text="args.loadingText"
        :load-more-text="args.loadMoreText"
        :no-match-text="args.noMatchText"
        :no-data-text="args.noDataText"
        :loading="state.remoteLoading"
        :multiple="args.multiple"
        :multiple-limit="args.multipleLimit"
        :select-all-shown="args.selectAllShown"
        :select-all-text="args.selectAllText"
        :value-key="args.valueKey"
        :collapse-tags="args.collapseTags"
        :teleport-to="args.teleportTo"
        placeholder="Pick an option"
        @search="handleSearch"
      >
        <q-option
          v-for="item in state.options"
          :key="item.value"
          :label="item.label"
          :model-value="item.value"
          :disabled="item.disabled"
        />
      </q-select>
    </div>
  `
});

export const Default: any = Template.bind({});
Default.args = {
  ...Default.args,
  filterable: true,
  clearable: true
};
export const Multiple: any = Template.bind({});
Multiple.args = {
  ...Multiple.args,
  multiple: true,
  filterable: true,
  allowCreate: true,
  clearable: true
};

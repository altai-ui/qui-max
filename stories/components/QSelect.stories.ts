import { defineComponent, watch, reactive } from 'vue';
import type { Meta, Story } from '@storybook/vue3';

import QSelect from '@/qComponents/QSelect';
import QOption from '@/qComponents/QOption';
import type { QSelectProps } from '@/qComponents/QSelect';

const storyMetadata: Meta = {
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
    value: 2,
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

const Template: Story<QSelectProps> = args =>
  defineComponent({
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

      const handleSearch = (query: string): void => {
        // eslint-disable-next-line no-console
        if (!args.remote) return;

        state.remoteLoading = true;

        setTimeout(() => {
          state.remoteLoading = false;

          if (query !== '') {
            state.options = options.filter(item => {
              return item.label?.toLowerCase().includes(query.toLowerCase());
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
      <div style="width: 304px; height:240px">
        <h3>Value:</h3>
        <div><b>v-model: </b>{{ JSON.stringify(state.value) }}</div>
        <br />
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
          :placeholder="args.placeholder"
          @search="handleSearch"
        >
          <q-option
            v-for="item in state.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </q-select>
      </div>
    `
  });

export const Default: Story<QSelectProps> = Template.bind({});
Default.args = {
  ...Default.args,
  filterable: true,
  clearable: true,
  placeholder: 'Pick an option'
};

export const Multiple: Story<QSelectProps> = Template.bind({});
Multiple.args = {
  ...Multiple.args,
  multiple: true,
  filterable: true,
  allowCreate: true,
  clearable: true,
  placeholder: 'Pick an option'
};

export default storyMetadata;

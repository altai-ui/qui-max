import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QCascader from '@/qComponents/QCascader';
import type { QCascaderProps } from '@/qComponents/QCascader';

const storyMetadata: Meta = {
  title: 'Components/QCascader',
  component: QCascader,
  argTypes: {
    modelValue: { control: { type: 'none' } }
  }
};

const Template: Story<QCascaderProps> = args =>
  defineComponent({
    setup() {
      const modelValue = ref(null);

      const handleDropdownExpand = (): void => {
        // eslint-disable-next-line no-console
        console.log('dropdown-expand');
      };

      const handleDropdownClose = (): void => {
        // eslint-disable-next-line no-console
        console.log('dropdown-close');
      };

      const handleValueUpdate = (value: string): void => {
        // eslint-disable-next-line no-console
        console.log('update:modelValue', value);
      };

      return {
        args,
        modelValue,
        handleDropdownClose,
        handleValueUpdate,
        handleDropdownExpand
      };
    },
    template: `
      <div style="width: 304px; height:240px">
        <q-cascader
          v-model="modelValue"
          :check-strictly="args.checkStrictly"
          :options="args.options"
          :placeholder="args.placeholder"
          :disabled="args.disabled"
          :clearable="args.clearable"
          :multiple="args.multiple"
          :separator="args.separator"
          :all-levels-shown="args.allLevelsShown"
          :collapse-tags="args.collapseTags"
          @update:modelValue="handleValueUpdate"
          @dropdown-close="handleDropdownClose"
          @dropdown-expand="handleDropdownExpand"
        />
      </div>
    `
  });

const defaultArgs = {
  options: [
    {
      value: 'guide',
      label: 'Guide',
      children: [
        {
          value: 'disciplines',
          label: 'Disciplines',
          children: [
            {
              value: 'consistency',
              label: 'Consistency',
              children: [
                {
                  value: 'four level',
                  label: 'Four level'
                }
              ]
            },
            {
              value: 'feedback',
              label: 'Feedback'
            }
          ]
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'side nav',
              label: 'Side Navigation'
            },
            {
              value: 'top nav',
              label: 'Top Navigation'
            }
          ]
        },
        {
          value: 'alone',
          label: 'Alone'
        }
      ]
    },
    {
      value: 'disabled resource',
      label: 'Disabled resource',
      disabled: true,
      children: [
        {
          value: 'some child',
          label: 'Some child'
        }
      ]
    },
    {
      value: 'resource',
      label: 'Resource'
    }
  ]
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs
};

export const Multiple = Template.bind({});
Multiple.args = {
  ...defaultArgs,
  multiple: true
};

export default storyMetadata;

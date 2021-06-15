// eslint-disable-next-line import/no-extraneous-dependencies
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

      return { args, modelValue };
    },
    template: `
      <div style="width: 304px;">
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

const Default: Story<QCascaderProps> = Template.bind({});
Default.args = {
  ...defaultArgs
};

const Multiple: Story<QCascaderProps> = Template.bind({});
Multiple.args = {
  ...defaultArgs,
  multiple: true
};

export { Default, Multiple };
export default storyMetadata;

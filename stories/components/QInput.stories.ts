import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import { QInput } from '@/qComponents/QInput';
import type { QInputProps } from '@/qComponents/QInput';

import iconsList from '../core/iconsList';

const storyMetadata: Meta = {
  title: 'Components/QInput',
  component: QInput,
  argTypes: {
    placeholder: { control: { type: 'text' } },
    maxlength: { control: { type: 'number' } },
    modelValue: { control: { type: 'none' } },
    type: {
      options: ['text', 'password', 'number', 'email', 'hidden', 'tel', 'url'],
      control: { type: 'select' }
    },
    suffixIcon: { options: [null, ...iconsList], control: { type: 'select' } },
    autocomplete: {
      options: ['on', 'off'],
      control: { type: 'select' }
    },
    readonly: { control: { type: 'boolean' } }
  }
};

type StoryArgs = QInputProps & {
  placeholder: string;
  maxlength: string | number;
  type: string;
};

const QInputStory: Story<StoryArgs> = args =>
  defineComponent({
    setup() {
      const data = ref<string>('');

      const handleFocus = (event: Event): void => {
        console.log('handleFocus', event);
      };
      const handleBlur = (event: Event): void => {
        console.log('handleBlur', event);
      };
      const handleInput = (event: Event): void => {
        console.log('handleInput', event);
      };
      const handleChange = (event: Event): void => {
        console.log('handleChange', event);
      };
      const handleClear = (event: Event): void => {
        console.log('handleClear', event);
      };

      return {
        data,
        args,
        handleFocus,
        handleBlur,
        handleInput,
        handleChange,
        handleClear
      };
    },

    template: `
      <div style="width: 300px">
        <q-input
          v-model="data"
          :suffix-icon="args.suffixIcon"
          :show-symbol-limit="args.showSymbolLimit"
          :password-switch="args.passwordSwitch"
          :disabled="args.disabled"
          :clearable="args.clearable"
          :validate-event="args.validateEvent"
          :autocomplete="args.autocomplete"
          :placeholder="args.placeholder"
          :maxlength="args.maxlength"
          :type="args.type"
          :readonly="args.readonly"
          @blur="handleBlur"
          @focus="handleFocus"
          @input="handleInput"
          @change="handleChange"
          @clear="handleClear"
        />
      </div>
    `
  });

export const Default = QInputStory.bind({});

Default.args = {
  placeholder: 'Input text',
  maxlength: 25,
  type: 'text'
};

export default storyMetadata;

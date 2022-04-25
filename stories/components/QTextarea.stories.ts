import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import { QTextarea } from '@/qComponents/QTextarea';
import type { QTextareaProps } from '@/qComponents/QTextarea';

const storyMetadata: Meta = {
  title: 'Components/QTextarea',
  component: QTextarea,
  argTypes: {
    placeholder: { category: 'Native attrs', control: { type: 'text' } },
    maxlength: { category: 'Native attrs', control: { type: 'number' } },
    resize: {
      options: ['vertical', 'horizontal', 'both', 'none'],
      control: { type: 'select' }
    },
    autocomplete: { options: ['on', 'off'], control: { type: 'radio' } },
    modelValue: { control: { type: 'none' } },
    autosize: {
      options: [true, false, 'restrictions'],
      mapping: {
        true: true,
        false: false,
        restrictions: { minRows: 2, maxRows: 4 }
      },
      control: {
        type: 'select',
        labels: {
          true: 'true',
          false: 'false',
          restrictions: '{ minRows: 2, maxRows: 4 }'
        }
      }
    }
  }
};

type StoryArgs = QTextareaProps & {
  placeholder: string;
  maxlength: string | number;
  autocomplete: 'on' | 'off';
};

const QTextareaStory: Story<StoryArgs> = args =>
  defineComponent({
    setup() {
      const model = ref<string>('');

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

      return {
        model,
        args,
        handleFocus,
        handleBlur,
        handleInput,
        handleChange
      };
    },

    template: `
      <q-textarea
        v-model="model"
        :disabled="args.disabled"
        :resize="args.resize"
        :autosize="args.autosize"
        :placeholder="args.placeholder"
        :maxlength="args.maxlength"
        :autocomplete="args.autocomplete"
        :show-symbol-limit="args.showSymbolLimit"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
        @change="handleChange"
      />
    `
  });

export const Default = QTextareaStory.bind({});
Default.args = {
  autocomplete: 'off',
  placeholder: 'Input text',
  maxlength: 100,
  autosize: true
};

export default storyMetadata;

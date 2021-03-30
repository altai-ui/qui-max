import { ref } from 'vue';
import QInput from '@/qComponents/QInput';
import iconsList from '../core/iconsList';

export default {
  title: 'Components/QInput',

  component: QInput,

  argTypes: {
    placeholder: {
      control: {
        type: 'text'
      }
    },

    maxlength: {
      control: {
        type: 'number'
      }
    },

    modelValue: {
      control: {
        type: 'none'
      }
    },

    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'number', 'email', 'hidden', 'tel', 'url']
      }
    },

    suffixIcon: {
      control: {
        type: 'select',
        options: iconsList
      }
    },

    autocomplete: {
      control: {
        type: 'select',
        options: ['on', 'off']
      }
    },
    readonly: {
      control: {
        type: 'boolean'
      }
    }
  }
};

const Template = (args: any) => ({
  setup() {
    const data = ref('');

    const handleFocus = (event: Event) => {
      console.log('handleFocus', event);
    }
    const handleBlur = (event: Event) => {
      console.log('handleBlur', event);
    }
    const handleInput = (event: Event) => {
      console.log('handleInput', event);
    }
    const handleChange = (event: Event) => {
      console.log('handleChange', event);
    }
    const handleClear = (event: Event) => {
      console.log('handleClear', event);
    }

    return { data, args, handleFocus, handleBlur, handleInput, handleChange, handleClear };
  },

  template: `
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
    />`
});

export const Default: any = Template.bind({});
Default.args = {
  placeholder: 'Input text',
  maxlength: 25,
  type: 'text'
};

import { ref } from 'vue';
import QInput from '../../src/qComponents/QInput';
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
        type: 'boolean',
      }
    }
  }
};

const Template = (args: any) => ({
  setup() {
    const data = ref('');
    return { args, data };
  },

  template: `
    <q-input 
      v-model="data"
      :suffix-icon="args.suffixIcon"
      :show-symbol-limit="args.showSymbolLimit"
      :password-switch="args.passwordSwitch"
      :disabled="args.disabled"
      :counter-limit="args.counterLimit"
      :clearable="args.clearable"
      :validate-event="args.validateEvent"
      
      :autocomplete="args.autocomplete"
      :placeholder="args.placeholder"
      :maxlength="args.maxlength"
      :type="args.type"
      :readonly="args.readonly"
    />`
});

export const Default: any = Template.bind({});
Default.args = {
  placeholder: 'Input text',
  maxlength: 25,
  type: 'text'
}
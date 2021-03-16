import { ref } from 'vue';
import QInput from '../src/qComponents/QInput';
import iconsList from './core/iconsList';

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

    value: {
      control: { type: 'none' }
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
    }
  }
};

const Template = (args: any, argTypes) => ({
  setup() {
    const value = ref('');
    delete args.value;
    return { args, value };
  },
  methods: {
    handleInput(value) {
      console.log(this.value, value);
      this.value = value
    }
  },
  template: '<q-input v-bind="args" v-model="value" @input="handleInput" />'
});

export const Default = Template.bind({});
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
      control: {
        type: 'text'
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
    }
  }
};

const Template = (args: object) => ({
  setup() {
    console.log(args);
    
    return { args };
  },
  template: '<q-input v-bind="args" v-model="args.value" />'
});

export const Default = Template.bind({});
Default.args = {
  value: '123',
  type: 'text',
};

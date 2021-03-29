import QTextarea from '@/qComponents/QTextarea';
import { ref } from 'vue';

export default {
  title: 'Components/QTextarea',
  component: QTextarea,
  argTypes: {
    placeholder: {
      control: { type: 'text' }
    },
    maxlength: {
      control: {
        type: 'number'
      }
    },
    resize: {
      control: {
        type: 'select',
        options: ['vertical', 'horizontal', 'both', 'none']
      }
    }
  }
};

const Template = (args: any) => ({
  setup() {
    const model = ref('');
    return { model, args };
  },

  template: `
    <q-textarea
      v-model="model"
      :disabled="args.disabled"
      :resize="args.resize"
      :autosize="args.autosize"
      placeholder="Input text"
      tabindex="0"
    />
  `
});

export const Default: any = Template.bind({})

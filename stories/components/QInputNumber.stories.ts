import { ref } from 'vue';
import QInputNumber from '../../src/qComponents/QInputNumber';

export default {
  title: 'Components/QInputNumber',
  component: QInputNumber,
  argTypes: {
    value: {
      control: {
        type: 'none'
      }
    }
  }
};

const Template = (args: any) => ({
  setup() {
    const numberValue = ref('2');

    const handleEmit = (value: number, type: string) => {
      console.log(value, type);
    };

    return { args, numberValue, handleEmit };
  },

  template: `
    <q-input-number 
      v-bind="args" 
      v-model="numberValue"
      @input="handleEmit($event, 'input')"
      @change="handleEmit($event, 'change')"
    />
  `
});

export const Default: any = Template.bind({});

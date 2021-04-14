import { ref } from 'vue';

import QColorPicker from '@/qComponents/QColorPicker';
import PLACEMENTS from '@/qComponents/constants/popperPlacements';

export default {
  title: 'Components/QColorPicker',
  component: QColorPicker,
  argTypes: {
    modelValue: { control: { type: 'none' } },
    placement: { control: { type: 'select', options: PLACEMENTS } },
    colorFormat: { control: { type: 'select', options: ['hex', 'rgb'] } }
  }
};

export const QColorPickerStory = (args: unknown): unknown => ({
  components: { QColorPicker },
  setup() {
    const color = ref('#f25');

    return { args, color };
  },
  template: `
    <q-color-picker
      v-model="color"
      :disabled="args.disabled"
      :clearable="args.clearable"
      :alpha-shown="args.alphaShown"
      :color-format="args.colorFormat"
      :placement="args.placement"
      :popper-options="args.popperOptions"
    />
  `
});

QColorPickerStory.storyName = 'Default';
QColorPickerStory.args = {
  popperOptions: {}
};

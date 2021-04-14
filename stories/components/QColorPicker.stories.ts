// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QColorPicker from '@/qComponents/QColorPicker';
import PLACEMENTS from '@/qComponents/constants/popperPlacements';

const storyMetadata: Meta = {
  title: 'Components/QColorPicker',
  component: QColorPicker,
  argTypes: {
    modelValue: { control: { type: 'none' } },
    placement: { control: { type: 'select', options: PLACEMENTS } },
    colorFormat: { control: { type: 'select', options: ['hex', 'rgb'] } }
  }
};

const QColorPickerStory: Story = args =>
  defineComponent({
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

export { QColorPickerStory };
export default storyMetadata;

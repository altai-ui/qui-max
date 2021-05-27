// eslint-disable-next-line import/no-extraneous-dependencies
import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import { placements } from '@popperjs/core/lib/enums';

import QColorPicker from '@/qComponents/QColorPicker';
import type { QColorPickerProps } from '@/qComponents/QColorPicker';

const storyMetadata: Meta = {
  title: 'Components/QColorPicker',
  component: QColorPicker,
  argTypes: {
    modelValue: { control: { type: 'none' } },
    placement: { control: { type: 'select', options: placements } },
    colorFormat: { control: { type: 'select', options: ['hex', 'rgb'] } }
  }
};

const QColorPickerStory: Story<QColorPickerProps> = args =>
  defineComponent({
    components: { QColorPicker },
    setup() {
      const color = ref<string>('#f25');

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
        :teleport-to="args.teleportTo"
      />
    `
  });

QColorPickerStory.storyName = 'Default';
QColorPickerStory.args = {
  popperOptions: {}
};

export { QColorPickerStory };
export default storyMetadata;

import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import iconsList from './iconsList';

const storyMetadata: Meta = {
  title: 'Core/Icons/Playground',
  argTypes: {
    icon: { options: iconsList, control: { type: 'select' } },
    color: { control: { type: 'color' } },
    size: { control: { type: 'number', min: 8, max: 320, step: 2 } }
  }
};

const PlaygroundStory: Story = args =>
  defineComponent({
    setup() {
      const { icon, size, color } = args;
      const style = { fontSize: `${size}px`, color };

      return {
        icon,
        style
      };
    },

    template: '<span :class="icon" :style="style" />'
  });

export const Playground = PlaygroundStory.bind({});
Playground.args = {
  size: 32,
  color: '#000',
  icon: 'q-icon-bell'
};
export default storyMetadata;

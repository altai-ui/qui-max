import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';
import icons from './iconsList';
import './icons.scss';

const storyMetadata: Meta = {
  title: 'Core/Icons/Icons'
};

const IconsStory: Story = () =>
  defineComponent({
    setup() {
      return {
        icons
      };
    },
    template: `<div class="q-icons">
        <div
            v-for="icon in icons" 
            :key="icon"
            class="q-icons__icon-container"
        >
          <div class="q-icons__icon-wrapper">
             <span
                 class="q-icons__icon"
                 :class="icon"
             />
          </div>
          <div class="q-icons__icon-class">{{ icon }}</div>
        </div>
        </div>
    `
  });

export const Icons = IconsStory.bind({});
export default storyMetadata;

import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref, watch } from 'vue';

import type { Nullable } from '#/helpers';

import icons from './iconsList';
import './icons.scss';

const storyMetadata: Meta = {
  title: 'Core/Icons/All',
  argTypes: {
    fontSize: { control: { type: 'number' } }
  }
};

const IconsStory: Story = args =>
  defineComponent({
    setup() {
      const visibleTooltip = ref<Nullable<string>>(null);
      let timer: Nullable<ReturnType<typeof setTimeout>>;

      const fontSize = { '--font-size': `${args.fontSize}px` };

      const handleIconClick = async (name: string): Promise<void> => {
        await navigator.clipboard.writeText(name);
        visibleTooltip.value = name;
      };

      watch(visibleTooltip, () => {
        if (!visibleTooltip.value) return;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          visibleTooltip.value = null;
        }, 3000);
      });

      return {
        icons,
        visibleTooltip,
        fontSize,
        handleIconClick
      };
    },

    template: `
      <div 
          class="q-icons"
          :style="fontSize"
      >
        <div 
          v-for="icon in icons" 
          :key="icon"
          class="q-icons__container"
        >
          <span 
            v-if="visibleTooltip === icon" 
            class="q-icons__tooltip"
          >
            Copied
          </span>
          <div
            class="q-icons__wrapper"
            @click="handleIconClick(icon)"
          >
            <span
              class="q-icons__preview"
              :class="icon"
            />
          </div>
          <div class="q-icons__name">
            {{ icon }}
          </div>
        </div>
      </div>
    `
  });

export const All = IconsStory.bind({});
All.args = {
  fontSize: 32
};
export default storyMetadata;

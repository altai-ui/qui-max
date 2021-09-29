import type { Meta, Story } from '@storybook/vue3';
import { computed, defineComponent, ref, watch } from 'vue';

import icons from './iconsList';
import './icons.scss';

import { Nullable } from '#/helpers';

const storyMetadata: Meta = {
  title: 'Core/Icons/All',
  argTypes: {
    fontSize: { control: { type: 'number' } }
  }
};

const IconsStory: Story = args =>
  defineComponent({
    setup() {
      const visibleTooltip = ref<Nullable<string | undefined>>(null);
      const timer = ref<Nullable<ReturnType<typeof setTimeout>>>(null);

      const fontSize = computed<{ fontSize: string }>(() => ({
        fontSize: `${args.fontSize}px`
      }));
      const wrapperSizes = computed<{ minWidth: string; minHeight: string }>(
        () => ({
          minWidth: `${args.fontSize * 1.25}px`,
          minHeight: `${args.fontSize * 1.25}px`
        })
      );

      const clickHandler = (e: MouseEvent): void => {
        const name = (e.currentTarget as HTMLElement).querySelector(
          '.q-icons__name'
        );
        const range = document.createRange();
        const selection = window.getSelection();

        if (name) range.selectNode(name);

        selection?.removeAllRanges();
        selection?.addRange(range);
        visibleTooltip.value = selection?.toString().trim();

        document.execCommand('copy');

        selection?.empty();
      };

      watch(visibleTooltip, () => {
        if (visibleTooltip.value) {
          if (timer.value) clearTimeout(timer.value);
          timer.value = setTimeout(() => {
            visibleTooltip.value = null;
          }, 3000);
        }
      });

      return {
        icons,
        clickHandler,
        visibleTooltip,
        wrapperSizes,
        fontSize
      };
    },

    template: `
      <div class="q-icons">
        <div 
          v-for="icon in icons" 
          :key="icon"
          class="q-icons__container"
          @click="clickHandler"
        >
          <transition name="q">
            <span v-if="visibleTooltip === icon" class="q-icons__tooltip">Copied</span>
          </transition>
          <div 
              :style="wrapperSizes"
              class="q-icons__wrapper"
          >
            <span
              class="q-icons__preview"
              :class="icon"
              :style="fontSize"
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

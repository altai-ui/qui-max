<template>
  <div
    ref="root"
    class="q-color-hue-slider"
  >
    <div
      ref="bar"
      class="q-color-hue-slider__bar"
      @click="handleBarClick"
    />
    <div
      ref="thumb"
      class="q-color-hue-slider__thumb"
      :style="thumbStyles"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';

import draggable from '../utils/draggable';
import type { QColorHueSliderProps, QColorHueSliderInstance } from './types';

const UPDATE_HUE_EVENT = 'update:hue';

export default defineComponent({
  name: 'QColorHueSlider',
  componentName: 'QColorHueSlider',

  props: {
    hue: {
      type: Number,
      required: true
    }
  },

  emits: [UPDATE_HUE_EVENT],

  setup(props: QColorHueSliderProps, ctx): QColorHueSliderInstance {
    const thumbTop = ref<number>(0);
    const thumbStyles = computed<Record<string, string>>(() => ({
      top: `${thumbTop.value}px`
    }));

    const root = ref<HTMLElement | null>(null);
    const thumb = ref<HTMLElement | null>(null);
    const bar = ref<HTMLElement | null>(null);

    const handleDrag = (event: MouseEvent): void => {
      const thumbElement = thumb.value;
      if (!root.value || !thumbElement) return;

      const rect = root.value.getBoundingClientRect();

      let top = event.clientY - rect.top;
      top = Math.min(top, rect.height - thumbElement.offsetHeight / 2);
      top = Math.max(thumbElement.offsetHeight / 2, top);
      const hue = Math.round(
        ((top - thumbElement.offsetHeight / 2) /
          (rect.height - thumbElement.offsetHeight)) *
          360
      );

      ctx.emit(UPDATE_HUE_EVENT, hue);
    };

    const handleBarClick = (event: MouseEvent): void => {
      if (event.target !== thumb.value) handleDrag(event);
    };

    const getThumbTop = (): number => {
      const rootElement = root.value;
      const thumbElement = thumb.value;
      if (!rootElement || !thumbElement) return 0;

      return Math.round(
        (props.hue *
          (rootElement.offsetHeight - thumbElement.offsetHeight * 1.5)) /
          360
      );
    };

    const update = (): void => {
      thumbTop.value = getThumbTop();
    };

    watch(
      () => props.hue,
      () => {
        update();
      },
      { immediate: true }
    );

    onMounted(() => {
      if (!bar.value || !thumb.value) return;

      const dragConfig = {
        drag: handleDrag,
        end: handleDrag
      };
      draggable(bar.value, dragConfig);
      draggable(thumb.value, dragConfig);
    });

    return {
      root,
      thumb,
      bar,
      thumbStyles,
      handleBarClick
    };
  }
});
</script>

<template>
  <div
    ref="root"
    class="q-color-alpha-slider"
  >
    <div
      ref="bar"
      class="q-color-alpha-slider__bar"
      :style="barStyles"
      @click="handleBarClick"
    />
    <div
      ref="thumb"
      class="q-color-alpha-slider__thumb"
      :style="thumbStyles"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';

import draggable from './draggable';

const UPDATE_ALPHA_EVENT = 'update:alpha';

export default defineComponent({
  name: 'QColorAlphaSlider',
  componentName: 'QColorAlphaSlider',

  props: {
    color: {
      type: String,
      required: true
    },
    alpha: {
      type: Number,
      required: true
    }
  },

  emits: [UPDATE_ALPHA_EVENT],

  setup(props, { emit }) {
    const thumbLeft = ref(0);

    const barStyles = computed(() => ({
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, ${props.color})`
    }));

    const thumbStyles = computed(() => ({
      left: `${thumbLeft.value}px`
    }));

    const root = ref<HTMLElement | null>(null);
    const thumb = ref<HTMLElement | null>(null);
    const bar = ref<HTMLElement | null>(null);

    const handleDrag = (event: MouseEvent) => {
      const thumbElement = thumb.value;
      if (!root.value || !thumbElement) return;

      const rect = root.value.getBoundingClientRect();

      let left = event.clientX - rect.left;
      left = Math.max(thumbElement.offsetWidth / 2, left);
      left = Math.min(left, rect.width - thumbElement.offsetWidth / 2);
      const alpha = Math.round(
        ((left - thumbElement.offsetWidth / 2) /
          (rect.width - thumbElement.offsetWidth)) *
          100
      );

      emit(UPDATE_ALPHA_EVENT, alpha);
    };

    const handleBarClick = (event: MouseEvent) => {
      if (event.target !== thumb.value) {
        handleDrag(event);
      }
    };

    const getThumbLeft = () => {
      const rootElement = root.value;
      const thumbElement = thumb.value;
      if (!rootElement || !thumbElement) return 0;

      return Math.round(
        (props.alpha *
          (rootElement.offsetWidth - thumbElement.offsetWidth * 1.5)) /
          100
      );
    };

    const update = () => {
      thumbLeft.value = getThumbLeft();
    };

    watch(
      () => props.alpha,
      () => {
        update();
      }
    );

    onMounted(() => {
      if (!bar.value || !thumb.value) return;

      const dragConfig = {
        drag: handleDrag,
        end: handleDrag
      };
      draggable(bar.value, dragConfig);
      draggable(thumb.value, dragConfig);

      update();
    });

    return {
      root,
      thumb,
      bar,
      barStyles,
      thumbStyles,
      handleBarClick
    };
  }
});
</script>

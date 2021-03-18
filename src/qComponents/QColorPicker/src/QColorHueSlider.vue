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

import draggable from './draggable';

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

  setup(props, { emit }) {
    const thumbTop = ref(0);
    const thumbStyles = computed(() => ({
      top: `${thumbTop.value}px`
    }));

    const root = ref<HTMLElement | null>(null);
    const thumb = ref<HTMLElement | null>(null);
    const bar = ref<HTMLElement | null>(null);

    const handleDrag = event => {
      const refThumb = thumb.value;
      if (!root.value || !refThumb) return;

      const rect = root.value.getBoundingClientRect();

      let top = event.clientY - rect.top;
      top = Math.min(top, rect.height - refThumb.offsetHeight / 2);
      top = Math.max(refThumb.offsetHeight / 2, top);
      const hue = Math.round(
        ((top - refThumb.offsetHeight / 2) /
          (rect.height - refThumb.offsetHeight)) *
          360
      );

      emit(UPDATE_HUE_EVENT, hue);
    };

    const handleBarClick = event => {
      if (event.target !== thumb.value) {
        handleDrag(event);
      }
    };

    const getThumbTop = () => {
      const refRoot = root.value;
      const refThumb = thumb.value;
      if (!refRoot || !refThumb) return 0;

      return Math.round(
        (props.hue * (refRoot.offsetHeight - refThumb.offsetHeight * 1.5)) / 360
      );
    };

    const update = () => {
      thumbTop.value = getThumbTop();
    };

    watch(
      () => props.hue,
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
      thumbStyles,
      handleBarClick
    };
  }
});
</script>

<template>
  <div
    class="q-slider__bar"
    :style="barStyle"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import type { BarStyle, QSliderBarProps, QSliderBarInstance } from './types';

export default defineComponent({
  name: 'QSliderBar',

  props: {
    size: {
      type: String,
      default: null
    }
  },

  setup(props: QSliderBarProps): QSliderBarInstance {
    const barStyle = computed<BarStyle>(() => ({
      width: props.size
    }));

    return {
      barStyle
    };
  }
});
</script>

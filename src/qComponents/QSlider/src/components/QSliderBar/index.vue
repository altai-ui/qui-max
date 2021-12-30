<template>
  <div
    class="q-slider-bar"
    :style="barStyle"
  />
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';

import type { QSliderBarInstance } from './types';

export default defineComponent({
  name: 'QSliderBar',

  props: {
    start: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    }
  },

  setup(props): QSliderBarInstance {
    const barStyle = computed(() => {
      return {
        left: props.start,
        width: props.size
      };
    });

    return {
      barStyle
    }
  }
});
</script>

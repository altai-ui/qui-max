<template>
  <div class="q-slider-steps">
    <div
      v-for="(_, key) in list"
      :key="key"
      class="q-slider-steps__step"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { GetStopStyle, QSliderStepsInstance } from './types';

export default defineComponent({
  name: 'QSliderSteps',

  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
  },

  setup(): QSliderStepsInstance {
    const getStopStyle = (position: number): GetStopStyle => {
      return { left: `${position}%` };
    }

    return {
      getStopStyle
    }
  }
});
</script>

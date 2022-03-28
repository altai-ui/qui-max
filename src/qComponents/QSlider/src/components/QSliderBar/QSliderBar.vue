<template>
  <div
    class="q-slider__bar"
    :style="barStyle"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';

import type {
  BarStyle,
  QSliderBarPropSize,
  QSliderBarProps,
  QSliderBarInstance
} from './types';

export default defineComponent({
  name: 'QSliderBar',

  props: {
    size: {
      type: String as PropType<QSliderBarPropSize>,
      default: null
    }
  },

  setup(props: QSliderBarProps): QSliderBarInstance {
    const barStyle = computed<BarStyle>(() => ({
      width: props.size ?? undefined
    }));

    return {
      barStyle
    };
  }
});
</script>

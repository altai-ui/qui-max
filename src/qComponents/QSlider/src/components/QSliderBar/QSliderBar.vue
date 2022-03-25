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
  QSliderBarPropWidth,
  QSliderBarProps,
  QSliderBarInstance
} from './types';

export default defineComponent({
  name: 'QSliderBar',

  props: {
    width: {
      type: String as PropType<QSliderBarPropWidth>,
      default: null
    }
  },

  setup(props: QSliderBarProps): QSliderBarInstance {
    const barStyle = computed<BarStyle>(() => ({
      width: props.width ?? undefined
    }));

    return {
      barStyle
    };
  }
});
</script>

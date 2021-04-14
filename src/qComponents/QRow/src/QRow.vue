<template>
  <component
    :is="tag"
    class="q-row"
    :class="classes"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import type { AlignV, AlignH } from './types';

export default defineComponent({
  name: 'QRow',
  componentName: 'QRow',

  props: {
    /**
     * custom element tag
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * vertical alignment of flex layout.
     * `['start', 'end', 'center', 'baseline', 'stretch']`
     */
    alignV: {
      type: String as PropType<AlignV>,
      default: null,
      validator: (value: string | null) =>
        [null, 'start', 'end', 'center', 'baseline', 'stretch'].includes(value)
    },
    /**
     * horizontal alignment of flex layout.
     * `['start', 'end', 'center', 'between', 'around']`
     */
    alignH: {
      type: String as PropType<AlignH>,
      default: null,
      validator: (value: string | null) =>
        [null, 'start', 'end', 'center', 'between', 'around'].includes(value)
    }
  },

  setup(props) {
    const classes = computed(() => ({
      [`q-row_align-h_${props.alignH}`]: Boolean(props.alignH),
      [`q-row_align-v_${props.alignV}`]: Boolean(props.alignV)
    }));

    return { classes };
  }
});
</script>

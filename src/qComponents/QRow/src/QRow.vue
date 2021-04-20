<template>
  <component
    :is="tag || 'div'"
    class="q-row"
    :class="classes"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import type { QRowProps, QRowPropAlignV, QRowPropAlignH } from './types';

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
      type: String as PropType<QRowPropAlignV>,
      default: null,
      validator: (value: string | null): boolean =>
        [null, 'start', 'end', 'center', 'baseline', 'stretch'].includes(value)
    },
    /**
     * horizontal alignment of flex layout.
     * `['start', 'end', 'center', 'between', 'around']`
     */
    alignH: {
      type: String as PropType<QRowPropAlignH>,
      default: null,
      validator: (value: string | null): boolean =>
        [null, 'start', 'end', 'center', 'between', 'around'].includes(value)
    }
  },

  setup(props: QRowProps) {
    const classes = computed<Record<string, boolean>>(() => ({
      [`q-row_align-h_${props.alignH}`]: Boolean(props.alignH),
      [`q-row_align-v_${props.alignV}`]: Boolean(props.alignV)
    }));

    return { classes };
  }
});
</script>

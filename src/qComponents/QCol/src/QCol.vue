<template>
  <component
    :is="tag"
    class="q-col"
    :class="classes"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import type { QColProps } from './types';

export default defineComponent({
  name: 'QCol',
  componentName: 'QCol',

  props: {
    /**
     * custom element tag
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * number of column the grid cols.
     * `auto || [1-12]`
     */
    cols: {
      type: [String, Number],
      default: null,
      validator: (value: string | number | null): boolean =>
        value === null || value === 'auto' || (value > 0 && value <= 12)
    },
    /**
     * number of spacing on the left side of the grid.
     * `[0-11]`
     */
    offset: {
      type: [String, Number],
      default: null,
      validator: (value: string | number | null): boolean =>
        value === null || (value >= 0 && value <= 11)
    }
  },

  setup(props: QColProps) {
    const classes = computed<Record<string, boolean>>(() => ({
      [`q-col_size_${props.cols}`]: props.cols !== null,
      [`q-col_offset_${props.offset}`]: props.offset !== null
    }));

    return { classes };
  }
});
</script>

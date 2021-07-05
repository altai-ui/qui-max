<template>
  <div class="q-collapse">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, watch, ref } from 'vue';
import { uniqueId } from 'lodash-es';

import type {
  QCollapseProps,
  QCollapsePropModelValue,
  QCollapseProvider,
  QCollapseInstance
} from './types';

export default defineComponent({
  name: 'QCollapse',
  componentName: 'QCollapse',

  props: {
    modelValue: {
      type: [Array, String, Number] as PropType<QCollapsePropModelValue>,
      default: (): QCollapsePropModelValue => []
    },
    /**
     * shrink all panels, except the last selected
     */
    accordion: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    /**
     * triggers when model updates
     */
    'update:modelValue',
    /**
     * alias for update:modelValue
     */
    'change'
  ],

  setup(props: QCollapseProps, ctx): QCollapseInstance {
    const activeNames = ref<(string | number)[]>([]);

    const updateValue = (name: string | number): void => {
      if (props.accordion) {
        activeNames.value = activeNames.value[0] === name ? [] : [name];
      } else {
        const index = activeNames.value.indexOf(name);

        if (index > -1) {
          activeNames.value.splice(index, 1);
        } else {
          activeNames.value.push(name);
        }
      }

      ctx.emit('update:modelValue', activeNames.value);
      ctx.emit('change', activeNames.value);
    };

    watch(
      () => props.modelValue,
      value => {
        const newValue: (string | number)[] = [];
        activeNames.value = value === null ? newValue : newValue.concat(value);
      },
      { immediate: true }
    );

    provide<QCollapseProvider>('qCollapse', {
      uniqueId,
      activeNames,
      updateValue
    });
  }
});
</script>

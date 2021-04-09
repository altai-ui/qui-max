<template>
  <div class="q-collapse">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, watch, ref } from 'vue';
import { uniqueId } from 'lodash-es';

import { QCollapseProvider } from './types';

const UPDATE_MODEL_VALUE_EVENT = 'update:modelValue';
const CHANGE_EVENT = 'change';

export default defineComponent({
  name: 'QCollapse',
  componentName: 'QCollapse',

  props: {
    modelValue: {
      type: [Array, String, Number] as PropType<
        null | string | number | (string | number)[]
      >,
      default: () => []
    },
    /**
     * shrink all panels, except the last selected
     */
    accordion: {
      type: Boolean,
      default: false
    }
  },

  emits: [UPDATE_MODEL_VALUE_EVENT, CHANGE_EVENT],

  setup(props, ctx) {
    const activeNames = ref<(string | number)[]>([]);

    const updateValue = (name: string | number) => {
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

      ctx.emit(UPDATE_MODEL_VALUE_EVENT, activeNames.value);
      ctx.emit(CHANGE_EVENT, activeNames.value);
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

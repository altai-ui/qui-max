<template>
  <div class="q-tabs">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, watch, toRef } from 'vue';

import type { QTabsProvider } from './types';

const UPDATE_MODEL_VALUE_EVENT = 'update:modelValue';
const CHANGE_EVENT = 'change';

export default defineComponent({
  name: 'QTabs',
  componentName: 'QTabs',

  props: {
    /**
     * width of QTabPanes
     */
    tabWidth: {
      type: [String, Number],
      default: null
    },
    modelValue: {
      type: String,
      default: null
    },
    /**
     * whether QTabs is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: [UPDATE_MODEL_VALUE_EVENT, CHANGE_EVENT],

  setup(props, { emit }) {
    const currentName = ref(props.modelValue);

    const updateValue = (name: string) => {
      emit(UPDATE_MODEL_VALUE_EVENT, name);
      /**
       * triggers when the tab changes
       */
      emit(CHANGE_EVENT, name);
      currentName.value = name;
    };

    watch(
      () => props.modelValue,
      (name: string) => updateValue(name),
      { immediate: true }
    );

    provide<QTabsProvider>('qTabs', {
      disabled: toRef(props, 'disabled'),
      tabWidth: toRef(props, 'tabWidth'),
      currentName,
      updateValue
    });
  }
});
</script>

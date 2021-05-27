<template>
  <div class="q-tabs">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, watch, toRef } from 'vue';

import {
  UPDATE_MODEL_VALUE_EVENT,
  CHANGE_EVENT
} from '@/qComponents/constants/events';
import type {
  QTabPropModelValue,
  QTabsProps,
  QTabsProvider,
  QTabsInstance
} from './types';

export default defineComponent({
  name: 'QTabs',
  componentName: 'QTabs',

  props: {
    modelValue: {
      type: String,
      default: null
    },
    /**
     * width of QTabPanes
     */
    tabWidth: {
      type: [String, Number],
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

  setup(props: QTabsProps, { emit }): QTabsInstance {
    const currentName = ref<QTabPropModelValue>(props.modelValue);

    const updateValue = (name: string): void => {
      emit(UPDATE_MODEL_VALUE_EVENT, name);
      /**
       * triggers when the tab changes
       */
      emit(CHANGE_EVENT, name);
      currentName.value = name;
    };

    watch(
      () => props.modelValue,
      name => {
        if (name) updateValue(name);
      },
      { immediate: true }
    );

    provide<QTabsProvider>('qTabs', {
      currentName,
      tabWidth: toRef(props, 'tabWidth'),
      disabled: toRef(props, 'disabled'),
      updateValue
    });
  }
});
</script>

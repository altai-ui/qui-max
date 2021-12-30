<template>
  <button
    type="button"
    :tabindex="tabIndex"
    class="q-slider-button"
    :class="btnClasses"
  >
    <div class="q-slider-button__target" />
    <div
      class="q-slider-button__tooltip"
    >
      50
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';

import type { State, BtnClasses } from './types';

export default defineComponent({
  name: 'QSliderButton',

  props: {
    modelValue: {
      type: Number,
      default: 0
    },

    position: {
      type: Number,
      default: null
    },

    tabIndex: {
      type: Number,
      default: 0
    }
  },

  emits: ['update:modelValue'],

  setup() {
    const state = reactive<State>({
      isDragging: false,
    });

    const btnClasses = computed<BtnClasses>(() => ({
      'q-slider-button_show-tooltip': state.isDragging
    }));

    return {
      btnClasses
    }
  }
});
</script>

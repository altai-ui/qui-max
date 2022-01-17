<template>
  <button
    type="button"
    class="q-slider-button"
    :style="btnStyles"
    @mousedown="handleBtnDown"
  >
    <div class="q-slider-button__target" />
  </button>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onBeforeUnmount } from 'vue';

import type {
  QSliderButtonProps,
  QSliderButtonState,
  BtnStyles,
  QSliderButtonInstance
} from './types';

export default defineComponent({
  name: 'QSliderButton',

  props: {
    position: {
      type: String,
      default: null
    },

    pathLeft: {
      type: Number,
      default: null
    },

    pathWidth: {
      type: Number,
      default: null
    }
  },

  emits: ['update:position'],

  setup(props: QSliderButtonProps, ctx): QSliderButtonInstance {
    const state = reactive<QSliderButtonState>({
      isDragging: false
    });

    const btnStyles = computed<BtnStyles>(() => ({
      left: props.position
    }));

    const handleDragging = ({ clientX }: MouseEvent): void => {
      if (!state.isDragging) return;

      let percent: number =
        ((clientX - Number(props.pathLeft)) / Number(props.pathWidth)) * 100;

      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }

      ctx.emit('update:position', percent);
    };

    const handleDragEnd = (): void => {
      state.isDragging = false;
    };

    const handleBtnDown = (event: MouseEvent): void => {
      event.preventDefault();

      state.isDragging = true;

      document.addEventListener('mousemove', handleDragging);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('contextmenu', handleDragEnd);
    };

    onBeforeUnmount(() => {
      document.removeEventListener('mousemove', handleDragging);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('contextmenu', handleDragEnd);
    });

    return {
      btnStyles,
      handleBtnDown
    };
  }
});
</script>

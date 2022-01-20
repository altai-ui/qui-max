<template>
  <button
    type="button"
    class="q-slider-button"
    :class="btnClasses"
    :style="btnStyles"
    @mousedown="handleBtnDown"
  >
    <div class="q-slider-button__target" />
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount } from 'vue';

import type {
  QSliderButtonProps,
  BtnClasses,
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
    },

    disabled: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  emits: ['update:position', 'drag-start'],

  setup(props: QSliderButtonProps, ctx): QSliderButtonInstance {
    const isDragging = ref<boolean>(false);

    const btnClasses = computed<BtnClasses>(() => ({
      'q-slider-button_is-disabled': props.disabled
    }));

    const btnStyles = computed<BtnStyles>(() => ({
      left: props.position
    }));

    const handleDragging = ({ clientX }: MouseEvent): void => {
      if (!isDragging.value || props.disabled) return;

      let percent =
        ((clientX - Number(props.pathLeft)) / Number(props.pathWidth)) * 100;

      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }

      ctx.emit('update:position', percent);
    };

    const handleDragEnd = (): void => {
      isDragging.value = false;
    };

    const handleBtnDown = (event: MouseEvent): void => {
      ctx.emit('drag-start');
      event.preventDefault();

      isDragging.value = true;

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
      btnClasses,
      btnStyles,
      handleBtnDown
    };
  }
});
</script>

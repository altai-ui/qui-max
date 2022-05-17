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
  <div
    v-if="!isTooltipHidden"
    class="q-slider-button__tooltip"
    :class="tooltipClasses"
    :style="tooltipStyles"
  >
    {{ currentValue }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount } from 'vue';
import type { PropType } from 'vue';

import type { ClassValue } from '#/helpers';

import type { QSliderPropModelValue, QSliderTooltipMode } from '../../types';

import type {
  QSliderButtonPropPosition,
  QSliderButtonPropPathLeft,
  QSliderButtonPropPathWidth,
  QSliderButtonProps,
  BtnClasses,
  BtnStyles,
  TooltipStyles,
  QSliderButtonInstance
} from './types';

export default defineComponent({
  name: 'QSliderButton',

  props: {
    position: {
      type: String as PropType<QSliderButtonPropPosition>,
      default: null
    },

    pathLeft: {
      type: Number as PropType<QSliderButtonPropPathLeft>,
      default: null
    },

    pathWidth: {
      type: Number as PropType<QSliderButtonPropPathWidth>,
      default: null
    },
    tooltipMode: {
      type: String as PropType<QSliderTooltipMode>,
      default: 'hover'
    },
    currentValue: {
      type: [String, Number, Boolean] as PropType<QSliderPropModelValue>,
      default: null
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },

  emits: ['update:position', 'drag-start'],

  setup(props: QSliderButtonProps, ctx): QSliderButtonInstance {
    const isDragging = ref<boolean>(false);

    const btnClasses = computed<BtnClasses>(() => ({
      'q-slider-button_is-disabled': props.disabled,
      'q-slider-button_is-dragging': isDragging.value
    }));

    const tooltipClasses = computed<ClassValue>(() => ({
      'q-slider-button__tooltip_is-always-visible':
        props.tooltipMode === 'always'
    }));

    const btnStyles = computed<BtnStyles>(() => ({
      left: props.position ?? undefined
    }));

    const isTooltipHidden = computed<boolean>(
      () =>
        props.tooltipMode === 'none' ||
        props.currentValue === undefined ||
        props.currentValue === null
    );

    const tooltipStyles = computed<TooltipStyles>(() => ({
      left: props.position ?? undefined
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
      tooltipClasses,
      isTooltipHidden,
      tooltipStyles,
      handleBtnDown
    };
  }
});
</script>

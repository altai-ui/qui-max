<template>
  <div
    ref="root"
    class="q-color-alpha-slider"
  >
    <div
      ref="bar"
      class="q-color-alpha-slider__bar"
      :style="barStyles"
      @click="handleBarClick"
    />
    <div
      ref="thumb"
      class="q-color-alpha-slider__thumb"
      :style="thumbStyles"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  inject,
  nextTick
} from 'vue';

import { colord } from 'colord';

import type { Nullable } from '#/helpers';

import draggable from '../utils/draggable';
import type { QPickerDropdownProvider } from '../QPickerDropdown';
import type { QColorAlphaSliderInstance } from './types';

export default /* #__PURE__ */ defineComponent({
  name: 'QColorAlphaSlider',
  componentName: 'QColorAlphaSlider',

  emits: ['change'],

  setup(_, ctx): QColorAlphaSliderInstance {
    const qPickerDropdown = inject<QPickerDropdownProvider>(
      'qPickerDropdown',
      {} as QPickerDropdownProvider
    );

    const thumbLeft = ref<number>(0);

    const barStyles = computed<Record<string, string>>(() => {
      const color = colord({
        h: qPickerDropdown.hsvaModel.hue,
        s: qPickerDropdown.hsvaModel.saturation,
        v: qPickerDropdown.hsvaModel.value
      }).toRgbString();

      return {
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, ${color})`
      };
    });

    const thumbStyles = computed<Record<string, string>>(() => ({
      left: `${thumbLeft.value}px`
    }));

    const root = ref<Nullable<HTMLElement>>(null);
    const thumb = ref<Nullable<HTMLElement>>(null);
    const bar = ref<Nullable<HTMLElement>>(null);

    const handleDrag = (event: MouseEvent): void => {
      const thumbElement = thumb.value;
      if (!root.value || !thumbElement) return;

      const rect = root.value.getBoundingClientRect();

      let left = event.clientX - rect.left;
      left = Math.max(thumbElement.offsetWidth / 2, left);
      left = Math.min(left, rect.width - thumbElement.offsetWidth / 2);
      const alpha = Math.round(
        ((left - thumbElement.offsetWidth / 2) /
          (rect.width - thumbElement.offsetWidth)) *
          100
      );

      ctx.emit('change', { ...qPickerDropdown.hsvaModel, alpha });
    };

    const handleBarClick = (event: MouseEvent): void => {
      if (event.target !== thumb.value) handleDrag(event);
    };

    const getThumbLeft = (): number => {
      const rootElement = root.value;
      const thumbElement = thumb.value;
      if (!rootElement || !thumbElement) return 0;

      return Math.round(
        (qPickerDropdown.hsvaModel.alpha *
          (rootElement.offsetWidth - thumbElement.offsetWidth * 1.5)) /
          100
      );
    };

    const update = (): void => {
      thumbLeft.value = getThumbLeft();
    };

    watch(
      () => qPickerDropdown.hsvaModel.alpha,
      async () => {
        await nextTick();
        update();
      },
      { immediate: true }
    );

    onMounted(() => {
      if (bar.value) {
        draggable(bar.value, { drag: handleDrag, end: handleDrag });
      }
    });

    return {
      root,
      thumb,
      bar,
      barStyles,
      thumbStyles,
      handleBarClick,
      update
    };
  }
});
</script>

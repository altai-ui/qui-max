<template>
  <div
    ref="root"
    class="q-scrollbar__bar"
    :class="classes"
    @mousedown="handleTrackerClick"
  >
    <div
      ref="thumb"
      :class="thumbClasses"
      :style="thumbStyles"
      @mousedown="handleThumbClick"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  onUnmounted,
  inject
} from 'vue';

import type { QBarProps, QScrollbarProvider } from './types';
import { renderThumbStyle, BAR_MAP } from './util';

export default defineComponent({
  name: 'QBar',
  componentName: 'QBar',

  props: {
    type: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'horizontal',
      validator: (value: string): boolean =>
        ['horizontal', 'vertical'].includes(value)
    },
    theme: { type: String, default: null },
    size: { type: String, default: '0' },
    move: { type: Number, default: 0 }
  },

  setup(props: QBarProps) {
    const qScrollbar = inject<QScrollbarProvider>('qScrollbar');
    const root = ref<HTMLElement | null>(null);
    const thumb = ref<HTMLElement | null>(null);
    const cursorDown = ref(false);

    let axis = 0;

    const bar = computed(() => BAR_MAP[props.type]);
    const thumbStyles = computed(() =>
      renderThumbStyle(props.move ?? 0, props.size ?? '', bar.value)
    );

    const classes = computed(() => [
      `q-scrollbar__bar_${bar.value.key}`,
      props?.theme === 'secondary' && 'q-scrollbar__bar_secondary'
    ]);

    const thumbClasses = computed(() => [
      'q-scrollbar__thumb',
      props?.theme === 'secondary' && 'q-scrollbar__thumb_secondary'
    ]);

    const wrap = qScrollbar?.wrap;

    const scrollToPx = (px: number): void => {
      const wrapValue = wrap?.value;
      if (wrapValue) wrapValue[bar.value.scroll] = px;
    };

    const handleTrackerClick = (e: MouseEvent): void => {
      if (!thumb.value || !root.value || !wrap?.value) return;

      const target = e.target as HTMLElement;
      const offset = Math.abs(
        target.getBoundingClientRect()[bar.value.direction] -
          e[bar.value.client]
      );
      const thumbHalf = thumb.value[bar.value.offset] / 2;
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100) / (root.value[bar.value.offset] ?? 0);

      scrollToPx(
        (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
      );
    };

    const mouseMoveDocumentHandler = (e: MouseEvent): void => {
      if (!cursorDown.value || !root.value || !thumb.value || !wrap?.value)
        return;
      const prevPage = axis;

      if (!prevPage) return;

      const offset =
        (root.value.getBoundingClientRect()[bar.value.direction] -
          e[bar.value.client]) *
        -1;

      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100) / root.value?.[bar.value.offset];

      scrollToPx(
        (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
      );
    };

    const mouseUpDocumentHandler = (): void => {
      cursorDown.value = false;
      axis = 0;

      document.removeEventListener(
        'mousemove',
        mouseMoveDocumentHandler,
        false
      );
      document.onselectstart = null;
    };

    const startDrag = (e: MouseEvent): void => {
      e.stopImmediatePropagation();
      cursorDown.value = true;

      document.addEventListener('mousemove', mouseMoveDocumentHandler, false);
      document.addEventListener('mouseup', mouseMoveDocumentHandler, false);
      document.onselectstart = (): boolean => false;
    };

    const handleThumbClick = (e: MouseEvent): void => {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) return;

      startDrag(e);

      const target = e.currentTarget as HTMLElement;
      axis =
        target[bar.value.offset] -
        (e[bar.value.client] -
          target.getBoundingClientRect()[bar.value.direction]);
    };

    onUnmounted(() => {
      document.removeEventListener('mouseup', mouseUpDocumentHandler, false);
    });

    return {
      root,
      bar,
      thumb,
      classes,
      thumbClasses,
      thumbStyles,
      handleThumbClick,
      handleTrackerClick,
      scrollToPx
    };
  }
});
</script>

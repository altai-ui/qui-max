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

import { validateArray } from '@/qComponents/helpers';
import type { Nullable } from '#/helpers';

import type {
  QBarProps,
  QBarPropType,
  QScrollbarProvider,
  BarMapItem,
  QBarInstance
} from './types';
import { renderThumbStyle, BAR_MAP } from './util';

export default defineComponent({
  name: 'QBar',
  componentName: 'QBar',

  props: {
    type: {
      type: String as PropType<QBarPropType>,
      default: 'horizontal',
      validator: validateArray<QBarPropType>(['horizontal', 'vertical'])
    },
    theme: { type: String, default: null },
    size: { type: String, default: '0' },
    move: { type: Number, default: null }
  },

  setup(props: QBarProps): QBarInstance {
    const qScrollbar = inject<QScrollbarProvider>('qScrollbar');
    const root = ref<Nullable<HTMLElement>>(null);
    const thumb = ref<Nullable<HTMLElement>>(null);
    const cursorDown = ref<boolean>(false);

    let axis = 0;

    const bar = computed<BarMapItem>(() => BAR_MAP[props.type]);
    const thumbStyles = computed<Record<string, string | number>>(() =>
      renderThumbStyle(props.move ?? 0, props.size ?? '0', bar.value)
    );

    const classes = computed<Record<string, boolean>>(() => ({
      [`q-scrollbar__bar_${bar.value.key}`]: true,
      'q-scrollbar__bar_secondary': props?.theme === 'secondary'
    }));

    const thumbClasses = computed<Record<string, boolean>>(() => ({
      'q-scrollbar__thumb': true,
      'q-scrollbar__thumb_secondary': props?.theme === 'secondary'
    }));

    const wrap = computed<Nullable<HTMLElement>>(
      () => qScrollbar?.wrap.value ?? null
    );

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
        ((offset - thumbClickPosition) * 100) /
        (root.value?.[bar.value.offset] ?? 1);

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
      document.removeEventListener(
        'mousemove',
        mouseMoveDocumentHandler,
        false
      );
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

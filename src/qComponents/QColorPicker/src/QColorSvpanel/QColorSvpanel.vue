<template>
  <div
    ref="root"
    class="q-color-svpanel"
    :style="rootStyles"
  >
    <div
      class="q-color-svpanel__cursor"
      :style="cursorStyles"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';

import type { Nullable } from '#/helpers';

import draggable from '../utils/draggable';
import type { QColorSvpanelProps, QColorSvpanelInstance } from './types';

export default defineComponent({
  name: 'QColorSvpanel',
  componentName: 'QColorSvpanel',

  props: {
    hue: {
      type: Number,
      required: true
    },
    saturation: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    alpha: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: null
    }
  },

  emits: ['update:saturation', 'update:value'],

  setup(props: QColorSvpanelProps, ctx): QColorSvpanelInstance {
    const rootStyles = computed<Record<string, string>>(() => ({
      backgroundColor: `hsl(${props.hue}, 100%, 50%)`
    }));

    const cursorTop = ref<number>(0);
    const cursorLeft = ref<number>(0);
    const opacity = ref<number>(0);

    const cursorStyles = computed<Record<string, string | number>>(() => ({
      top: `${cursorTop.value}px`,
      left: `${cursorLeft.value}px`,
      opacity: opacity.value
    }));

    const root = ref<Nullable<HTMLElement>>(null);

    const update = (): void => {
      if (!root.value) return;

      const { clientWidth: width, clientHeight: height } = root.value;
      cursorLeft.value = (props.saturation * width) / 100;
      cursorTop.value = ((100 - props.value) * height) / 100;
      opacity.value = props.color ? 1 : 0;
    };

    const handleDrag = (event: MouseEvent): void => {
      if (!root.value) return;

      const rect = root.value.getBoundingClientRect();

      let left = event.clientX - rect.left;
      let top = event.clientY - rect.top;
      left = Math.min(Math.max(0, left), rect.width);
      top = Math.min(Math.max(0, top), rect.height);

      cursorLeft.value = left;
      cursorTop.value = top;
      const saturation = Math.round((left / rect.width) * 100);
      const value = Math.round(100 - (top / rect.height) * 100);

      ctx.emit('update:saturation', saturation);
      ctx.emit('update:value', value);
    };

    watch(
      () => [props.saturation, props.value, props.hue, props.alpha],
      () => {
        opacity.value = 1;
      }
    );

    onMounted(() => {
      if (root.value) {
        draggable(root.value, {
          drag: handleDrag,
          end: handleDrag
        });

        update();
      }
    });

    return {
      root,
      rootStyles,
      cursorStyles,
      update
    };
  }
});
</script>

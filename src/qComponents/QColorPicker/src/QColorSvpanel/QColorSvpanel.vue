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
    isCleared: {
      type: Boolean
    }
  },

  emits: ['update:saturation', 'update:value'],

  setup(props: QColorSvpanelProps, ctx): QColorSvpanelInstance {
    const rootStyles = computed<Record<string, string>>(() => ({
      backgroundColor: `hsl(${props.hue}, 100%, 50%)`
    }));

    const cursorTop = ref<number>(0);
    const cursorLeft = ref<number>(0);

    const cursorStyles = computed<Record<string, string>>(() => ({
      top: `${cursorTop.value}px`,
      left: `${cursorLeft.value}px`,
      opacity: `${props.isCleared ? 0 : 1}`
    }));

    const root = ref<Nullable<HTMLElement>>(null);

    const update = (): void => {
      if (!root.value) return;

      const { clientWidth: width, clientHeight: height } = root.value;
      cursorLeft.value = (props.saturation * width) / 100;
      cursorTop.value = ((100 - props.value) * height) / 100;
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

      ctx.emit('update:saturation', Math.round((left / rect.width) * 100));
      ctx.emit('update:value', 100 - Math.round((top / rect.height) * 100));
    };

    watch(
      () => [props.saturation, props.value],
      () => {
        update();
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

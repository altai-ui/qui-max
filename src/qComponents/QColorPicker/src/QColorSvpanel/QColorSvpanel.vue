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
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import type { PropType } from 'vue';

import type { Nullable } from '#/helpers';

import draggable from '../utils/draggable';
import type {
  QColorSvpanelPropHSVAModel,
  QColorSvpanelProps,
  QColorSvpanelInstance
} from './types';

export default defineComponent({
  name: 'QColorSvpanel',
  componentName: 'QColorSvpanel',

  props: {
    hsvaModel: {
      type: Object as PropType<QColorSvpanelPropHSVAModel>,
      required: true
    },
    isCursorShown: {
      type: Boolean,
      required: true
    }
  },

  emits: ['change'],

  setup(props: QColorSvpanelProps, ctx): QColorSvpanelInstance {
    const rootStyles = computed<Record<string, string>>(() => ({
      backgroundColor: `hsl(${props.hsvaModel.hue}, 100%, 50%)`
    }));

    const cursorTop = ref<number>(0);
    const cursorLeft = ref<number>(0);

    const cursorStyles = computed<Record<string, string | number>>(() => ({
      top: `${cursorTop.value}px`,
      left: `${cursorLeft.value}px`,
      opacity: props.isCursorShown ? 1 : 0
    }));

    const root = ref<Nullable<HTMLElement>>(null);

    const update = (): void => {
      if (!root.value) return;

      const { clientWidth: width, clientHeight: height } = root.value;
      cursorLeft.value = (props.hsvaModel.saturation * width) / 100;
      cursorTop.value = ((100 - props.hsvaModel.value) * height) / 100;
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

      ctx.emit('change', { ...props.hsvaModel, saturation, value });
    };

    watch(
      () => [props.hsvaModel.saturation, props.hsvaModel.value],
      () => {
        update();
      },
      { immediate: true }
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

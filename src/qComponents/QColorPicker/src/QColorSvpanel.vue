<template>
  <div ref="root" class="q-color-svpanel" :style="rootStyles">
    <div class="q-color-svpanel__cursor" :style="cursorStyles" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';

import draggable from './draggable';

const UPDATE_SATURATION_EVENT = 'update:saturation';
const UPDATE_VALUE_EVENT = 'update:value';

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
    }
  },

  emits: [UPDATE_SATURATION_EVENT, UPDATE_VALUE_EVENT],

  setup(props, { emit }) {
    const rootStyles = computed(() => ({
      backgroundColor: `hsl(${props.hue}, 100%, 50%)`
    }));

    const cursorTop = ref(0);
    const cursorLeft = ref(0);

    const cursorStyles = computed(() => ({
      top: `${cursorTop.value}px`,
      left: `${cursorLeft.value}px`
    }));

    const root = ref<HTMLElement | null>(null);

    const update = () => {
      if (!root.value) return;

      const { clientWidth: width, clientHeight: height } = root.value;
      cursorLeft.value = (props.saturation * width) / 100;
      cursorTop.value = ((100 - props.value) * height) / 100;
    };

    const handleDrag = (event: MouseEvent) => {
      if (!root.value) return;

      const rect = root.value.getBoundingClientRect();

      let left = event.clientX - rect.left;
      let top = event.clientY - rect.top;
      left = Math.min(Math.max(0, left), rect.width);
      top = Math.min(Math.max(0, top), rect.height);

      cursorLeft.value = left;
      cursorTop.value = top;

      emit(UPDATE_SATURATION_EVENT, (left / rect.width) * 100);
      emit(UPDATE_VALUE_EVENT, 100 - (top / rect.height) * 100);
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

    return { root, rootStyles, cursorStyles };
  }
});
</script>

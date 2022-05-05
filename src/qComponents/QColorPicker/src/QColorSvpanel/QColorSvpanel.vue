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
import { colord } from 'colord';
import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  nextTick,
  inject
} from 'vue';

import type { Nullable } from '#/helpers';

import type { QPickerDropdownProvider } from '../QPickerDropdown';
import draggable from '../utils/draggable';

import type { QColorSvpanelInstance } from './types';

export default defineComponent({
  name: 'QColorSvpanel',
  componentName: 'QColorSvpanel',

  emits: ['change'],

  setup(_, ctx): QColorSvpanelInstance {
    const qPickerDropdown = inject<QPickerDropdownProvider>(
      'qPickerDropdown',
      {} as QPickerDropdownProvider
    );

    const rootStyles = computed<Record<string, string>>(() => ({
      backgroundColor: `hsl(${qPickerDropdown.hsvaModel.hue}, 100%, 50%)`
    }));

    const cursorTop = ref<number>(0);
    const cursorLeft = ref<number>(0);

    const isCursorShown = computed<boolean>(() =>
      colord(qPickerDropdown.tempColor.value ?? '').isValid()
    );

    const cursorStyles = computed<Record<string, string>>(() => ({
      top: `${cursorTop.value}px`,
      left: `${cursorLeft.value}px`,
      opacity: isCursorShown.value ? '1' : '0'
    }));

    const root = ref<Nullable<HTMLElement>>(null);

    const update = (): void => {
      if (!root.value) return;

      const { clientWidth: width, clientHeight: height } = root.value;
      cursorLeft.value = (qPickerDropdown.hsvaModel.saturation * width) / 100;
      cursorTop.value =
        ((100 - qPickerDropdown.hsvaModel.value) * height) / 100;
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

      ctx.emit('change', { ...qPickerDropdown.hsvaModel, saturation, value });
    };

    watch(
      () => [
        qPickerDropdown.hsvaModel.saturation,
        qPickerDropdown.hsvaModel.value
      ],
      async () => {
        await nextTick();
        update();
      },
      { immediate: true }
    );

    onMounted(() => {
      if (root.value) {
        draggable(root.value, { drag: handleDrag, end: handleDrag });
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

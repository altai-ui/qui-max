<template>
  <div
    ref="dropdown"
    :style="{ zIndex }"
  >
    dropdown
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, ref } from 'vue';
import { createPopper, Instance } from '@popperjs/core';

import { getConfig } from '@/qComponents/config';
import { CLOSE_EVENT } from '@/qComponents/constants/events';

import type { QCascaderProvider } from './QCascader';
import type { QCascaderDropdownInstance } from './QCascaderDropdown';

const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QCascaderDropdown',
  componentName: 'QCascaderDropdown',

  emits: [CLOSE_EVENT],

  setup(_, ctx): QCascaderDropdownInstance {
    const qCascader = inject<QCascaderProvider>(
      'qCascader',
      {} as QCascaderProvider
    );

    const zIndex = ref<number>(getConfig('nextZIndex') ?? DEFAULT_Z_INDEX);
    const dropdown = ref<HTMLElement | null>(null);
    const popperJS = ref<Instance | null>(null);

    const closeDropdown = (e: KeyboardEvent | MouseEvent): void => {
      if (
        (e.type === 'keyup' && (e as KeyboardEvent).key === 'Escape') ||
        (e.type === 'click' &&
          !qCascader.popoverReference.value?.contains(
            e.target as HTMLElement
          ) &&
          !dropdown.value?.contains(e.target as HTMLElement))
      ) {
        ctx.emit(CLOSE_EVENT);
      }
    };

    const createPopperJs = (): void => {
      if (!qCascader.popoverReference.value || !dropdown.value) return;

      popperJS.value = createPopper(
        qCascader.popoverReference.value,
        dropdown.value,
        {
          placement: 'bottom-start',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8]
              }
            }
          ]
        }
      );
    };

    onMounted(() => {
      createPopperJs();

      document.addEventListener('keyup', closeDropdown, true);
      document.addEventListener('click', closeDropdown, true);
    });

    onUnmounted(() => {
      if (popperJS.value?.destroy) popperJS.value.destroy();

      document.removeEventListener('keyup', closeDropdown, true);
      document.removeEventListener('click', closeDropdown, true);
    });

    return {
      dropdown,
      zIndex
    };
  }
});
</script>

<template>
  <div
    ref="dropdown"
    class="q-cascader-dropdown"
    :style="{ zIndex }"
  >
    <q-cascader-column
      v-for="(column, columnIndex) in columnList"
      :key="`${uniqueId}-col-${columnIndex}`"
      role="menu"
      :aria-labelledby="uniqueId"
      :column-index="columnIndex"
      :column="column"
      @expand="expandRow"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  provide,
  onMounted,
  onUnmounted,
  ref,
  computed
} from 'vue';
import { createPopper, Instance } from '@popperjs/core';

import {
  ResizableElement,
  addResizeListener,
  removeResizeListener
} from '@/qComponents/helpers';
import { getConfig } from '@/qComponents/config';
import { CLOSE_EVENT } from '@/qComponents/constants/events';

import QCascaderColumn from '../QCascaderColumn/QCascaderColumn.vue';
import type { QCascaderProvider } from '../QCascader';

import type {
  MenuBar,
  QCascaderDropdownInstance,
  QCascaderDropdownProvider
} from './QCascaderDropdown';

const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QCascaderDropdown',
  componentName: 'QCascaderDropdown',

  components: {
    QCascaderColumn
  },

  emits: [CLOSE_EVENT],

  setup(_, ctx): QCascaderDropdownInstance {
    const qCascader = inject<QCascaderProvider>(
      'qCascader',
      {} as QCascaderProvider
    );

    const zIndex = ref<number>(getConfig('nextZIndex') ?? DEFAULT_Z_INDEX);
    const dropdown = ref<HTMLElement | null>(null);
    const popperJS = ref<Instance | null>(null);

    const expandedRows = ref<number[]>([]);

    const expandRow = (rowIndex: number, columnIndex: number): void => {
      const newExpandedRows = expandedRows.value.slice(0, columnIndex);
      newExpandedRows.push(rowIndex);
      expandedRows.value = newExpandedRows;
    };

    const columnList = computed<MenuBar[][]>(() => {
      const options = qCascader.options.value;
      if (!options) return [];

      const columns = [options];

      expandedRows.value.forEach((rowIndex, colIndex) => {
        const children = columns[colIndex][rowIndex].children;
        if (children) columns.push(children);
      });

      return columns;
    });

    const closeDropdown = (e: KeyboardEvent | MouseEvent): void => {
      const target = e.target as HTMLElement;

      if (
        (e.type === 'keyup' && (e as KeyboardEvent).key === 'Escape') ||
        (e.type === 'click' &&
          !qCascader.popoverReference.value?.$el?.contains(target) &&
          (!dropdown.value?.contains(target) || target === dropdown.value))
      ) {
        ctx.emit(CLOSE_EVENT);
      }
    };

    const createPopperJs = (): void => {
      if (!qCascader.popoverReference.value || !dropdown.value) return;

      popperJS.value = createPopper(
        qCascader.popoverReference.value.$el,
        dropdown.value,
        {
          placement: 'bottom-start',
          modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
        }
      );
    };

    onMounted(() => {
      createPopperJs();

      document.addEventListener('keyup', closeDropdown, true);
      document.addEventListener('click', closeDropdown, true);

      if (popperJS.value) {
        addResizeListener(
          qCascader.popoverReference.value?.$el as ResizableElement,
          popperJS.value.update
        );
      }
    });

    onUnmounted(() => {
      popperJS.value?.destroy();

      document.removeEventListener('keyup', closeDropdown, true);
      document.removeEventListener('click', closeDropdown, true);

      if (popperJS.value) {
        removeResizeListener(
          qCascader.popoverReference.value?.$el as ResizableElement,
          popperJS.value?.update
        );
      }
    });

    provide<QCascaderDropdownProvider>('qCascaderDropdown', {
      expandedRows
    });

    return {
      uniqueId: qCascader.uniqueId,
      dropdown,
      zIndex,
      columnList,
      expandRow
    };
  }
});
</script>

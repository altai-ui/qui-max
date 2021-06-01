<template>
  <tr ref="root">
    <th
      v-if="isSelectable"
      :ref="el => setColRef(el, 'selectableColumn')"
    />
    <th
      v-for="(column, index) in columnList"
      :key="index"
      :ref="el => setColRef(el, index)"
    />
  </tr>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  nextTick,
  ref,
  computed,
  reactive,
  watch,
  onBeforeUpdate,
  onUpdated,
  onMounted,
  onBeforeUnmount
} from 'vue';
import { isEmpty } from 'lodash-es';

import { addResizeListener, removeResizeListener } from '@/qComponents/helpers';
import type { QScrollbarProvider } from '@/qComponents/QScrollbar';

import { SELECTABLE_COLUMN_STICKY_INDEX } from '../config';
import type { QTableContainerProvider } from '../QTableContainer/QTableContainer';

import type {
  StickyGlobalConfig,
  QTableTStickyInstance
} from './QTableTSticky';

export default defineComponent({
  name: 'QTableTSticky',
  componentName: ' QTableTSticky',

  setup(): QTableTStickyInstance {
    const qTableContainer = inject<QTableContainerProvider>(
      'qTableContainer',
      {} as QTableContainerProvider
    );
    const qScrollbar = inject<QScrollbarProvider>(
      'qScrollbar',
      {} as QScrollbarProvider
    );

    const root = ref<HTMLElement | null>(null);

    const colRefs = ref<Record<string, HTMLElement>>({});
    const colSizes = ref<Record<string, { width: number; offsetLeft: number }>>(
      {}
    );

    const setColRef = (el: HTMLElement, key: number | string): void => {
      if (el) colRefs.value[String(key)] = el;
    };

    const getSizes = (): void => {
      Object.entries(colRefs.value).forEach(([key, el]) => {
        colSizes.value[String(key)] = {
          width: el.offsetWidth,
          offsetLeft: el.offsetLeft
        };
      });
    };

    const offsetsList = computed<Record<string, number>>(() => {
      if (isEmpty(colSizes.value)) return {};

      const result: Record<string, number> = {};

      const offset = { left: 0, right: 0 };
      const { selectableColumn } = colSizes.value;

      if (selectableColumn) {
        result['-1'] = 0;
        offset.left += selectableColumn.width;
      }

      const columnList = qTableContainer.columnList.value;

      columnList.forEach((column, index) => {
        if (column.sticky?.position !== 'left') return;

        result[index] = offset.left;
        offset.left += colSizes.value[index].width;
      });

      [...columnList].reverse().forEach((column, index) => {
        if (column.sticky?.position !== 'right') return;

        const recoveredIndex = columnList.length - index - 1;
        result[recoveredIndex] = offset.right;
        offset.right += colSizes.value[recoveredIndex].width;
      });

      return result;
    });

    const stickyConfig = reactive<StickyGlobalConfig>({
      columnsLeftNew: {},
      columnsRightNew: {}
    });

    getSizes();

    onBeforeUpdate(() => {
      colRefs.value = {};
    });

    onUpdated(() => {
      getSizes();
    });

    onMounted(() => {
      addResizeListener(root.value, getSizes);
    });

    onBeforeUnmount(() => {
      removeResizeListener(root.value, getSizes);
    });

    const checkSticky = (value: number = qScrollbar.moveXInPx.value): void => {
      const { selectableColumn } = colSizes.value;

      const columnsLeftNew: Record<string, number | null> = {};
      const columnsRightNew: Record<string, number | null> = {};

      if (selectableColumn) {
        if (value > (root.value?.offsetLeft ?? 0)) {
          columnsLeftNew[SELECTABLE_COLUMN_STICKY_INDEX] =
            offsetsList.value[String(SELECTABLE_COLUMN_STICKY_INDEX)];
        }
      }

      const columnList = qTableContainer.columnList.value;

      columnList.forEach((column, index) => {
        if (column.sticky?.position === 'left') {
          if (
            value >
            (colSizes.value[String(index)]?.offsetLeft ?? 0) -
              offsetsList.value[String(index)]
          ) {
            columnsLeftNew[index] = offsetsList.value[String(index)];
          }

          return;
        }

        if (column.sticky?.position === 'right') {
          const parent = root.value?.offsetParent as
            | HTMLElement
            | null
            | undefined;
          const grandParent = parent?.offsetParent as
            | HTMLElement
            | null
            | undefined;
          const grandParentWidth = grandParent?.offsetWidth ?? 0;

          if (
            grandParentWidth + value <
            (colSizes.value[String(index)]?.offsetLeft ?? 0) +
              (colSizes.value[String(index)]?.width ?? 0) +
              offsetsList.value[String(index)]
          ) {
            columnsRightNew[index] = offsetsList.value[String(index)];
          }
        }
      });

      stickyConfig.columnsLeftNew = columnsLeftNew;
      stickyConfig.columnsRightNew = columnsRightNew;
    };

    watch(
      [qScrollbar.moveXInPx, qScrollbar.sizeWidth, offsetsList],
      ([value]) => {
        nextTick(() => checkSticky(value ?? 0));
      }
    );

    return {
      stickyConfig,
      root,
      setColRef,
      isSelectable: qTableContainer.isSelectable,
      columnList: qTableContainer.columnList
    };
  }
});
</script>

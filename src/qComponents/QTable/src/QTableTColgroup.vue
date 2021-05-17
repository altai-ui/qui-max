<template>
  <colgroup>
    <col
      v-if="isSelectable"
      :style="{ width: `${checkboxColWidth}px` }"
    />
    <col
      v-for="(column, index) in columnList"
      :key="index"
      :style="getColWidth(column)"
    />
  </colgroup>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';

import type { QTableProvider } from './QTable';
import type {
  ExtendedColumn,
  QTableContainerProvider
} from './QTableContainer';
import type { QTableTColgroupInstance } from './QTableTColgroup.d';
import { CHECKBOX_COL_WIDTH } from './config';

export default defineComponent({
  name: 'QTableTColgroup',
  componentName: ' QTableTColgroup',

  setup(): QTableTColgroupInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);
    const qTableContainer = inject<QTableContainerProvider>(
      'qTableContainer',
      {} as QTableContainerProvider
    );

    const columnList = computed<ExtendedColumn[]>(
      () => qTableContainer.columnList.value ?? []
    );

    const getColWidth = ({
      width
    }: ExtendedColumn): Record<'width', string> => ({
      width: width ?? qTable.defaultColWidth.value ?? '200px'
    });

    return {
      checkboxColWidth: CHECKBOX_COL_WIDTH,
      isSelectable: qTableContainer.isSelectable,
      columnList,
      getColWidth
    };
  }
});
</script>

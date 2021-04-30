<template>
  <colgroup>
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

export default defineComponent({
  name: 'QTableTColgroup',
  componentName: ' QTableTColgroup',

  setup(): QTableTColgroupInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);
    const qTableContainer = inject<QTableContainerProvider | null>(
      'qTableContainer',
      null
    );

    const columnList = computed<ExtendedColumn[]>(
      () => qTableContainer?.columnList.value ?? []
    );

    const getColWidth = ({
      width
    }: ExtendedColumn): Record<'width', string> => ({
      width: width ?? qTable?.defaultColWidth.value ?? '200px'
    });

    return {
      columnList,
      getColWidth
    };
  }
});
</script>

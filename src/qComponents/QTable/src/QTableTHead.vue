<template>
  <tr class="q-table-t-head">
    <q-table-t-head-cell
      v-for="(column, index) in columnList"
      :key="`head-cell-${column.group.key}-${column.key}`"
      :column="column"
      :column-index="index"
      :sort-by="sortBy"
    />
  </tr>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';

import QTableTHeadCell from './QTableTHeadCell.vue';
import type { QTablePropSortBy, QTableProvider } from './QTable';
import type {
  ExtendedColumn,
  QTableContainerProvider
} from './QTableContainer';
import type { QTableTHeadInstance } from './QTableTHead';

export default defineComponent({
  name: 'QTableTHead',
  componentName: ' QTableTHead',

  components: {
    QTableTHeadCell
  },

  setup(): QTableTHeadInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);
    const qTableContainer = inject<QTableContainerProvider | null>(
      'qTableContainer',
      null
    );

    const columnList = computed<ExtendedColumn[]>(
      () => qTableContainer?.columnList.value ?? []
    );
    const sortBy = computed<QTablePropSortBy>(
      () => qTable?.sortBy.value ?? null
    );

    return {
      sortBy,
      columnList
    };
  }
});
</script>

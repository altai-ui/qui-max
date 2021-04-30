<template>
  <tr class="q-table-t-total">
    <q-table-t-total-cell
      v-for="(column, index) in columnList"
      :key="`total-cell-${column.group.key}-${column.key}`"
      :column="column"
      :column-index="index"
    />
  </tr>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';

import QTableTTotalCell from './QTableTTotalCell.vue';
import type {
  ExtendedColumn,
  QTableContainerProvider
} from './QTableContainer';
import type { QTableTTotalInstance } from './QTableTTotal';

export default defineComponent({
  name: 'QTableTTotal',
  componentName: ' QTableTTotal',

  components: {
    QTableTTotalCell
  },

  setup(): QTableTTotalInstance {
    const qTableContainer = inject<QTableContainerProvider | null>(
      'qTableContainer',
      null
    );

    const columnList = computed<ExtendedColumn[]>(
      () => qTableContainer?.columnList.value ?? []
    );

    return {
      columnList
    };
  }
});
</script>

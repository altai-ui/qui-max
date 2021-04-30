<template>
  <thead class="q-table-t-head">
    <tr class="q-table-t-head__row">
      <q-table-t-head-cell
        v-for="(column, index) in columnList"
        :key="`head-cell-${column.group.key}-${column.key}`"
        :index="index"
        :column="column"
        :sort-by="sortBy"
      />
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';

import QTableTHeadCell from './QTableTHeadCell.vue';
import type { QTableProvider } from './QTable';
import type { QTableContainerProvider } from './QTableContainer';
import type { QTableTHeadProps, QTableTHeadInstance } from './QTableTHead';

export default defineComponent({
  name: 'QTableTHead',
  componentName: ' QTableTHead',

  components: {
    QTableTHeadCell
  },

  props: {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props: QTableTHeadProps): QTableTHeadInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);
    const qTableContainer = inject<QTableContainerProvider | null>(
      'qTableContainer',
      null
    );

    const columnList = computed(() => qTableContainer?.columnList.value ?? []);
    const sortBy = computed(() => qTable?.sortBy.value ?? null);

    return {
      sortBy,
      columnList
    };
  }
});
</script>

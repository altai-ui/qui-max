<template>
  <div class="q-table-container">
    <q-scrollbar
      ref="scrollbar"
      theme="secondary"
    >
      <q-table-t />
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, inject } from 'vue';

import QTableT from './QTableT.vue';
import type { QTableProvider } from './QTable';
import type {
  QTableContainerProvider,
  QTableContainerInstance,
  ExtendedColumn
} from './QTableContainer';

export default defineComponent({
  name: 'QTableContainer',
  componentName: ' QTableContainer',

  components: {
    QTableT
  },

  setup(): QTableContainerInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);

    const columnList = computed<ExtendedColumn[]>(() => {
      const groups = qTable?.groupsOfColumns.value ?? [];

      return groups.reduce<ExtendedColumn[]>((acc, { columns, ...group }) => {
        const extendedColumns = columns.map(column => ({ group, ...column }));
        return acc.concat(extendedColumns);
      }, []);
    });

    provide<QTableContainerProvider>('qTableContainer', {
      columnList
    });

    return { columnList };
  }
});
</script>

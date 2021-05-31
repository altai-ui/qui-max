<template>
  <div class="q-table-container">
    <q-scrollbar ref="scrollbar" theme="secondary">
      <q-table-t />
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, inject } from 'vue';

import QTableT from '../QTableT/QTableT.vue';
import type { QTableProvider } from '../QTable';

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
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);

    const columnList = computed<ExtendedColumn[]>(() => {
      const groups = qTable.groupsOfColumns.value ?? [];

      return groups.reduce<ExtendedColumn[]>((acc, { columns, ...group }) => {
        const extendedColumns = columns
          .filter(({ isHidden }) => !isHidden)
          .map(column => ({ group, ...column }));
        return acc.concat(extendedColumns);
      }, []);
    });

    const isSelectable = computed<boolean>(() =>
      Boolean(qTable.selectionColumn.value?.enabled)
    );

    provide<QTableContainerProvider>('qTableContainer', {
      columnList,
      isSelectable
    });

    return { columnList };
  }
});
</script>

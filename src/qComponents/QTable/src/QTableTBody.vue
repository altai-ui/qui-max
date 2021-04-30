<template>
  <tbody class="q-table-t-body">
    <q-table-t-body-row
      v-for="(row, index) in rowsList"
      :key="randId(`body-row-${index}-`)"
      :row="row"
      :row-index="index"
    />
  </tbody>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';

import { randId } from '@/qComponents/helpers';
import QTableTBodyRow from './QTableTBodyRow.vue';
import type { QTableProvider } from './QTable';
import type { QTableTBodyInstance } from './QTableTBody';

export default defineComponent({
  name: 'QTableTBody',
  componentName: ' QTableTBody',

  components: {
    QTableTBodyRow
  },

  setup(): QTableTBodyInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);

    const rowsList = computed<Record<string, unknown>[]>(
      () => qTable?.rows.value ?? []
    );

    return {
      randId,
      rowsList
    };
  }
});
</script>

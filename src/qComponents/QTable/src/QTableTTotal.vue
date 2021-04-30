<template>
  <tr class="q-table-t-total">
    <q-table-t-total-cell
      v-for="(column, index) in columnList"
      :key="`total-cell-${column.group.key}-${column.key}`"
      :index="index"
      :column="column"
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
import type { QTableTTotalProps, QTableTTotalInstance } from './QTableTTotal';

export default defineComponent({
  name: 'QTableTTotal',
  componentName: ' QTableTTotal',

  components: {
    QTableTTotalCell
  },

  props: {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props: QTableTTotalProps): QTableTTotalInstance {
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

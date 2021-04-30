<template>
  <tr class="q-table-t-total">
    <q-table-t-body-cell
      v-for="(column, colIndex) in columnList"
      :key="randId(`body-row-${rowIndex}-cell-${colIndex}-`)"
      :row-index="rowIndex"
      :column="column"
      :column-index="colIndex"
      :value="getRowValue(column.key)"
    />
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, inject } from 'vue';

import { randId } from '@/qComponents/helpers';
import QTableTBodyCell from './QTableTBodyCell.vue';
import type {
  ExtendedColumn,
  QTableContainerProvider
} from './QTableContainer';
import type {
  QTableTBodyRowProps,
  QTableTBodyRowPropRow,
  QTableTBodyRowInstance
} from './QTableTBodyRow';

export default defineComponent({
  name: 'QTableTBodyRow',
  componentName: ' QTableTBodyRow',

  components: {
    QTableTBodyCell
  },

  props: {
    row: {
      type: Object as PropType<QTableTBodyRowPropRow>,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    }
  },

  setup(props: QTableTBodyRowProps): QTableTBodyRowInstance {
    const qTableContainer = inject<QTableContainerProvider | null>(
      'qTableContainer',
      null
    );

    const columnList = computed<ExtendedColumn[]>(
      () => qTableContainer?.columnList.value ?? []
    );

    const getRowValue = (key: string): unknown | null => props.row[key] ?? null;

    return {
      randId,
      columnList,
      getRowValue
    };
  }
});
</script>

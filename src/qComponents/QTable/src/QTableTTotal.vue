<template>
  <tr class="q-table-t-total">
    <q-table-cell-checkbox
      v-if="isSelectable"
      base-tag="th"
      base-class="q-table-t-total-cell"
      :checked="isChecked"
      :is-checkable="isCheckable"
      @change="handleCheckboxChange"
    />

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
import QTableCellCheckbox from './QTableCellCheckbox.vue';
import type { QTableProvider } from './QTable';
import type {
  ExtendedColumn,
  QTableContainerProvider
} from './QTableContainer';
import type { QTableTTotalInstance } from './QTableTTotal';
import { TOTAL_CHECKED_INDEX } from './config';

export default defineComponent({
  name: 'QTableTTotal',
  componentName: ' QTableTTotal',

  components: {
    QTableTTotalCell,
    QTableCellCheckbox
  },

  setup(): QTableTTotalInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);
    const qTableContainer = inject<QTableContainerProvider | null>(
      'qTableContainer',
      null
    );

    const isCheckable = computed<boolean>(() =>
      Boolean(qTable?.selectionColumn.value?.selectTotalShown)
    );

    const isChecked = computed<boolean>(
      () => qTable?.checkedRows.value?.includes(TOTAL_CHECKED_INDEX) ?? false
    );

    const columnList = computed<ExtendedColumn[]>(
      () => qTableContainer?.columnList.value ?? []
    );

    const handleCheckboxChange = (): void => {
      if (!qTable) return;

      const checkedRowsSet = new Set(qTable.checkedRows.value);

      if (isChecked.value) {
        checkedRowsSet.delete(TOTAL_CHECKED_INDEX);
      } else {
        checkedRowsSet.add(TOTAL_CHECKED_INDEX);
      }

      qTable.updateCheckedRows(Array.from(checkedRowsSet));
    };

    return {
      isSelectable: qTableContainer?.isSelectable ?? null,
      isCheckable,
      isChecked,
      columnList,
      handleCheckboxChange
    };
  }
});
</script>

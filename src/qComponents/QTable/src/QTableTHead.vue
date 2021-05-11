<template>
  <tr class="q-table-t-head">
    <q-table-cell-checkbox
      v-if="isSelectable"
      base-tag="th"
      base-class="q-table-t-head-cell"
      :checked="isChecked"
      :indeterminate="isIndeterminate"
      :is-checkable="isCheckable"
      @change="handleCheckboxChange"
    />

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
import { isEmpty } from 'lodash-es';

import QTableTHeadCell from './QTableTHeadCell.vue';
import QTableCellCheckbox from './QTableCellCheckbox.vue';
import type { QTablePropSortBy, QTableProvider } from './QTable';
import type {
  ExtendedColumn,
  QTableContainerProvider
} from './QTableContainer';
import type { QTableTHeadInstance } from './QTableTHead';
import { TOTAL_CHECKED_INDEX } from './config';

export default defineComponent({
  name: 'QTableTHead',
  componentName: ' QTableTHead',

  components: {
    QTableTHeadCell,
    QTableCellCheckbox
  },

  setup(): QTableTHeadInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);
    const qTableContainer = inject<QTableContainerProvider | null>(
      'qTableContainer',
      null
    );

    const isSelectable = computed<boolean>(() =>
      Boolean(qTable?.selectionColumn.value?.enabled)
    );

    const isCheckable = computed<boolean>(() =>
      Boolean(qTable?.selectionColumn.value?.selectAllShown)
    );

    const isTotalCheckable = computed<boolean>(
      () =>
        !isEmpty(qTable?.total.value) &&
        Boolean(qTable?.selectionColumn.value?.selectTotalShown)
    );

    const isChecked = computed<boolean>(() => {
      const rowsCount = qTable?.rows.value.length ?? 0;
      const checkedRowsCount = qTable?.checkedRows.value.length ?? 0;

      if (!checkedRowsCount) return false;
      if (isTotalCheckable.value) return rowsCount + 1 === checkedRowsCount;

      return rowsCount === checkedRowsCount;
    });

    const isIndeterminate = computed<boolean>(
      () => !isChecked.value && Boolean(qTable?.checkedRows.value.length ?? 0)
    );

    const columnList = computed<ExtendedColumn[]>(
      () => qTableContainer?.columnList.value ?? []
    );
    const sortBy = computed<QTablePropSortBy>(
      () => qTable?.sortBy.value ?? null
    );

    const handleCheckboxChange = (): void => {
      if (!qTable) return;

      const rowsLength = qTable?.rows.value.length ?? 0;
      let checkedRows: number[] = [];

      if (!isChecked.value) {
        checkedRows = Array.from(Array(rowsLength).keys());
        if (isTotalCheckable.value) checkedRows.push(TOTAL_CHECKED_INDEX);
      }

      qTable.updateCheckedRows(checkedRows);
    };

    return {
      isSelectable,
      isCheckable,
      isChecked,
      isIndeterminate,
      sortBy,
      columnList,
      handleCheckboxChange
    };
  }
});
</script>

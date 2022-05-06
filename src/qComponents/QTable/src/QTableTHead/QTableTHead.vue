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
      :dragged-column="draggedColumn"
      @drag="handleColumnDrag"
      @drop="handleColumnDrop"
    />
  </tr>
</template>

<script lang="ts">
import { isEmpty, cloneDeep } from 'lodash-es';
import { defineComponent, ref, computed, inject } from 'vue';

import type { Nullable } from '#/helpers';

import { TOTAL_CHECKED_INDEX } from '../config';
import QTableCellCheckbox from '../QTableCellCheckbox/QTableCellCheckbox.vue';
import type {
  ExtendedColumn,
  QTableContainerProvider
} from '../QTableContainer/types';
import type { QTablePropSortBy, QTableProvider } from '../types';

import QTableTHeadCell from './QTableTHeadCell/QTableTHeadCell.vue';
import type { QTableTHeadInstance } from './types';

export default defineComponent({
  name: 'QTableTHead',
  componentName: ' QTableTHead',

  components: {
    QTableTHeadCell,
    QTableCellCheckbox
  },

  setup(): QTableTHeadInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);
    const qTableContainer = inject<QTableContainerProvider>(
      'qTableContainer',
      {} as QTableContainerProvider
    );

    const isCheckable = computed<boolean>(() =>
      Boolean(qTable.selectionColumn.value?.selectAllShown)
    );

    const isTotalCheckable = computed<boolean>(
      () =>
        !isEmpty(qTable.total.value) &&
        Boolean(qTable.selectionColumn.value?.selectTotalShown)
    );

    const isChecked = computed<boolean>(() => {
      const rowsCount = qTable.rows.value.length ?? 0;
      const checkedRowsCount = qTable.checkedRows.value.length ?? 0;

      if (!checkedRowsCount) return false;
      if (isTotalCheckable.value) return rowsCount + 1 === checkedRowsCount;

      return rowsCount === checkedRowsCount;
    });

    const isIndeterminate = computed<boolean>(
      () => !isChecked.value && Boolean(qTable.checkedRows.value.length ?? 0)
    );

    const columnList = computed<ExtendedColumn[]>(
      () => qTableContainer.columnList.value ?? []
    );
    const sortBy = computed<QTablePropSortBy>(
      () => qTable.sortBy.value ?? null
    );

    const handleCheckboxChange = (): void => {
      if (!qTable) return;

      const rowsLength = qTable.rows.value.length ?? 0;
      let checkedRows: number[] = [];

      if (!isChecked.value) {
        checkedRows = Array.from(Array(rowsLength).keys());
        if (isTotalCheckable.value) checkedRows.push(TOTAL_CHECKED_INDEX);
      }

      qTable.updateCheckedRows(checkedRows);
    };

    const draggedColumn = ref<Nullable<ExtendedColumn>>(null);

    const handleColumnDrag = (column: ExtendedColumn): void => {
      draggedColumn.value = column;
    };

    const handleColumnDrop = (
      position?: 'left' | 'right',
      targetColumnKey?: string
    ): void => {
      if (!position || !targetColumnKey) {
        draggedColumn.value = null;
        return;
      }

      const groupKey = draggedColumn.value?.group.key;
      const columnKey = draggedColumn.value?.key;

      const groups = cloneDeep(qTable.groupsOfColumns.value);
      const currentGroup = groups.find(({ key }) => key === groupKey);

      if (!currentGroup) {
        draggedColumn.value = null;
        return;
      }

      const oldPositionIndex = currentGroup.columns.findIndex(
        ({ key }) => key === columnKey
      );
      const newPositionIndex = currentGroup.columns.findIndex(
        ({ key }) => key === targetColumnKey
      );

      if (
        oldPositionIndex === newPositionIndex ||
        (position === 'left' && oldPositionIndex + 1 === newPositionIndex) ||
        (position === 'right' && oldPositionIndex - 1 === newPositionIndex)
      ) {
        draggedColumn.value = null;
        return;
      }

      if (currentGroup?.columns) {
        currentGroup.columns.splice(
          newPositionIndex,
          0,
          currentGroup.columns.splice(oldPositionIndex, 1)[0]
        );
      }

      qTable.updateGroupsOfColumns(groups);
      draggedColumn.value = null;
    };

    return {
      isSelectable: qTableContainer.isSelectable,
      isCheckable,
      isChecked,
      isIndeterminate,
      sortBy,
      columnList,
      draggedColumn,
      handleCheckboxChange,
      handleColumnDrag,
      handleColumnDrop
    };
  }
});
</script>

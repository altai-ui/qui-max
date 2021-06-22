import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import type {
  QTablePropCheckedRows,
  QTablePropSortBy,
  QTablePropGroupsOfColumns,
  QTableProps
} from '@/qComponents/QTable';

import {
  groupsOfColumns,
  sortBy as sortByParams,
  rows,
  loadingRowCount
} from './args';

const QTableStory: Story<QTableProps> = args =>
  defineComponent({
    setup() {
      const checkedRows = ref<QTablePropCheckedRows>(args.checkedRows ?? null);
      const sortBy = ref<QTablePropSortBy>(args.sortBy ?? null);
      const groupsOfCols = ref<QTablePropGroupsOfColumns>(
        args.groupsOfColumns ?? null
      );

      const handleRowClick = (row: unknown, rowIndex: number): void => {
        // eslint-disable-next-line no-console
        console.log(rowIndex, row);
      };

      return {
        args,
        groupsOfCols,
        checkedRows,
        sortBy,
        handleRowClick
      };
    },
    template: `
      <q-table
        v-model:checked-rows="checkedRows"
        v-model:sort-by="sortBy"
        v-model:groups-of-columns="groupsOfCols"
        :fixed-layout="args.fixedLayout"
        :is-loading="args.isLoading"
        :loading-row-count="args.loadingRowCount"
        :grid="args.grid"
        :rows="args.rows"
        :total="args.total"
        :custom-row-class="args.customRowClass"
        :custom-row-style="args.customRowStyle"
        :selection-column="args.selectionColumn"
        @row-click="handleRowClick"
      >
        <template #customHeader="{ value }">
          {{ value }} custom
        </template>

        <template #customTotal="{ value }">
          {{ value }} custom
        </template>

        <template #customRow="{ value }">
          {{ value }} custom
        </template>
      </q-table>
    `
  });

QTableStory.args = {
  rows,
  sortBy: sortByParams,
  groupsOfColumns,
  loadingRowCount,
  fixedLayout: false
};

export default QTableStory;

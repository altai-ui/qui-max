// eslint-disable-next-line import/no-extraneous-dependencies
import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import type { QTableProps } from '@/qComponents/QTable';

import {
  groupsOfColumns,
  sortBy as sortByParams,
  rows,
  loadingRowCount
} from './args';

const QTableStory: Story<QTableProps> = args =>
  defineComponent({
    setup() {
      const checkedRows = ref(args.checkedRows ?? []);
      const sortBy = ref(args.sortBy ?? []);

      const handleRowClick = (row: unknown): void => {
        // eslint-disable-next-line no-console
        console.log(row);
      };
      const changeOrder = (order: unknown): void => {
        // eslint-disable-next-line no-console
        console.log(order);
      };

      return {
        args,
        checkedRows,
        sortBy,
        handleRowClick,
        changeOrder
      };
    },
    template: `
      <q-table
        v-model:checked-rows="checkedRows"
        v-model:sort-by="sortBy"
        :fixed-layout="args.fixedLayout"
        :is-loading="args.isLoading"
        :loading-row-count="args.loadingRowCount"
        :grid="args.grid"
        :groups-of-columns="args.groupsOfColumns"
        :rows="args.rows"
        :total="args.total"
        :custom-row-class="args.customRowClass"
        :custom-row-style="args.customRowStyle"
        :selection-column="args.selectionColumn"
        @change-order="changeOrder"
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

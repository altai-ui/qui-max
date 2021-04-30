// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

// import QCheckboxGroup from '@/qComponents/QCheckboxGroup';
import type { QTableProps } from '@/qComponents/QTable';

import { groupsOfColumns, sortBy, rows } from './args';

const QTableStory: Story<QTableProps> = args =>
  defineComponent({
    setup() {
      const handleRowClick = (row: unknown): void => {
        // eslint-disable-next-line no-console
        console.log(row);
      };
      const changeOrder = (order): void => {
        // eslint-disable-next-line no-console
        console.log(order);
      };

      const changeSort = (sort): void => {
        // eslint-disable-next-line no-console
        console.log('sort', sort);
      };

      return {
        args,
        handleRowClick,
        changeOrder,
        changeSort
      };
    },
    template: `
      <q-table
        :sort-by="args.sortBy"
        :fixed-layout="args.fixedLayout"
        :groups-of-columns="args.groupsOfColumns"
        :rows="args.rows"
        :total="args.total"
        :custom-row-class="args.customRowClass"
        :custom-row-style="args.customRowStyle"
        @change-order="changeOrder"
        @change-sort="changeSort"
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
  sortBy,
  groupsOfColumns,
  fixedLayout: false
};

export default QTableStory;

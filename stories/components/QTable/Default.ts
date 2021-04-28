// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

// import QCheckboxGroup from '@/qComponents/QCheckboxGroup';
import type { QTableProps } from '@/qComponents/QTable';

const QTableGroupStory: Story<QTableProps> = args =>
  defineComponent({
    setup() {
      const handleRowClick = (row: unknown): void => {
        console.log(row);
      };
      const changeOrder = (order): void => {
        console.log(order);
      };

      console.log(args);
      return {
        args,
        handleRowClick,
        changeOrder
      };
    },
    template: `
    <q-table
      ref="table"
      :default-sort="args.defaultSort"
      :fixed-layout="args.fixedLayout"
      :groups-of-columns="args.groupsOfColumns"
      :rows="args.rows"
      @change-order="changeOrder"
      @change-sort="changeSort"
      @row-click="handleRowClick"
    >
      <template #customHeader="{ value }">
        {{ value }} custom
      </template>

      <template #customRow="{ value }">
        {{ value }} custom
      </template>
    </q-table>
  `
  });

export default QTableGroupStory;

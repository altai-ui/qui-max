import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QPagination from '@/qComponents/QPagination';
import type { QPaginationProps } from '@/qComponents/QPagination';

const storyMetadata: Meta = {
  title: 'Components/QPagination',
  component: QPagination
};

const QPaginationStory: Story<QPaginationProps> = args =>
  defineComponent({
    components: { QPagination },
    setup() {
      const currentPage = ref<number>(args.currentPage);

      const handlePageChange = (value: number): void => {
        console.log('current-change', value);
        currentPage.value = value;
      };

      return { args, currentPage, handlePageChange };
    },

    template: `
      <q-pagination
        :page-count="args.pageCount"
        :total="args.total"
        :page-size="args.pageSize"
        :current-page="currentPage"
        :disabled="args.disabled"
        :pager-count="args.pagerCount"
        @current-change="handlePageChange"
      />
    `
  });

export const Default = QPaginationStory.bind({});
Default.args = {
  pageCount: 30,
  currentPage: 1,
  total: 300,
  pageSize: 10
};

export default storyMetadata;

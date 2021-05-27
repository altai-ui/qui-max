// eslint-disable-next-line import/no-extraneous-dependencies
import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

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
      return { args };
    },
    template: `
      <q-pagination
        :page-count="args.pageCount"
        :total="args.total"
        :page-size="args.pageSize"
        :current-page="args.currentPage"
        :disabled="args.disabled"
        :pager-count="args.pagerCount"
      />
    `
  });

QPaginationStory.storyName = 'Default';
QPaginationStory.args = {
  pageCount: 30,
  currentPage: 1,
  total: 300,
  pageSize: 10
};

export { QPaginationStory };
export default storyMetadata;

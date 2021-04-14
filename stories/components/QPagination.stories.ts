// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';

import QPagination from '@/qComponents/QPagination';

export default {
  title: 'Components/QPagination',
  component: QPagination
};

export const QPaginationStory: Story = args => ({
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

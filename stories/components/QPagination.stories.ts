import QPagination from '@/qComponents/QPagination';

export default {
  title: 'Components/QPagination',
  component: QPagination
};

export const QPaginationStory = (args: any) => ({
  components: { QPagination },
  setup() {
    return { args };
  },
  template: `
    <q-pagination
      v-bind="args"
      @current-change="handleCurrentChange"
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

import { groupsOfColumns, sortBy, rows, loadingRowCount } from './args';
import Template from './Default';

const CustomWidth = Template.bind({});

CustomWidth.args = {
  loadingRowCount,
  rows,
  sortBy,
  groupsOfColumns,
  fixedLayout: true
};

export default CustomWidth;

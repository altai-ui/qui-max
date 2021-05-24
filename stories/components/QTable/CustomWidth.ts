import Template from './Default';

import { groupsOfColumns, sortBy, rows, loadingRowCount } from './args';

const CustomWidth = Template.bind({});

CustomWidth.args = {
  loadingRowCount,
  rows,
  sortBy,
  groupsOfColumns,
  fixedLayout: true
};

export default CustomWidth;

import Template from './Default';

import { groupsOfColumns, sortBy, rows } from './args';

const CustomWidth = Template.bind({});

CustomWidth.args = {
  rows,
  sortBy,
  groupsOfColumns,
  fixedLayout: true
};

export default CustomWidth;

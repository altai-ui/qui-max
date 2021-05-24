import Template from './Default';

import { groupsOfColumns, total, sortBy, rows, loadingRowCount } from './args';

const Total = Template.bind({});

Total.args = {
  total,
  rows,
  sortBy,
  groupsOfColumns,
  loadingRowCount
};

export default Total;

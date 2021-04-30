import Template from './Default';

import { groupsOfColumns, total, sortBy, rows } from './args';

const Total = Template.bind({});

Total.args = {
  total,
  rows,
  sortBy,
  groupsOfColumns
};

export default Total;

import { groupsOfColumns, total, sortBy, rows, loadingRowCount } from './args';
import Template from './Default';

const Total = Template.bind({});

Total.args = {
  total,
  rows,
  sortBy,
  groupsOfColumns,
  loadingRowCount
};

export default Total;

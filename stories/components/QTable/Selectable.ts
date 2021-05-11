import Template from './Default';

import { groupsOfColumns, total, sortBy, rows } from './args';

const Selectable = Template.bind({});

Selectable.args = {
  total,
  rows,
  sortBy,
  groupsOfColumns,
  selectionColumn: {
    enabled: true,
    selectAllShown: true,
    selectTotalShown: true
  }
};

export default Selectable;

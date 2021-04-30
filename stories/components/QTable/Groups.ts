import Template from './Default';

import { total, sortBy, rows } from './args';

const Groups = Template.bind({});

Groups.args = {
  fixedLayout: true,
  rows,
  total,
  sortBy,
  groupsOfColumns: [
    {
      key: 'one',
      columns: [
        {
          key: 'col1',
          value: 'Column 1',
          formatter: (val): string => `formatted_${val}`
        }
      ]
    },
    {
      key: 'two',
      color: '#de4b7a',
      columns: [
        {
          key: 'col2',
          value: 'Column 2'
        },
        {
          key: 'col3',
          value: 'Column 3',
          sortable: true
        }
      ]
    },
    {
      color: '#74aff8',
      align: 'right',
      key: 'three',
      columns: [
        {
          key: 'col4',
          value: 'Column 4',
          sortable: true,
          slots: {
            header: 'customHeader',
            row: 'customRow'
          }
        },
        {
          key: 'col5',
          value: 'Column with very long title'
        },
        {
          key: 'col6',
          value: 'Column 6'
        }
      ]
    }
  ]
};

export default Groups;

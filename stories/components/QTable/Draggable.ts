import Template from './Default';
import { total, sortBy, rows, loadingRowCount } from './args';

const StickyColumn = Template.bind({});

StickyColumn.args = {
  total,
  rows,
  sortBy,
  loadingRowCount,
  fixedLayout: true,
  grid: true,
  selectionColumn: {
    enabled: true
  },
  groupsOfColumns: [
    {
      key: 'one',
      draggable: true,
      columns: [
        {
          key: 'col1',
          value: 'Column 1',
          width: '300px'
        },
        {
          key: 'col2',
          value: 'Column 2'
        },
        {
          key: 'col3',
          value: 'Column 3',
          width: '150px',
          sortable: true
        },
        {
          key: 'col4',
          value: 'Column 4',
          sortable: true
        },
        {
          key: 'col5',
          value: 'Column 5'
        },
        {
          key: 'col6',
          value: 'Column 6'
        },
        {
          key: 'col7',
          value: 'Column 7',
          width: '157px'
        },
        {
          key: 'col8',
          value: 'Column 8',
          width: '1000px'
        }
      ]
    }
  ]
};

export default StickyColumn;

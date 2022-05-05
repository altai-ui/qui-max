import { total, sortBy, rows, loadingRowCount } from './args';
import Template from './Default';

const Draggable = Template.bind({});

Draggable.args = {
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
      color: '#de4b7a',
      draggable: true,
      columns: [
        {
          key: 'col1',
          value: 'Column 1',
          width: '300px'
        },
        {
          key: 'col2',
          value: 'Column 2',
          draggable: false
        },
        {
          key: 'col3',
          value: 'Column 3',
          sortable: true
        },
        {
          key: 'col4',
          value: 'Column 4',
          sortable: true
        }
      ]
    },
    {
      key: 'two',
      color: '#74aff8',
      draggable: true,
      columns: [
        {
          key: 'col5',
          value: 'Column 5',
          sortable: true,
          align: 'right'
        },
        {
          key: 'col6',
          value: 'Column 6',
          align: 'right'
        },
        {
          key: 'col7',
          value: 'Column 7',
          width: '157px'
        },
        {
          key: 'col8',
          value: 'Column 8',
          width: '500px'
        }
      ]
    }
  ]
};

export default Draggable;

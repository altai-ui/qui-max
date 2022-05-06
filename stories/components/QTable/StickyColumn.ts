import { total, sortBy, rows, loadingRowCount } from './args';
import Template from './Default';

const StickyColumn = Template.bind({});

StickyColumn.args = {
  total,
  rows,
  sortBy,
  loadingRowCount,
  fixedLayout: true,
  grid: true,
  selectionColumn: {
    enabled: true,
    sticky: true
  },
  groupsOfColumns: [
    {
      key: 'one',
      columns: [
        {
          key: 'col1',
          value: 'Column 1',
          formatter: (val: unknown): string => `formatted_${val}`,
          width: '300px'
        },
        {
          key: 'col2',
          value: 'Column 2 sticky',
          sticky: {
            position: 'left'
          }
        },
        {
          key: 'col3',
          value: 'Column 3 sticky',
          width: '150px',
          sortable: true,
          sticky: {
            position: 'left'
          }
        },
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
          value: 'Column 5 sticky',
          sticky: {
            position: 'right'
          }
        },
        {
          key: 'col6',
          value: 'Column 6 sticky',
          sticky: {
            position: 'left'
          }
        },
        {
          key: 'col7',
          value: 'Column 7 sticky',
          width: '157px',
          sticky: {
            position: 'right'
          }
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

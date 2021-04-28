import Template from './Default';

const StickyColumn = Template.bind({});

StickyColumn.args = {
  groupsOfColumns: [
    {
      key: 'one',
      columns: [
        {
          key: 'col1',
          value: 'Column 1',
          formatter: val => `formatted_${val}`,
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
          value: 'Column 3',
          width: '150px',
          sortable: true
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
          value: 'Column 6'
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
  ],
  selectableColumn: {
    sticky: true,
    totalCheckboxPosition: 'total'
  },
  fixedLayout: true,
  grid: true,
  total: {
    col1: 'Total 100',
    col2: 'Total 200',
    col3: 'Total 300',
    col4: 'Total 400',
    col5: 'Total 500',
    col6: 'Total 600',
    col7: 'Total 700',
    col8: 'Total 800'
  }
};

export default StickyColumn;

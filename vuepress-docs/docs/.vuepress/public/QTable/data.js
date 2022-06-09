const groupsOfColumns = [
  {
    key: 'one',
    columns: [
      {
        key: 'col1',
        value: 'Column 1',
        formatter: val => `formatted ${val}`
      },
      {
        key: 'col2',
        value: 'Column 2'
      },
      {
        key: 'col3',
        value: 'Column 3',
        sortable: true
      },
      {
        key: 'col4',
        value: 'Column 4',
        sortable: true,
        slots: {
          header: 'customHeader',
          total: 'customTotal',
          row: 'customRow'
        }
      },
      {
        key: 'col5',
        value: 'Column with a very long title with ellipsis in the second line'
      },
      {
        key: 'col6',
        value: 'Column 6'
      },
      {
        key: 'col7',
        value: 'Column 6'
      },
      {
        key: 'col8',
        value: 'Column 6'
      }
    ]
  }
];

const sortBy = {
  key: 'col4',
  direction: 'ascending'
};

const rows = [
  {
    col1: 12,
    col2: 332,
    col3: 11,
    col4: 33,
    col5: 324,
    col6: 678,
    col7: 100,
    col8: 54
  },
  {
    col1: 354,
    col2: 11,
    col3: 777,
    col4: 'Excepteur',
    col5: 456,
    col6: 45,
    col7: 65,
    col8: 34
  },
  {
    col1: 4,
    col2: 8,
    col3: 15,
    col4: 16,
    col5: 23,
    col6: 42,
    col7: 'Lost',
    col8: 'Swan'
  }
];

const total = {
  col2: 'Total 200',
  col1: 'Total 100',
  col4: 'Total 400',
  col3: 'Total 300',
  col6: 'Total 600',
  col5: 'Total 500',
  col7: 'Total 700',
  col8: 'Total 800'
};

const loadingRowCount = 3;

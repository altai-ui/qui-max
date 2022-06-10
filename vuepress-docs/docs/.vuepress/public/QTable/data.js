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
        sortable: true,
        slots: {
          header: 'customHeader',
          total: 'customTotal',
          row: 'customRow'
        }
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
    col4: 33
  },
  {
    col1: 354,
    col2: 11,
    col3: 777,
    col4: 'Excepteur'
  },
  {
    col1: 4,
    col2: 8,
    col3: 15,
    col4: 16
  }
];

const total = {
  col1: 'Total 100',
  col2: 'Total 400',
  col3: 'Total 300',
  col4: 'Total 300'
};

const loadingRowCount = 3;

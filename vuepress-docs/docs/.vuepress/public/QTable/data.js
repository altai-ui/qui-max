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
        value: 'ddd 3',
        sortable: true,
        slots: {
          header: 'custom-header',
          total: 'custom-total',
          row: 'custom-row'
        }
      }
    ]
  }
];

const sortBy = {
  key: 'col3',
  direction: 'ascending'
};

const rows = [
  {
    col1: 12,
    col2: 332,
    col3: 11
  },
  {
    col1: 354,
    col2: 11,
    col3: 777
  },
  {
    col1: 4,
    col2: 8,
    col3: 15
  }
];

const total = {
  col1: 'Total 370',
  col2: 'Total 351',
  col3: 'Total 803'
};

const loadingRowCount = 3;

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

const groupsOfColumnsAllTypes = [
  {
    key: 'one',
    draggable: true,
    color: '#de4b7a',
    columns: [
      {
        key: 'col1',
        value: 'Column 1',
        formatter: val => `formatted ${val}`
      },
      {
        key: 'col2',
        value: 'Sticky Column',
        sticky: {
          position: 'left'
        }
      },
      {
        key: 'col3',
        value: 'ddd 3',
        slots: {
          header: 'custom-header',
          total: 'custom-total',
          row: 'custom-row'
        }
      }
    ]
  },
  {
    key: 'two',
    draggable: true,
    color: '#74aff8',
    columns: [
      {
        key: 'col4',
        value: 'Column 4',
        sortable: true
      },
      {
        key: 'col5',
        value: 'Column 5'
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
    col4: 111,
    col5: 123
  },
  {
    col1: 354,
    col2: 11,
    col3: 777,
    col4: 666,
    col5: 123
  },
  {
    col1: 4,
    col2: 8,
    col3: 15,
    col4: 16,
    col5: 23
  }
];

const total = {
  col1: 'Total 370',
  col2: 'Total 351',
  col3: 'Total 803',
  col4: 'Total 793',
  col5: 'Total 269'
};

const loadingRowCount = 3;

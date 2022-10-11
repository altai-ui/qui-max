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
        value: 'Column 3',
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
    col1: 'Lorem ipsum dolor sit amet',
    col2: 'Consectetur adipiscing elitSed.',
    col3: 'Do eiusmod tempor incididunt ut',
    col4: 'labore et dolore magna aliqua',
    col5: 'Ut enim ad minim veniam'
  },
  {
    col1: 'quis nostrud exercitation ullamco laboris',
    col2: 'nisi ut aliquip ex',
    col3: 'ea commodo consequat',
    col4: 'Duis aute irure dolor in reprehenderit',
    col5: 'in voluptate velit esse cillum dolore'
  },
  {
    col1: 'eu fugiat nulla pariatur',
    col2: 'Excepteur sint occaecat cupidatat',
    col3: 'non proident, sunt in culpa qui',
    col4: 'officia deserunt mollit anim id',
    col5: 'est laborum.'
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

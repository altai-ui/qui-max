import type { QTablePropSortBy } from '@/qComponents/QTable';

const groupsOfColumns = [
  {
    key: 'one',
    columns: [
      {
        key: 'col1',
        value: 'Column 1',
        formatter: (val: unknown): string => `formatted_${val}`
      },
      {
        key: 'col2',
        value: 'Column 2'
      },
      {
        key: 'col3',
        value: 'Column 3',
        sortable: true,
        sortOrder: ['ascending', 'descending']
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
      }
    ]
  }
];

const sortBy: QTablePropSortBy = {
  key: 'col4',
  direction: 'ascending'
};

const rows = [
  {
    col1: 'Lorem ipsum dolor sit amet',
    col2: 'Consectetur adipiscing elit',
    col3: 'Sed do eiusmod tempor incididunt',
    col4: 'Ut labore et dolore magna aliqua',
    col5: 'Ut enim ad minim veniam',
    col6: 'Phasellus nunc lorem, blandit non tristique a',
    col7: 'Vivamus orci diam, laoreet quis urna in, tincidunt bibendum nunc',
    col8: 'Nullam velit elit, congue nec vulputate vitae'
  },
  {
    col1: 'Nisi ut aliquip ex ea commodo consequat',
    col2: 'Duis aute irure dolor in reprehenderit',
    col3: 'In voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    col4: 'Excepteur sint occaecat cupidatat non proident',
    col5: 'Nulla laoreet, risus ac lacinia rhoncus, ex massa semper sem.',
    col6: 'Duis leo nulla, volutpat eget rutrum nec, consequat at tortor',
    col7: 'Integer ac pulvinar sapien, id iaculis ligula. Nullam id arcu',
    col8: 'Aenean id tincidunt tortor. Sed tempus tempus nibh, a congue'
  },
  {
    col1: 'Integer commodo neque sed purus porttitor interdum. Duis dapibus finibus ex, sit amet iaculis nunc posuere id. Mauris consequat, lacus',
    col2: 'Curabitur aliquet bibendum risus, in malesuada nisl suscipit ac. In hac habitasse platea dictumst. Integer lobortis sed lorem vel dignissim',
    col3: 'Integer lobortis ornare ex eget sagittis. Praesent consectetur tempor tortor a vehicula. Nulla facilisi. Sed eu nunc rutrum, sagittis magna',
    col4: 'Mauris gravida lacus at laoreet pharetra. Pellentesque eu lectus tellus. Morbi scelerisque lobortis dui in aliquet',
    col5: 'Donec lorem ante, malesuada fermentum posuere vitae, tincidunt in leo',
    col6: 'Curabitur nunc purus, placerat id tellus ut, gravida pulvinar est',
    col7: 'Proin posuere, justo a porttitor posuere, lectus nunc rhoncus libero',
    col8: 'Maecenas metus felis, porttitor nec aliquam ut, fermentum nec mi'
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

export { groupsOfColumns, sortBy, rows, total, loadingRowCount };

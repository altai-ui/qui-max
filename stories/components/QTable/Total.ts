import Template from './Default';

const Total = Template.bind({});

Total.args = {
  defaultSort: {
    key: 'col1',
    direction: 'descending'
  },
  fixedLayout: false,
  groupsOfColumns: [
    {
      key: 'one',
      columns: [
        {
          key: 'col1',
          value: 'Column 1',
          formatter: (val: string): string => `formatted_${val}`
        },
        {
          key: 'col2',
          value: 'Column 2'
        },
        {
          key: 'col3',
          value: 'Column 3'
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
          value: 'Column with very long title'
        },
        {
          key: 'col6',
          value: 'Column 6'
        }
      ]
    }
  ],
  rows: [
    {
      col1: 'Lorem ipsum dolor sit amet',
      col2: 'consectetur adipiscing elit',
      col3: 'sed do eiusmod tempor incididunt',
      col4: 'ut labore et dolore magna aliqua.',
      col5: 'Ut enim ad minim veniam',
      col6: 'quis nostrud exercitation ullamco laboris',
      col8: 'quis nostrud exercitation ullamco laboris',
      col7: 'quis nostrud exercitation ullamco laboris'
    },
    {
      col1: 'nisi ut aliquip ex ea commodo consequat',
      col2: 'Duis aute irure dolor in reprehenderit',
      col3: 'in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      col4: 'Excepteur sint occaecat cupidatat non proident',
      col5: 'sunt in culpa qui officia deserunt mollit anim id est laborum',
      col6: 'sunt in culpa qui officia deserunt mollit anim id est laborum',
      col7: 'sunt in culpa qui officia deserunt mollit anim id est laborum',
      col8: 'sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
      col1:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      col2:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      col3:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      col4:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      col5:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      col6:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      col7:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      col8:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ],
  total: {
    col1: 'Total 100',
    col2: 'Total 200',
    col3: 'Total 300',
    col4: 'Total 400',
    col5: 'Total 500',
    col6: 'Total 600'
  }
};

export default Total;

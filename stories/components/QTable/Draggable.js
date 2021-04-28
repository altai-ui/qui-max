import Template from './Default';

const Draggable = Template.bind({});

Draggable.args = {
  fixedLayout: true,
  groupsOfColumns: [
    {
      key: 'one',
      color: '#de4b7a',
      draggable: true,
      columns: [
        {
          key: 'col1',
          value: 'Column 1',
          formatter: val => `formatted_${val}`
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
            row: 'customRow'
          }
        },
        {
          key: 'col5',
          value: 'Column 5'
        },
        {
          key: 'col6',
          value: 'Column 6'
        }
      ]
    }
  ]
};

export default Draggable;

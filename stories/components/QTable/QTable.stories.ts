// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta } from '@storybook/vue3';

import QTable from '@/qComponents/QTable';

import Default from './Default';
import CustomWidth from './CustomWidth';
import Selectable from './Selectable';
import Total from './Total';
import StickyColumn from './StickyColumn';
import CustomRows from './CustomRows';
import Groups from './Groups';
import Draggable from './Draggable';

const storyMetadata: Meta = {
  title: 'Components/QTable',
  component: QTable,
  decorators: [
    (): Record<'template', string> => ({
      template: '<div style="width: 90vw;"><story /></div>'
    })
  ],
  argTypes: {
    total: {
      control: { type1: 'object' }
    },

    childrenKey: {
      table: { disable: true }
    },
    expandable: {
      table: { disable: true }
    },
    indentSize: {
      table: { disable: true }
    },
    uniqueKey: {
      table: { disable: true }
    },
    pagesInExpand: {
      table: { disable: true }
    }
  },
  args: {
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
    changeSort(sort) {
      // eslint-disable-next-line no-console
      console.log('sort', sort);
    }
  }
};

export {
  Default,
  CustomWidth,
  Selectable,
  Total,
  StickyColumn,
  CustomRows,
  Groups,
  Draggable
};
export default storyMetadata;

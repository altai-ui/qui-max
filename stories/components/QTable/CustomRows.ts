import Template from './Default';

import { groupsOfColumns, rows } from './args';

const CustomRows = Template.bind({});

CustomRows.args = {
  groupsOfColumns,
  rows,
  customRowClass: ({ rowIndex }): string => `custom-row-class-${rowIndex}`,
  customRowStyle: ({ rowIndex }): string => {
    if (rowIndex === 0) {
      return '--row-custom-border-color: var(--color-secondary-green)';
    }
    if (rowIndex === 1) {
      return '--row-custom-border-color: var(--color-secondary-orange)';
    }
    if (rowIndex === 2) {
      return '--row-custom-border-color: #f2d22b';
    }

    return '';
  }
};

export default CustomRows;

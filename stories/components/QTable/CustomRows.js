import Template from './Default';

const CustomRows = Template.bind({});

CustomRows.args = {
  customRowClass: ({ rowIndex }) => {
    if (rowIndex === 0) {
      return 'red-row';
    }

    if (rowIndex === 1) {
      return 'green-row';
    }

    return '';
  },
  customRowStyle: ({ rowIndex }) => {
    if (rowIndex === 2) {
      return { '--row-custom-border-color': '#ff0' };
    }

    return '';
  }
};

export default CustomRows;

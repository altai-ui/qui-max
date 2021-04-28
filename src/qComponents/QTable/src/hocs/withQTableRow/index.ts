import { defineComponent, h } from 'vue';

const renderedChilds = ({
  renderContext,
  childrenKey,
  listeners,
  component,
  children,
  props,
  scopedSlots
}) => {
  return children.reduce((acc, row) => {
    const renderingArray = [];

    renderingArray.push(
      renderContext(component, {
        props: {
          ...props,
          indent: row.indent,
          row
        },
        on: { ...listeners },
        scopedSlots
      })
    );

    if (row[childrenKey]) {
      const renderedData = {
        renderContext,
        childrenKey,
        component,
        listeners,
        props,
        scopedSlots,
        children: row.data[childrenKey]
      };

      renderingArray.push(renderedChilds(renderedData));
    }

    return [...acc, ...renderingArray];
  }, []);
};

// const withQTableRow = defineComponent({
const withQTableRow = QTableRow => ({
  name: 'withQTableRow',

  setup(props, ctx) {
    console.log(props, ctx);
    const { listeners, slots, data } = context;
    const { childrenKey, row } = props;
    const renderingArray = [];

    if (row.data[childrenKey]) {
      const renderedData = {
        renderContext,
        childrenKey,
        component: QTableRow,
        listeners,
        children: row.data[childrenKey],
        props,
        scopedSlots
      };

      if (row.isTreeOpened) renderingArray.push(renderedChilds(renderedData));
    }

    return () => [renderContext(QTableRow, { ...data }), ...renderingArray];
  }

  // render(renderContext, context) {
  //   console.log(renderContext, context);
  //   const { props, listeners, scopedSlots, data } = context;
  //   const { childrenKey, row } = props;

  // }
});

export default withQTableRow;

<template>
  <tr
    ref="root"
    :class="rowClass"
    :style="getRowStyle"
    @click="rowClick && rowClick(row)"
  >
    <td
      v-if="isSelectable"
      class="q-table__cell q-table__cell_selectable"
      :observer-key="isSelectableColumnSticked && 'q-table-checkboxes'"
      :style="firstTdStyle"
    >
      <div
        v-if="canRowExpand(0)"
        class="q-table__expand-arrow"
        :class="openedTreeClass"
        @click="handleExpandClick"
      >
        <span class="q-icon-triangle-right" />
      </div>
      <q-checkbox
        :model-value="isChecked"
        @change="handleCheckboxClick"
      />
    </td>
    <td
      v-for="(column, columnIndex) in columns"
      :key="column.key"
      :style="getCellStyle(columnIndex)"
      :align="column.align || 'left'"
      :observer-key="column.sticky ? column.key : null"
      class="q-table__cell"
    >
      <div
        v-if="!isSelectable && canRowExpand(columnIndex)"
        class="q-table__expand-arrow"
        :class="openedTreeClass"
        @click="handleExpandClick"
      >
        <span class="q-icon-triangle-right" />
      </div>

      <div
        v-if="column.customCellClass"
        :class="column.customCellClass"
      >
        <slot
          :row-data="updateRow(row.data, columnIndex, column.key, column)"
          name="row"
        />

        <slot
          v-if="checkLoader(columnIndex)"
          :row-data="row"
          name="loader"
        />
      </div>

      <template v-else>
        <slot
          :row-data="updateRow(row.data, columnIndex, column.key, column)"
          name="row"
        />

        <slot
          v-if="checkLoader(columnIndex)"
          :row-data="row"
          name="loader"
        />
      </template>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { get } from 'lodash-es';

export default defineComponent({
  name: 'QTableRow',
  componentName: 'QTableRow',

  props: {
    row: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    expandable: {
      type: Boolean,
      default: false
    },
    indent: {
      type: Number,
      default: 0
    },
    indentSize: {
      type: Number,
      default: 16
    },
    pagesInExpand: {
      type: [Boolean, String],
      default: false
    },
    customRowClass: {
      type: Function,
      default: null
    },
    customRowStyle: {
      type: Function,
      default: null
    },
    rowClick: {
      type: Function,
      default: null
    },
    isSelectable: {
      type: Boolean,
      default: false
    },
    isSelectableColumnSticked: {
      type: Boolean,
      default: false
    },
    checkedRows: {
      type: Array,
      default: () => []
    }
  },

  emits: ['check', 'expand-click'],

  setup(props, ctx) {
    const root = ref<HTMLElement | null>(null);

    const isChecked = computed(() =>
      props.checkedRows.includes(props.rowIndex)
    );

    const handleCheckboxClick = isChecked => {
      ctx.emit('check', {
        isChecked,
        row: props.row,
        rowIndex: props.rowIndex
      });
    };

    const getRowStyle = computed(
      () =>
        props.customRowStyle &&
        props.customRowStyle({
          row: props.row,
          rowIndex: props.rowIndex
        })
    );

    const rowClass = computed(() => {
      const rowClasses = {};

      if (props.customRowClass) {
        const newClass = props.customRowClass({
          row: props.row,
          rowIndex: props.rowIndex
        });

        rowClasses[newClass] = true;
      }

      if (getRowStyle.value) {
        rowClasses['custom-border'] = Boolean(props.customRowStyle);
      }

      if (props.rowClick) {
        const newClass = 'q-table__row_is-interactive';

        rowClasses[newClass] = true;
      }

      if (!props.indent) return rowClasses;

      rowClasses[
        `q-table__row-level-${props.indent / props.indentSize}`
      ] = true;

      return rowClasses;
    });

    const openedTreeClass = computed<string>(() =>
      props.row.isTreeOpened ? 'q-table__expand-arrow_opened' : ''
    );
    const firstTdStyle = ref('');

    const checkLoader = columnIndex => {
      return props.row[props.pagesInExpand] && !columnIndex;
    };

    const canRowExpand = columnIndex => {
      return (
        props.expandable &&
        columnIndex === 0 &&
        Boolean(props.row.data[props.childrenKey]?.length)
      );
    };

    const handleExpandClick = () => {
      ctx.emit('expand-click', props.row);
    };

    const getFirstTdStyle = () => {
      if (!props.isSelectable || !props.row.data[props.childrenKey]?.length)
        return;

      const elm = root.value?.querySelector('td:first-child');

      if (!elm || !props.indent) return;

      const paddingLeft = window
        .getComputedStyle(elm)
        .paddingLeft.replace(/\D/g, '');

      firstTdStyle.value = {
        paddingLeft: `${Number(paddingLeft) + props.indent}px`
      };
    };

    const getCellStyle = index => {
      const style = {};

      if (!props.indent) return style;

      if (index === 0 && !props.isSelectable && root.value) {
        const elm = root.value.querySelector('td:first-child');

        if (elm) {
          const paddingLeft = window
            .getComputedStyle(elm)
            .paddingLeft.replace(/\D/g, '');

          style.paddingLeft = `${Number(paddingLeft) + props.indentSize}px`;
        }
      }

      return style;
    };

    const updateRow = (row, index, key, column) => {
      let value = get(row.data || row, key);

      if (column.formatter) {
        value = column.formatter(value, row, column);
      }

      return {
        key,
        index,
        value,
        indent: props.indent,
        column,
        data: row
      };
    };

    onMounted(() => {
      getFirstTdStyle();
    });

    return {
      isChecked,
      openedTreeClass,
      rowClass,
      getRowStyle,
      handleCheckboxClick,
      checkLoader,
      canRowExpand,
      handleExpandClick,
      getCellStyle,
      updateRow
    };
  }
});
</script>

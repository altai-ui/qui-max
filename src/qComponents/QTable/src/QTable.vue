<template>
  <div
    ref="root"
    :class="rootClasses"
  >
    <q-table-empty
      v-if="isTableEmpty"
      :empty-text="emptyText"
    >
      <slot name="empty" />
    </q-table-empty>

    <q-table-container v-else />
  </div>
</template>

<script lang="ts">
import { isEmpty, isFunction } from 'lodash-es';
import { defineComponent, computed, provide, toRef } from 'vue';
import type { PropType } from 'vue';

import type { ClassValue } from '#/helpers';

import QTableContainer from './QTableContainer/QTableContainer.vue';
import QTableEmpty from './QTableEmpty/QTableEmpty.vue';
import type {
  QTablePropGrid,
  QTablePropFixedLayout,
  QTablePropIsLoading,
  QTablePropLoadingRowCount,
  QTablePropDefaultColWidth,
  QTablePropSelectionColumn,
  QTablePropGroupsOfColumns,
  QTablePropTotal,
  QTablePropRows,
  QTablePropCheckedRows,
  QTablePropSortBy,
  QTablePropCustomRowClass,
  QTablePropCustomRowStyle,
  QTablePropEmptyText,
  QTableProps,
  Row,
  QTableProvider,
  QTableInstance
} from './types';

export default defineComponent({
  name: 'QTable',

  componentName: ' QTable',

  components: {
    QTableContainer,
    QTableEmpty
  },

  props: {
    /**
     * whether QTable has vertical border
     */
    grid: {
      type: Boolean as PropType<QTablePropGrid>,
      default: false
    },
    /**
     * do not shrink column's width as native table does
     * (change `defaultColWidth` or pass the `width` to each column object for managing the width)
     */
    fixedLayout: {
      type: Boolean as PropType<QTablePropFixedLayout>,
      default: true
    },
    /**
     * whether to show skeleton
     */
    isLoading: {
      type: Boolean as PropType<QTablePropIsLoading>,
      default: false
    },
    /**
     * count of rows, when table is loading
     */
    loadingRowCount: {
      type: Number as PropType<QTablePropLoadingRowCount>,
      default: 30
    },
    /**
     * Default columns width, required `fixedLayout: true`
     */
    defaultColWidth: {
      type: String as PropType<QTablePropDefaultColWidth>,
      default: null
    },
    /**
     * Checkboxes column settings.
     */
    selectionColumn: {
      type: Object as PropType<QTablePropSelectionColumn>,
      default: null
    },
    /**
     * `groupsOfColumns` MUST contain one or more groups of columns,
     * Each group MUST contain `key` and `columns` - array of objects.
     * Each group MAY contain:
     *  `color` (hex string) - column's header color.
     * Each column MUST contain `key` and `value`.
     * Each column MAY contain:
     *  `isHidden`.
     *  `sortable`.
     *  `sortOrder`. (MUST be an array of keywords - 'ascending', 'descending', null. Works with `sortable: true`)
     *  `draggable`.
     *  `slots`.
     *  `align` (left/right) - content's align.
     *  `width` (works with `fixedLayout: true`).
     *  `minWidth` (works with `fixedLayout: false`).
     *  `customCellClass`.
     *  `formatter` (fn).
     */
    groupsOfColumns: {
      type: Array as PropType<QTablePropGroupsOfColumns>,
      required: true
    },
    /**
     * Object, `[column.key]: value` pair, not all are required
     */
    total: {
      type: Object as PropType<QTablePropTotal>,
      default: null
    },
    /**
     * Array of objects, each object must contain `[column.key]: value` pair
     */
    rows: {
      type: Array as PropType<QTablePropRows>,
      required: true
    },
    /**
     * Array of checked rows indexs
     */
    checkedRows: {
      type: Array as PropType<QTablePropCheckedRows>,
      default: null
    },
    /**
     * used to set sort the table
     */
    sortBy: {
      type: Object as PropType<QTablePropSortBy>,
      default: null
    },
    /**
     * used to set classes for a row
     */
    customRowClass: {
      type: Function as unknown as PropType<QTablePropCustomRowClass>,
      default: null
    },
    /**
     * used to set styles for a row
     */
    customRowStyle: {
      type: Function as unknown as PropType<QTablePropCustomRowStyle>,
      default: null
    },
    /**
     * used to change 'No data' text
     */
    emptyText: {
      type: String as PropType<QTablePropEmptyText>,
      default: null
    }
  },

  emits: [
    /**
     * triggers when any row checks
     */
    'update:checkedRows',
    /**
     * triggers when sort arrow clicks
     */
    'update:sortBy',
    /**
     * triggers when columns list changes
     */
    'update:groupsOfColumns'
  ],

  setup(props: QTableProps, ctx): QTableInstance {
    const isTableEmpty = computed<boolean>(() => {
      const doesColumnsExist = props.groupsOfColumns.some(
        ({ columns }) => columns.length
      );

      return !props.isLoading && (!props.rows.length || !doesColumnsExist);
    });

    const isRowClickable = computed<boolean>(() =>
      Boolean(!props.isLoading && ctx.attrs.onRowClick)
    );

    const hasColorGroups = computed<boolean>(() =>
      props.groupsOfColumns.some(({ color }) => Boolean(color))
    );

    const rootClasses = computed<ClassValue>(() => ({
      'q-table': true,
      'q-table_has-color-groups': hasColorGroups.value,
      'q-table_has-total': !isEmpty(props.total)
    }));

    const checkedRows = computed<number[]>(() => props.checkedRows ?? []);

    const updateCheckedRows = (value: number[]): void => {
      ctx.emit('update:checkedRows', value);
    };

    const updateSortBy = (value: QTablePropSortBy): void => {
      ctx.emit('update:sortBy', value);
    };

    const updateGroupsOfColumns = (value: QTablePropGroupsOfColumns): void => {
      ctx.emit('update:groupsOfColumns', value);
    };

    const emitRowClick = (row: Row, rowIndex: number): void => {
      const { onRowClick } = ctx.attrs;
      if (isFunction(onRowClick)) onRowClick(row, rowIndex);
    };

    provide<QTableProvider>('qTable', {
      checkedRows,
      grided: toRef(props, 'grid'),
      fixedLayout: toRef(props, 'fixedLayout'),
      isLoading: toRef(props, 'isLoading'),
      loadingRowCount: toRef(props, 'loadingRowCount'),
      defaultColWidth: toRef(props, 'defaultColWidth'),
      selectionColumn: toRef(props, 'selectionColumn'),
      groupsOfColumns: toRef(props, 'groupsOfColumns'),
      total: toRef(props, 'total'),
      rows: toRef(props, 'rows'),
      customRowClass: toRef(props, 'customRowClass'),
      customRowStyle: toRef(props, 'customRowStyle'),
      sortBy: toRef(props, 'sortBy'),
      slots: ctx.slots,
      isRowClickable,
      updateCheckedRows,
      updateSortBy,
      updateGroupsOfColumns,
      emitRowClick
    });

    return {
      isTableEmpty,
      rootClasses
    };
  }
});
</script>

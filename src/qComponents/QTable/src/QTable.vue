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
import { defineComponent, PropType, computed, provide, toRef } from 'vue';
import { isEmpty } from 'lodash-es';

import QTableContainer from './QTableContainer.vue';
import QTableEmpty from './QTableEmpty.vue';

import type {
  QTableProps,
  QTablePropSelectionColumn,
  QTablePropGroupsOfColumns,
  QTablePropTotal,
  QTablePropRows,
  QTablePropCheckedRows,
  QTablePropSortBy,
  QTablePropCustomRowClass,
  QTablePropCustomRowStyle,
  QTableProvider,
  QTableInstance
} from './QTable';

const UPDATE_CHECKED_ROWS_EVENT = 'update:checkedRows';
const UPDATE_SORT_BY_EVENT = 'update:sortBy';
const ROW_CLICK_EVENT = 'row-click';

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
      type: Boolean,
      default: false
    },
    /**
     * do not shrink column's width as native table does
     * (change `defaultColWidth` or pass the `width` to each column object for managing the width)
     */
    fixedLayout: {
      type: Boolean,
      default: true
    },
    /**
     * whether to show skeleton
     */
    isLoading: {
      type: Boolean,
      default: false
    },
    /**
     * count of rows, when table is loading
     */
    loadingRowCount: {
      type: Number,
      default: 30
    },
    /**
     * Default columns width, required `fixedLayout: true`
     */
    defaultColWidth: {
      type: String,
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
     *  `sortable`.
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
      type: (Function as unknown) as PropType<QTablePropCustomRowClass>,
      default: null
    },
    /**
     * used to set styles for a row
     */
    customRowStyle: {
      type: (Function as unknown) as PropType<QTablePropCustomRowStyle>,
      default: null
    },
    /**
     * used to change 'No data' text
     */
    emptyText: {
      type: String,
      default: null
    }
  },

  emits: [UPDATE_CHECKED_ROWS_EVENT, UPDATE_SORT_BY_EVENT, ROW_CLICK_EVENT],

  setup(props: QTableProps, ctx): QTableInstance {
    const isTableEmpty = computed<boolean>(() => {
      const doesColumnsExist = props.groupsOfColumns.some(
        ({ columns }) => columns.length
      );

      return !props.rows.length || !doesColumnsExist;
    });

    const isRowClickable = computed<boolean>(() =>
      Boolean(!props.isLoading && ctx.attrs.onRowClick)
    );

    const hasColorGroups = computed<boolean>(() =>
      props.groupsOfColumns.some(({ color }) => Boolean(color))
    );

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-table': true,
      'q-table_has-color-groups': hasColorGroups.value,
      'q-table_has-total': !isEmpty(props.total)
    }));

    const checkedRows = computed<number[]>(() => props.checkedRows ?? []);

    const updateCheckedRows = (value: number[]): void => {
      ctx.emit(UPDATE_CHECKED_ROWS_EVENT, value);
    };

    const updateSortBy = (value: QTablePropSortBy): void => {
      ctx.emit(UPDATE_SORT_BY_EVENT, value);
    };
    const emitRowClick = (
      row: Record<string, unknown>,
      rowIndex: number
    ): void => {
      ctx.emit(ROW_CLICK_EVENT, row, rowIndex);
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
      emitRowClick
    });

    return {
      isTableEmpty,
      rootClasses
    };
  }
});
</script>

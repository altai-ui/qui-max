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

export default defineComponent({
  name: 'QTable',
  componentName: ' QTable',

  components: {
    QTableContainer,
    QTableEmpty
  },

  props: {
    /**
     * do not shrink column's width as native table does
     * (change `defaultColWidth` or pass the `width` to each column object for managing the width)
     */
    fixedLayout: {
      type: Boolean,
      default: true
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
     *  `draggabble` (boolean) - whether to drag and drop columns inside the group.
     *  `align` (left/right) - content's align.
     * Each column MUST contain `key` and `value`.
     * Each column MAY contain:
     *  `sortable`,
     *  `slots`,
     *  `width` (works with `fixedLayout: true`),
     *  `minWidth` (works with `fixedLayout: false`),
     *  `customCellClass`,
     *  `formatter` (fn)
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
    checkedRows: {
      type: Array as PropType<QTablePropCheckedRows>,
      default: null
    },
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
     * used to change 'loading file' text
     */
    emptyText: {
      type: String,
      default: null
    }
  },

  emits: [UPDATE_CHECKED_ROWS_EVENT, UPDATE_SORT_BY_EVENT],

  setup(props: QTableProps, ctx): QTableInstance {
    const isTableEmpty = computed<boolean>(() => !props.rows.length);

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

    provide<QTableProvider>('qTable', {
      checkedRows,
      fixedLayout: toRef(props, 'fixedLayout'),
      defaultColWidth: toRef(props, 'defaultColWidth'),
      selectionColumn: toRef(props, 'selectionColumn'),
      groupsOfColumns: toRef(props, 'groupsOfColumns'),
      total: toRef(props, 'total'),
      rows: toRef(props, 'rows'),
      customRowClass: toRef(props, 'customRowClass'),
      customRowStyle: toRef(props, 'customRowStyle'),
      sortBy: toRef(props, 'sortBy'),
      slots: ctx.slots,
      updateCheckedRows,
      updateSortBy
    });

    return {
      isTableEmpty,
      rootClasses
    };
  }
});
</script>

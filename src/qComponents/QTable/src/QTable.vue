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

    <q-table-container
      v-else
      :groups-of-columns="groupsOfColumns"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, provide, toRef } from 'vue';

import QTableContainer from './QTableContainer.vue';
import QTableEmpty from './QTableEmpty.vue';

import type {
  QTableProps,
  QTablePropGroupsOfColumns,
  QTablePropRows,
  QTablePropSortBy,
  QTableProvider,
  QTableInstance
} from './QTable';

export default defineComponent({
  name: 'QTable',
  componentName: ' QTable',

  components: {
    QTableContainer,
    QTableEmpty
  },

  props: {
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
     * Array of objects, each object must contain `[column.key]: value` pair
     */
    rows: {
      type: Array as PropType<QTablePropRows>,
      required: true
    },
    sortBy: {
      type: Object as PropType<QTablePropSortBy>,
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

  setup(props: QTableProps, ctx): QTableInstance {
    const isTableEmpty = computed<boolean>(() => !props.rows.length);

    const hasColorGroups = computed(() =>
      props.groupsOfColumns.some(({ color }) => Boolean(color))
    );

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-table': true,
      'q-table_has-color-groups': hasColorGroups.value
    }));

    provide<QTableProvider>('qTable', {
      groupsOfColumns: toRef(props, 'groupsOfColumns'),
      sortBy: toRef(props, 'sortBy'),
      slots: ctx.slots
    });

    return {
      isTableEmpty,
      rootClasses
    };
  }
});
</script>

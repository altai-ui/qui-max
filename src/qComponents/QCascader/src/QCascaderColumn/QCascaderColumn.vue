<template>
  <div :class="rootClasses">
    <q-scrollbar wrap-class="q-cascader-column__scrollbar">
      <q-cascader-row
        v-for="(row, rowIndex) in column"
        :key="`${uniqueId}-${columnIndex}-${rowIndex}`"
        :unique-id="`${uniqueId}-col-${columnIndex}-row-${rowIndex}`"
        :row="row"
        :expanded="checkExpanded(rowIndex)"
        @expand="handleRowExpand(rowIndex)"
        @check="handleRowCheck"
      />
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, PropType } from 'vue';

import findAllLeaves from '../helpers/findAllLeaves';
import QCascaderRow from '../QCascaderRow/QCascaderRow.vue';
import type { QCascaderDropdownProvider } from '../QCascaderDropdown/QCascaderDropdown';
import type { Option, QCascaderProvider } from '../QCascader';

import type {
  QCascaderColumnPropColumn,
  QCascaderColumnProps,
  QCascaderColumnInstance
} from './QCascaderColumn';

const EXPAND_EVENT = 'expand';

export default defineComponent({
  name: 'QCascaderColumn',
  componentName: 'QCascaderColumn',

  components: {
    QCascaderRow
  },

  props: {
    columnIndex: {
      type: Number,
      required: true
    },
    column: {
      type: Array as PropType<QCascaderColumnPropColumn>,
      required: true
    }
  },

  setup(props: QCascaderColumnProps, ctx): QCascaderColumnInstance {
    const qCascader = inject<QCascaderProvider>(
      'qCascader',
      {} as QCascaderProvider
    );
    const qCascaderDropdown = inject<QCascaderDropdownProvider>(
      'qCascaderDropdown',
      {} as QCascaderDropdownProvider
    );

    const rootClasses = computed<Record<string, boolean>>(() => {
      const columnList = qCascaderDropdown.columnList.value;

      const prevRowsCount = columnList[props.columnIndex - 1]?.length ?? 0;
      const currentRowsCount = props.column.length;
      const nextRowsCount = columnList[props.columnIndex + 1]?.length ?? 0;

      return {
        'q-cascader-column': true,
        'q-cascader-column_left-bottom-border':
          currentRowsCount > prevRowsCount,
        'q-cascader-column_right-bottom-border':
          currentRowsCount > nextRowsCount
      };
    });

    const checkExpanded = (rowIndex: number): boolean =>
      qCascaderDropdown.expandedRows.value[props.columnIndex] === rowIndex;

    const handleRowExpand = (rowIndex: number): void => {
      ctx.emit(EXPAND_EVENT, rowIndex, props.columnIndex);
    };

    const handleRowCheck = (row: Option, isExist: boolean): void => {
      if (!qCascader.multiple.value || qCascader.checkStrictly.value) {
        qCascader.updateValue(row.value, isExist);
        return;
      }

      const leaves = findAllLeaves(row);
      qCascader.updateValue(leaves, isExist);
    };

    return {
      rootClasses,
      uniqueId: qCascader.uniqueId,
      checkExpanded,
      handleRowExpand,
      handleRowCheck
    };
  }
});
</script>
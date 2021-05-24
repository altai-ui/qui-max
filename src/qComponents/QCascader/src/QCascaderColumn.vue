<template>
  <div class="q-cascader-column">
    <q-scrollbar>
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
import { defineComponent, inject, PropType } from 'vue';

import findAllLeaves from './helpers/findAllLeaves';
import type { Option, QCascaderProvider } from './QCascader';
import type { QCascaderDropdownProvider } from './QCascaderDropdown';
import type {
  QCascaderColumnPropColumn,
  QCascaderColumnProps,
  QCascaderColumnInstance
} from './QCascaderColumn';
import QCascaderRow from './QCascaderRow.vue';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props: QCascaderColumnProps, ctx): QCascaderColumnInstance {
    const qCascader = inject<QCascaderProvider>(
      'qCascader',
      {} as QCascaderProvider
    );
    const qCascaderDropdown = inject<QCascaderDropdownProvider>(
      'qCascaderDropdown',
      {} as QCascaderDropdownProvider
    );

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
      uniqueId: qCascader.uniqueId,
      checkExpanded,
      handleRowExpand,
      handleRowCheck
    };
  }
});
</script>

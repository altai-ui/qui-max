<template>
  <div class="q-cascader-column">
    <q-scrollbar>
      <q-cascader-row
        v-for="(row, rowIndex) in column"
        :key="`${uniqueId}-${columnIndex}-${rowIndex}`"
        :unique-id="`${uniqueId}-col-${columnIndex}-row-${rowIndex}`"
        :value="row.value"
        :label="row.label"
        :has-children="Boolean(row.children?.length)"
        :disabled="row.disabled"
        :expanded="checkExpanded(rowIndex)"
        :multiple="isMultiple"
        @expand="handleRowExpand(rowIndex)"
        @check="handleRowCheck(row, rowIndex)"
      />
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, PropType } from 'vue';

import type { Option, QCascaderProvider } from './QCascader';
import type { QCascaderDropdownProvider } from './QCascaderDropdown';
import type {
  QCascaderColumnPropColumn,
  QCascaderColumnProps,
  QCascaderColumnInstance
} from './QCascaderColumn';
import QCascaderRow from './QCascaderRow';

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

    const isMultiple = computed<boolean>(
      () => qCascader.multiple.value ?? false
    );

    const checkExpanded = (rowIndex: number): boolean =>
      qCascaderDropdown.expandedRows.value[props.columnIndex] === rowIndex;

    const handleRowExpand = (rowIndex: number): void => {
      ctx.emit(EXPAND_EVENT, rowIndex, props.columnIndex);
    };

    const handleRowCheck = (row: Option, rowIndex: number): void => {
      // eslint-disable-next-line no-console
      console.log('handleRowCheck', row, rowIndex);

      qCascader.updateValue(row.value);
    };

    return {
      uniqueId: qCascader.uniqueId,
      isMultiple,
      checkExpanded,
      handleRowExpand,
      handleRowCheck
    };
  }
});
</script>

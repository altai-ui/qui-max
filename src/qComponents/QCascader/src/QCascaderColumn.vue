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
        :multiple="isMultiple"
        @expand="handleRowExpand(row, rowIndex)"
        @check="handleRowCheck(row, rowIndex)"
      />
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, PropType } from 'vue';

import type { Option, QCascaderProvider } from './QCascader';
import type {
  QCascaderColumnPropColumn,
  QCascaderColumnProps,
  QCascaderColumnInstance
} from './QCascaderColumn';
import QCascaderRow from './QCascaderRow';

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
  setup(props: QCascaderColumnProps): QCascaderColumnInstance {
    const qCascader = inject<QCascaderProvider>(
      'qCascader',
      {} as QCascaderProvider
    );

    const isMultiple = computed<boolean>(
      () => qCascader.multiple.value ?? false
    );

    const handleRowExpand = (row: Option, rowIndex: number): void => {
      // eslint-disable-next-line no-console
      console.log('handleRowExpand', row, rowIndex);
    };

    const handleRowCheck = (row: Option, rowIndex: number): void => {
      // eslint-disable-next-line no-console
      console.log('handleRowCheck', row, rowIndex);

      qCascader.updateValue(row.value);
    };

    return {
      uniqueId: qCascader.uniqueId,
      isMultiple,
      handleRowExpand,
      handleRowCheck
    };
  }
});
</script>

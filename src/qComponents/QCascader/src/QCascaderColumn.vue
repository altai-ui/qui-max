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
      />
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, PropType } from 'vue';

import type { QCascaderProvider } from './QCascader';
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

    return {
      uniqueId: qCascader.uniqueId,
      isMultiple
    };
  }
});
</script>

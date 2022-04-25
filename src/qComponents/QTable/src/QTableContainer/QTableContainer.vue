<template>
  <div class="q-table-container">
    <q-scrollbar
      ref="scrollbar"
      theme="secondary"
    >
      <div
        class="q-table-container__wrapper"
        :style="wrapperStyles"
      >
        <q-table-t @change-width="handleWidthChange" />
      </div>
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, provide, inject } from 'vue';

import type { Nullable } from '#/helpers';

import QTableT from '../QTableT/QTableT.vue';
import type { QTableProvider } from '../types';

import type {
  QTableContainerProvider,
  QTableContainerInstance,
  ExtendedColumn
} from './types';

export default /* #__PURE__ */ defineComponent({
  name: 'QTableContainer',
  componentName: ' QTableContainer',

  components: {
    QTableT
  },

  setup(): QTableContainerInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);

    const columnList = computed<ExtendedColumn[]>(() => {
      const groups = qTable.groupsOfColumns.value ?? [];

      return groups.reduce<ExtendedColumn[]>((acc, { columns, ...group }) => {
        const extendedColumns = columns
          .filter(({ isHidden }) => !isHidden)
          .map(column => ({ group, ...column }));
        return acc.concat(extendedColumns);
      }, []);
    });

    const isSelectable = computed<boolean>(() =>
      Boolean(qTable.selectionColumn.value?.enabled)
    );

    const tableWidth = ref<Nullable<number>>(null);

    const wrapperStyles = computed<{ width: Nullable<string> }>(() => ({
      width: tableWidth.value ? `${tableWidth.value}px` : null
    }));

    const handleWidthChange = (width: Nullable<number>): void => {
      tableWidth.value = width;
    };

    provide<QTableContainerProvider>('qTableContainer', {
      columnList,
      isSelectable
    });

    return {
      columnList,
      wrapperStyles,
      handleWidthChange
    };
  }
});
</script>

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
import type { StyleValue } from 'vue';

import type { Optional } from '#/helpers';

import QTableT from '../QTableT/QTableT.vue';
import type { QTableProvider } from '../types';

import type {
  QTableContainerProvider,
  QTableContainerInstance,
  ExtendedColumn
} from './types';

export default defineComponent({
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

    const tableWidth = ref<Optional<number>>(0);

    const wrapperStyles = computed<StyleValue>(() => ({
      width: tableWidth.value ? `${tableWidth.value}px` : undefined
    }));

    const handleWidthChange = (width: Optional<number>): void => {
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

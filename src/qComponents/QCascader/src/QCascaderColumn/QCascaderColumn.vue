<template>
  <div
    ref="root"
    :class="rootClasses"
  >
    <q-scrollbar
      wrap-class="q-cascader-column__scrollbar"
      :scroll-to="scrollTo"
      @keydown.arrow-down.prevent
      @keydown.arrow-up.prevent
      @keyup.arrow-left="handleArrowLeftKeyUp"
    >
      <q-cascader-row
        v-for="(row, rowIndex) in column"
        :key="`${uniqueId}-${columnIndex}-${rowIndex}`"
        :unique-id="`${uniqueId}-col-${columnIndex}-row-${rowIndex}`"
        :row="row"
        :row-index="rowIndex"
        :expanded="checkExpanded(rowIndex)"
        @expand="handleRowExpand"
        @check="handleRowCheck"
        @keyup.arrow-up="handleArrowUpDownKeyUp"
        @keyup.arrow-down="handleArrowUpDownKeyUp"
      />
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  computed,
  PropType,
  onMounted,
  watch
} from 'vue';

import QScrollbar from '@/qComponents/QScrollbar';
import findAllLeaves from '../helpers/findAllLeaves';
import QCascaderRow from '../QCascaderRow/QCascaderRow.vue';
import type { QCascaderDropdownProvider } from '../QCascaderDropdown/types';
import type { Option, QCascaderProvider } from '../types';

import { getSibling } from './helpers';
import type {
  QCascaderColumnPropColumn,
  QCascaderColumnProps,
  QCascaderColumnInstance
} from './types';

const EXPAND_EVENT = 'expand';

export default defineComponent({
  name: 'QCascaderColumn',
  componentName: 'QCascaderColumn',

  components: {
    QCascaderRow,
    QScrollbar
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
    const root = ref<HTMLElement | null>(null);

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

    const expandedRowIndex = ref<number>(0);

    const handleRowExpand = (rowIndex: number, hasChildren: boolean): void => {
      expandedRowIndex.value = rowIndex;
      ctx.emit(EXPAND_EVENT, rowIndex, props.columnIndex, hasChildren);
    };

    const handleRowCheck = (row: Option, isExist: boolean): void => {
      if (!qCascader.multiple.value || qCascader.checkStrictly.value) {
        qCascader.updateValue(row.value, isExist);
        return;
      }

      const leaves = findAllLeaves(row);
      qCascader.updateValue(leaves, isExist);
    };

    const scrollTo = ref<HTMLElement | null>(null);

    const handleArrowUpDownKeyUp = (e: KeyboardEvent): void => {
      const distance = e.key === 'ArrowUp' ? -1 : 1;
      const target = e.target as HTMLElement;
      const sibling = getSibling(target, distance);

      if (!sibling) return;
      sibling.focus();
      scrollTo.value = sibling;
    };

    const focusRow = (index: number | null = null): void => {
      const rowList = root.value?.querySelectorAll<HTMLElement>(
        '.q-cascader-row[tabindex="-1"]'
      );

      rowList?.[index ?? 0]?.focus();
    };

    const handleArrowLeftKeyUp = (): void => {
      const rowIndex =
        qCascaderDropdown.expandedRows.value[props.columnIndex - 1];

      ctx.emit(EXPAND_EVENT, rowIndex, props.columnIndex - 1, false);
    };

    const isLastColumn = computed<boolean>(
      () => !qCascaderDropdown.columnList.value[props.columnIndex + 1]?.length
    );

    watch(isLastColumn, value => {
      if (value) focusRow(expandedRowIndex.value);
    });

    onMounted(() => {
      focusRow();
    });

    return {
      root,
      rootClasses,
      scrollTo,
      uniqueId: qCascader.uniqueId,
      checkExpanded,
      handleRowExpand,
      handleRowCheck,
      handleArrowUpDownKeyUp,
      handleArrowLeftKeyUp
    };
  }
});
</script>

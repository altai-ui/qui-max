<template>
  <tr
    :class="rootClasses"
    :style="rootStyles"
    @click="handleRowClick"
  >
    <q-table-cell-checkbox
      v-if="isSelectable"
      base-tag="td"
      base-class="q-table-t-body-cell"
      :checked="isChecked"
      @change="handleCheckboxChange"
    />

    <q-table-t-body-cell
      v-for="(column, colIndex) in columnList"
      :key="randId(`body-row-${rowIndex}-cell-${colIndex}-`)"
      :row="row"
      :row-index="rowIndex"
      :column="column"
      :column-index="colIndex"
      :value="getRowValue(column.key)"
    />
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, inject } from 'vue';
import { get } from 'lodash-es';

import { randId } from '@/qComponents/helpers';
import type { Nullable } from '#/helpers';

import QTableTBodyCell from '../QTableTBodyCell/QTableTBodyCell.vue';
import QTableCellCheckbox from '../../QTableCellCheckbox/QTableCellCheckbox.vue';
import type { QTableProvider } from '../../types';
import type {
  ExtendedColumn,
  QTableContainerProvider
} from '../../QTableContainer/types';
import type {
  QTableTBodyRowProps,
  QTableTBodyRowPropRow,
  QTableTBodyRowInstance,
  RootClasses,
  RootStyles
} from './types';

export default /* #__PURE__ */ defineComponent({
  name: 'QTableTBodyRow',
  componentName: ' QTableTBodyRow',

  components: {
    QTableTBodyCell,
    QTableCellCheckbox
  },

  props: {
    row: {
      type: Object as PropType<QTableTBodyRowPropRow>,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    }
  },

  setup(props: QTableTBodyRowProps): QTableTBodyRowInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);
    const qTableContainer = inject<QTableContainerProvider>(
      'qTableContainer',
      {} as QTableContainerProvider
    );

    const isChecked = computed<boolean>(
      () => qTable.checkedRows.value.includes(props.rowIndex) ?? false
    );

    const rootClasses = computed<RootClasses>(() => {
      const classes: RootClasses = ['q-table-t-body-row'];

      if (qTable.isRowClickable.value)
        classes.push('q-table-t-body-row_clickable');

      const getCustomClasses = qTable.customRowClass.value;

      if (getCustomClasses) {
        const customClasses = getCustomClasses({
          row: props.row,
          rowIndex: props.rowIndex
        });

        if (customClasses) return classes.concat(customClasses);
      }

      return classes;
    });

    const rootStyles = computed<RootStyles>(() => {
      const styles: RootStyles = [];

      const getCustomStyles = qTable.customRowStyle.value;
      if (getCustomStyles) {
        const customStyles = getCustomStyles({
          row: props.row,
          rowIndex: props.rowIndex
        });

        if (customStyles) return styles.concat(customStyles);
      }

      return styles;
    });

    const columnList = computed<ExtendedColumn[]>(
      () => qTableContainer?.columnList.value ?? []
    );

    const getRowValue = (key: string): Nullable<unknown> =>
      get(props.row, key, null);

    const handleCheckboxChange = (): void => {
      if (!qTable) return;

      const checkedRowsSet = new Set(qTable.checkedRows.value);

      if (isChecked.value) {
        checkedRowsSet.delete(props.rowIndex);
      } else {
        checkedRowsSet.add(props.rowIndex);
      }

      qTable.updateCheckedRows(Array.from(checkedRowsSet));
    };

    const handleRowClick = (): void => {
      qTable.emitRowClick(props.row, props.rowIndex);
    };

    return {
      isSelectable: qTableContainer?.isSelectable ?? null,
      isChecked,
      rootClasses,
      rootStyles,
      randId,
      columnList,
      getRowValue,
      handleRowClick,
      handleCheckboxChange
    };
  }
});
</script>

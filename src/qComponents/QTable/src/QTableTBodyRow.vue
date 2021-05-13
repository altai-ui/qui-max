<template>
  <tr
    v-if="isSpacerShown"
    class="q-table-t-body__space"
  />
  <tr
    :class="rootClasses"
    :style="rootStyles"
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
import { isEmpty } from 'lodash-es';

import { randId } from '@/qComponents/helpers';
import QTableTBodyCell from './QTableTBodyCell.vue';
import QTableCellCheckbox from './QTableCellCheckbox.vue';
import type { QTableProvider } from './QTable';
import type {
  ExtendedColumn,
  QTableContainerProvider
} from './QTableContainer';
import type {
  QTableTBodyRowProps,
  QTableTBodyRowPropRow,
  QTableTBodyRowInstance,
  RootClasses,
  RootStyles
} from './QTableTBodyRow';

export default defineComponent({
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
    const qTable = inject<QTableProvider | null>('qTable', null);
    const qTableContainer = inject<QTableContainerProvider | null>(
      'qTableContainer',
      null
    );

    const isSpacerShown = computed<boolean>(
      () => Boolean(props.rowIndex) || !isEmpty(qTable?.total.value)
    );

    const isChecked = computed<boolean>(
      () => qTable?.checkedRows.value?.includes(props.rowIndex) ?? false
    );

    const rootClasses = computed<RootClasses>(() => {
      const classes: RootClasses = ['q-table-t-body-row'];

      const getCustomClasses = qTable?.customRowClass.value;

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

      const getCustomStyles = qTable?.customRowStyle.value;
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

    const getRowValue = (key: string): unknown | null => props.row[key] ?? null;

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

    return {
      isSpacerShown,
      isSelectable: qTableContainer?.isSelectable ?? null,
      isChecked,
      rootClasses,
      rootStyles,
      randId,
      columnList,
      getRowValue,
      handleCheckboxChange
    };
  }
});
</script>

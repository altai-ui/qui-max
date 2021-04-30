<script lang="ts">
import { h, defineComponent, computed, PropType, inject, VNode } from 'vue';

import type { QTableProvider } from './QTable';
import type { ExtendedColumn } from './QTableContainer';
import type {
  QTableTBodyCellProps,
  QTableTBodyCellPropRow,
  QTableTBodyCellPropValue,
  QTableTBodyCellInstance
} from './QTableTBodyCell';

export default defineComponent({
  name: 'QTableTBodyCell',
  componentName: ' QTableTBodyCell',

  props: {
    row: {
      type: Object as PropType<QTableTBodyCellPropRow>,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    column: {
      type: Object as PropType<ExtendedColumn>,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    value: {
      type: [
        String,
        Number,
        Array,
        Object
      ] as PropType<QTableTBodyCellPropValue>,
      required: true
    }
  },

  setup(props: QTableTBodyCellProps): QTableTBodyCellInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);

    const content = computed<VNode[] | string | number | null>(() => {
      const slotName = props.column.slots?.row ?? 'row';
      const currentSlot = qTable?.slots[slotName];

      const value = props.column.formatter
        ? props.column.formatter(props.value, props.row, props.column)
        : props.value;

      if (!currentSlot) return String(value ?? '');

      return currentSlot({
        rowIndex: props.rowIndex,
        column: props.column,
        columnKey: props.column.key,
        columnIndex: props.columnIndex,
        value
      });
    });

    return (): VNode =>
      h('th', { class: 'q-table-t-body-cell' }, [
        h('div', { class: 'q-table-t-body-cell__container' }, [
          h('div', { class: 'q-table-t-body-cell__content' }, [content.value])
        ])
      ]);
  }
});
</script>

<script lang="ts">
import { h, defineComponent, computed, PropType, inject, VNode } from 'vue';

import type { QTableProvider } from './QTable';
import type { ExtendedColumn } from './QTableContainer';
import type {
  QTableTTotalCellProps,
  QTableTTotalCellInstance
} from './QTableTTotalCell';

export default defineComponent({
  name: 'QTableTTotalCell',
  componentName: ' QTableTTotalCell',

  props: {
    index: {
      type: Number,
      required: true
    },
    column: {
      type: Object as PropType<ExtendedColumn>,
      required: true
    }
  },

  setup(props: QTableTTotalCellProps): QTableTTotalCellInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);

    const content = computed<VNode[] | string | number | null>(() => {
      const slotName = props.column.slots?.total ?? 'total';
      const currentSlot = qTable?.slots[slotName];

      const value = qTable?.total.value?.[props.column.key] ?? null;

      if (!currentSlot) return String(value ?? '');

      return currentSlot({
        data: props.column,
        columnKey: props.column.key,
        index: props.index,
        value
      });
    });

    return (): VNode =>
      h('th', { class: 'q-table-t-total-cell' }, [
        h('div', { class: 'q-table-t-total-cell__container' }, [
          h('div', { class: 'q-table-t-total-cell__content' }, [content.value])
        ])
      ]);
  }
});
</script>

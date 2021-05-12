<script lang="ts">
import {
  h,
  defineComponent,
  computed,
  PropType,
  inject,
  VNode,
  toRefs
} from 'vue';

import type { QTableProvider } from './QTable';
import type { QTableTProvider } from './QTableT';
import type { ExtendedColumn } from './QTableContainer';

import type {
  QTableTTotalCellProps,
  QTableTTotalCellInstance
} from './QTableTTotalCell';

export default defineComponent({
  name: 'QTableTTotalCell',
  componentName: ' QTableTTotalCell',

  props: {
    column: {
      type: Object as PropType<ExtendedColumn>,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },

  setup(props: QTableTTotalCellProps): QTableTTotalCellInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);
    const qTableT = inject<QTableTProvider>('qTableT', {} as QTableTProvider);

    const sticky = toRefs(qTableT.stickyConfig.value[props.columnIndex]);

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t-total-cell': true,
      'q-table-t-total-cell_sticked': sticky.isSticked.value,
      [`q-table-t-total-cell_sticked_${sticky.position.value}`]: sticky
        .isSticked.value
    }));

    const rootStyles = computed<Record<string, string>>(() => ({
      [sticky.position.value]: sticky.isSticked.value
        ? `${sticky.offset.value}px`
        : ''
    }));

    const content = computed<VNode[] | string | number | null>(() => {
      const slotName = props.column.slots?.total ?? 'total';
      const currentSlot = qTable.slots[slotName];

      const value = qTable.total.value?.[props.column.key] ?? null;

      if (!currentSlot) return String(value ?? '');

      return currentSlot({
        data: props.column,
        columnKey: props.column.key,
        index: props.columnIndex,
        value
      });
    });

    return (): VNode =>
      h('th', { class: rootClasses.value, style: rootStyles.value }, [
        h('div', { class: 'q-table-t-total-cell__container' }, [
          h('div', { class: 'q-table-t-total-cell__content' }, [content.value])
        ])
      ]);
  }
});
</script>

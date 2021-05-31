<script lang="ts">
import { h, defineComponent, computed, PropType, inject, VNode } from 'vue';

import useSticky from '../helpers/sticky';
import type { StickyConfig } from '../helpers/sticky.d';
import type { QTableProvider } from '../QTable';
import type { QTableTProvider } from '../QTableT/QTableT';
import type { ExtendedColumn } from '../QTableContainer/QTableContainer';

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

    const stickyConfig = computed<StickyConfig>(() =>
      useSticky(
        props.column.sticky?.position,
        props.columnIndex,
        qTableT.stickyGlobalConfig.value
      )
    );

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t-total-cell': true,
      [`q-table-t-total-cell_align_${props.column.align ?? ''}`]: Boolean(
        props.column.align
      ),
      'q-table-t-total-cell_sticked': stickyConfig.value.isSticked,
      'q-table-t-total-cell_sticked_first': stickyConfig.value.isFirstSticked,
      'q-table-t-total-cell_sticked_last': stickyConfig.value.isLastSticked,
      [`q-table-t-total-cell_sticked_${stickyConfig.value.position}`]:
        stickyConfig.value.isSticked
    }));

    const rootStyles = computed<Record<string, string>>(() => ({
      zIndex: stickyConfig.value.isSticked
        ? String(stickyConfig.value.zIndex)
        : '',
      [stickyConfig.value.position]: stickyConfig.value.isSticked
        ? `${stickyConfig.value.offset}px`
        : ''
    }));

    const content = computed<VNode[] | string | number | null>(() => {
      if (qTable.isLoading.value)
        return [h('div', { class: 'q-table-t__skeleton' })];

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

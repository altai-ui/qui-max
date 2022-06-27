<script lang="ts">
import { h, defineComponent, computed, inject, VNode } from 'vue';
import type { PropType, StyleValue } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

import { useSticky } from '../../hooks/sticky';
import type { StickyConfig } from '../../hooks/sticky';
import type { ExtendedColumn } from '../../QTableContainer/types';
import type { QTableTProvider } from '../../QTableT/types';
import type { QTableProvider } from '../../types';

import type {
  QTableTBodyCellProps,
  QTableTBodyCellPropRow,
  QTableTBodyCellPropValue,
  QTableTBodyCellInstance
} from './types';

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
        Boolean,
        Array,
        Object
      ] as PropType<QTableTBodyCellPropValue>,
      default: null
    }
  },

  setup(props: QTableTBodyCellProps): QTableTBodyCellInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);
    const qTableT = inject<QTableTProvider>('qTableT', {} as QTableTProvider);

    const stickyConfig = computed<StickyConfig>(() =>
      useSticky(
        props.column.sticky?.position,
        props.columnIndex,
        qTableT.stickyGlobalConfig.value
      )
    );

    const rootClasses = computed<ClassValue>(() => ({
      'q-table-t-body-cell': true,
      [`q-table-t-body-cell_align_${props.column.align ?? ''}`]: Boolean(
        props.column.align
      ),
      'q-table-t-body-cell_sticked': stickyConfig.value.isSticked,
      'q-table-t-body-cell_sticked_first': stickyConfig.value.isFirstSticked,
      'q-table-t-body-cell_sticked_last': stickyConfig.value.isLastSticked,
      [`q-table-t-body-cell_sticked_${stickyConfig.value.position}`]:
        stickyConfig.value.isSticked,
      [props.column.customCellClass ?? '']: Boolean(
        props.column.customCellClass
      )
    }));

    const rootStyles = computed<StyleValue>(() => ({
      zIndex: stickyConfig.value.isSticked
        ? stickyConfig.value.zIndex
        : undefined,
      [stickyConfig.value.position]: stickyConfig.value.isSticked
        ? `${stickyConfig.value.offset}px`
        : undefined
    }));

    const content = computed<Nullable<VNode[] | string | number>>(() => {
      if (qTable.isLoading.value)
        return [h('div', { class: 'q-table-t__skeleton' })];

      const slotName = props.column.slots?.row ?? 'row';
      const currentSlot = qTable?.slots[slotName];

      const value = props.column.formatter
        ? props.column.formatter(props.value, props.row, props.column)
        : props.value;

      if (!currentSlot) return String(value ?? '');

      return currentSlot({
        row: props.row,
        rowIndex: props.rowIndex,
        column: props.column,
        columnKey: props.column.key,
        columnIndex: props.columnIndex,
        value
      });
    });

    return (): VNode =>
      h('td', { class: rootClasses.value, style: rootStyles.value }, [
        h('div', { class: 'q-table-t-body-cell__container' }, [
          h('div', { class: 'q-table-t-body-cell__content' }, [content.value])
        ])
      ]);
  }
});
</script>

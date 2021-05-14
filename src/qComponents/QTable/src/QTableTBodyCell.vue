<script lang="ts">
import {
  h,
  defineComponent,
  toRefs,
  computed,
  PropType,
  inject,
  VNode
} from 'vue';

import type { QTableProvider } from './QTable';
import type { QTableTProvider } from './QTableT';
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
      default: null
    }
  },

  setup(props: QTableTBodyCellProps): QTableTBodyCellInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);
    const qTableT = inject<QTableTProvider>('qTableT', {} as QTableTProvider);

    const sticky = toRefs(qTableT.stickyConfig.value[props.columnIndex]);

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t-body-cell': true,
      [`q-table-t-body-cell_align_${props.column.align ?? ''}`]: Boolean(
        props.column.align
      ),
      'q-table-t-body-cell_sticked': sticky.isSticked.value,
      'q-table-t-body-cell_sticked_first': sticky.isFirstSticked.value,
      'q-table-t-body-cell_sticked_last': sticky.isLastSticked.value,
      [`q-table-t-body-cell_sticked_${sticky.position.value}`]: sticky.isSticked
        .value,
      [props.column.customCellClass ?? '']: Boolean(
        props.column.customCellClass
      )
    }));

    const rootStyles = computed<Record<string, string>>(() => ({
      zIndex: sticky.isSticked.value ? String(sticky.zIndex.value) : '',
      [sticky.position.value]: sticky.isSticked.value
        ? `${sticky.offset.value}px`
        : ''
    }));

    const content = computed<VNode[] | string | number | null>(() => {
      if (qTable.isLoading.value)
        return [h('div', { class: 'q-table-t__skeleton' })];

      const slotName = props.column.slots?.row ?? 'row';
      const currentSlot = qTable?.slots[slotName];

      const value =
        props.column.formatter?.(props.value, props.row, props.column) ??
        props.value;

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
      h('td', { class: rootClasses.value, style: rootStyles.value }, [
        h('div', { class: 'q-table-t-body-cell__container' }, [
          h('div', { class: 'q-table-t-body-cell__content' }, [content.value])
        ])
      ]);
  }
});
</script>

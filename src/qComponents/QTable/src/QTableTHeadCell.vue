<script lang="ts">
import {
  h,
  defineComponent,
  computed,
  PropType,
  inject,
  VNode,
  Slot
} from 'vue';

import type { QTableProvider } from './QTable';
import type { ExtendedColumn } from './QTableContainer';
import type {
  QTableTHeadCellProps,
  QTableTHeadCellPropSortBy,
  QTableTHeadCellInstance
} from './QTableTHeadCell';

export default defineComponent({
  name: 'QTableTHeadCell',
  componentName: ' QTableTHeadCell',

  props: {
    column: {
      type: Object as PropType<ExtendedColumn>,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    sortBy: {
      type: Object as PropType<QTableTHeadCellPropSortBy>,
      default: null
    }
  },

  setup(props: QTableTHeadCellProps): QTableTHeadCellInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);

    const isSortable = computed<boolean>(() => Boolean(props.column.sortable));
    const isCurrentSorting = computed<boolean>(
      () => props.sortBy?.key === props.column.key
    );

    const cellClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t-head-cell': true,
      'q-table-t-head-cell_sortable': isSortable.value,
      'q-table-t-head-cell_sorted':
        isCurrentSorting.value && Boolean(props.sortBy?.direction)
    }));

    const cellStyles = computed<Record<string, string>>(() => ({
      minWidth: props.column.minWidth ?? '',
      '--group-color': props.column.group.color ?? ''
    }));

    const currentSlot = computed<Slot | undefined>(() => {
      const slotName = props.column.slots?.header ?? 'header';
      return qTable?.slots[slotName];
    });

    const contentClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t-head-cell__content': true,
      'q-table-t-head-cell__content_ellipsis': !currentSlot.value
    }));

    const sortArrowClasses = computed<Record<string, boolean>>(() => {
      const isDirectionAsc = props.sortBy?.direction === 'ascending';
      const isArrowUpShown = isCurrentSorting.value && isDirectionAsc;

      return {
        'q-table-t-head-cell__sort-arrow': true,
        'q-icon-arrow-up': isArrowUpShown,
        'q-icon-arrow-down': !isArrowUpShown
      };
    });

    const content = computed<VNode[] | string | number | null>(() => {
      if (!currentSlot.value) return props.column.value;

      return currentSlot.value({
        data: props.column,
        columnKey: props.column.key,
        index: props.columnIndex,
        value: props.column.value
      });
    });

    const handleSortArrowClick = (): void => {
      const oldDirection = props.sortBy?.direction ?? null;

      let direction: 'ascending' | 'descending' | null = null;

      switch (oldDirection) {
        case null:
          direction = 'descending';
          break;

        case 'descending':
          direction = 'ascending';
          break;

        default:
          break;
      }

      qTable?.updateSortBy({
        key: props.column.key,
        direction
      });
    };

    return (): VNode =>
      h('th', { class: cellClasses.value, style: cellStyles.value }, [
        h('div', { class: 'q-table-t-head-cell__container' }, [
          h('div', { class: contentClasses.value }, [content.value]),
          isSortable.value &&
            h('button', {
              type: 'button',
              class: sortArrowClasses.value,
              onClick: handleSortArrowClick
            })
        ])
      ]);
  }
});
</script>

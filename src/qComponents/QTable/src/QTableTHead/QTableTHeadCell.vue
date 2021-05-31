<script lang="ts">
import {
  h,
  defineComponent,
  ref,
  computed,
  PropType,
  inject,
  VNode,
  Slot
} from 'vue';

import useSticky from '../helpers/sticky';
import type { StickyConfig } from '../helpers/sticky.d';
import type { QTableProvider } from '../QTable';
import type { ExtendedColumn } from '../QTableContainer/QTableContainer';
import type { QTableTProvider } from '../QTableT/QTableT';

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
    },
    draggedColumn: {
      type: Object as PropType<ExtendedColumn>,
      default: null
    }
  },

  emits: ['drag', 'drop'],

  setup(props: QTableTHeadCellProps, ctx): QTableTHeadCellInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);
    const qTableT = inject<QTableTProvider>('qTableT', {} as QTableTProvider);
    const root = ref<HTMLElement | null>(null);

    const stickyConfig = computed<StickyConfig>(() =>
      useSticky(
        props.column.sticky?.position,
        props.columnIndex,
        qTableT.stickyGlobalConfig.value
      )
    );

    const isSortable = computed<boolean>(() => Boolean(props.column.sortable));
    const isCurrentSorting = computed<boolean>(
      () => props.sortBy?.key === props.column.key
    );

    const cellClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t-head-cell': true,
      [`q-table-t-head-cell_align_${props.column.align ?? ''}`]: Boolean(
        props.column.align
      ),
      'q-table-t-head-cell_dragging': props.draggedColumn !== null,
      'q-table-t-head-cell_sticked': stickyConfig.value.isSticked,
      'q-table-t-head-cell_sticked_first': stickyConfig.value.isFirstSticked,
      'q-table-t-head-cell_sticked_last': stickyConfig.value.isLastSticked,
      [`q-table-t-head-cell_sticked_${stickyConfig.value.position}`]:
        stickyConfig.value.isSticked,
      'q-table-t-head-cell_sortable': isSortable.value,
      'q-table-t-head-cell_sorted':
        isCurrentSorting.value && Boolean(props.sortBy?.direction)
    }));

    const cellStyles = computed<Record<string, string>>(() => ({
      '--group-color': props.column.group.color ?? '',
      zIndex: stickyConfig.value.isSticked
        ? String(stickyConfig.value.zIndex)
        : '',
      [stickyConfig.value.position]: stickyConfig.value.isSticked
        ? `${stickyConfig.value.offset}px`
        : '',
      minWidth: qTable.fixedLayout.value ? props.column.minWidth ?? '' : ''
    }));

    const currentSlot = computed<Slot | undefined>(() => {
      const slotName = props.column.slots?.header ?? 'header';
      return qTable.slots[slotName];
    });

    const contentClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t-head-cell__content': true,
      'q-table-t-head-cell__content_ellipsis': !currentSlot.value
    }));

    const content = computed<VNode[] | string | number | null>(() => {
      if (!currentSlot.value) return props.column.value;

      return currentSlot.value({
        data: props.column,
        columnKey: props.column.key,
        index: props.columnIndex,
        value: props.column.value
      });
    });

    const sortArrowElClasses = computed<Record<string, boolean>>(() => {
      const isDirectionAsc = props.sortBy?.direction === 'ascending';
      const isArrowUpShown = isCurrentSorting.value && isDirectionAsc;

      return {
        'q-table-t-head-cell__sort-arrow': true,
        'q-icon-arrow-up': isArrowUpShown,
        'q-icon-arrow-down': !isArrowUpShown
      };
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

      qTable.updateSortBy({
        key: props.column.key,
        direction
      });
    };

    const sortArrowEl = computed<VNode | null>(() => {
      if (!isSortable.value) return null;

      return h('button', {
        type: 'button',
        class: sortArrowElClasses.value,
        onClick: handleSortArrowClick
      });
    });

    const startCursorPostition = ref<number>(0);
    const dummyOffset = ref<number>(0);

    const handleMouseMove = (e: MouseEvent): void => {
      dummyOffset.value = e.clientX - startCursorPostition.value;
    };

    const endDragging = (): void => {
      ctx.emit('drop');
      document.removeEventListener('mouseup', endDragging);
      document.removeEventListener('mousemove', handleMouseMove);
    };

    const handleDragTriggerMouseDown = (e: MouseEvent): void => {
      startCursorPostition.value = e.clientX;
      dummyOffset.value = 0;

      ctx.emit('drag', props.column);
      document.addEventListener('mouseup', endDragging);
      document.addEventListener('mousemove', handleMouseMove);
    };

    const dragTriggerEl = computed<VNode | null>(() => {
      if (!props.column.group.draggable || props.column.draggable === false)
        return null;

      return h('div', {
        class: 'q-table-t-head-cell__drag-element q-icon-drag-linear',
        onMousedown: handleDragTriggerMouseDown
      });
    });

    const dummyEl = computed<VNode | null>(() => {
      if (props.draggedColumn?.key !== props.column.key) return null;

      const style = {
        height: `${qTableT.tableHeight.value}px`,
        transform: `translateX(${dummyOffset.value}px)`
      };

      return h('div', {
        style,
        class: 'q-table-t-head-cell__dummy'
      });
    });

    const handleDropZoneElementMouseUp = (position: 'left' | 'right'): void => {
      ctx.emit('drop', position, props.column.key);
    };

    const dropZoneEls = computed<VNode[] | null>(() => {
      if (props.draggedColumn === null) return null;

      const style = { height: `${qTableT.tableHeight.value}px` };

      if (
        !props.column.group.draggable ||
        props.column.draggable === false ||
        props.draggedColumn.group.key !== props.column.group.key
      )
        return [
          h('div', {
            style,
            class: {
              'q-table-t-head-cell__drop-zone': true,
              'q-table-t-head-cell__drop-zone_full': true
            }
          })
        ];

      return [
        h('div', {
          style,
          class: {
            'q-table-t-head-cell__drop-zone': true,
            'q-table-t-head-cell__drop-zone_left': true
          },
          onMouseup: () => handleDropZoneElementMouseUp('left')
        }),
        h('div', {
          style,
          class: {
            'q-table-t-head-cell__drop-zone': true,
            'q-table-t-head-cell__drop-zone_right': true
          },
          onMouseup: () => handleDropZoneElementMouseUp('right')
        })
      ];
    });

    return (): VNode =>
      h(
        'th',
        { ref: root, class: cellClasses.value, style: cellStyles.value },
        [
          dummyEl.value,
          dropZoneEls.value,
          h('div', { class: 'q-table-t-head-cell__container' }, [
            h('div', { class: contentClasses.value }, [content.value]),
            sortArrowEl.value,
            dragTriggerEl.value
          ])
        ]
      );
  }
});
</script>

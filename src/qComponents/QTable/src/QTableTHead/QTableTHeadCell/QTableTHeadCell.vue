<script lang="ts">
import { h, defineComponent, ref, computed, inject, VNode, Slot } from 'vue';
import type { PropType, StyleValue } from 'vue';

import type { Nullable, Optional, ClassValue } from '#/helpers';

import { DEFAULT_SORTING_ORDER } from '../../config';
import { useSticky } from '../../hooks/sticky';
import type { StickyConfig } from '../../hooks/sticky';
import type { ExtendedColumn } from '../../QTableContainer/types';
import type { QTableTProvider } from '../../QTableT/types';
import type { QTableProvider, SortDirection } from '../../types';

import type {
  QTableTHeadCellProps,
  QTableTHeadCellPropSortBy,
  QTableTHeadCellInstance,
  QTableTHeadCellContainerAttrs
} from './types';

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
    const root = ref<Nullable<HTMLElement>>(null);

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

    const cellClasses = computed<ClassValue>(() => ({
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

    const cellStyles = computed<StyleValue>(() => ({
      '--group-color': props.column.group.color ?? undefined,
      zIndex: stickyConfig.value.isSticked
        ? stickyConfig.value.zIndex
        : undefined,
      [stickyConfig.value.position]: stickyConfig.value.isSticked
        ? `${stickyConfig.value.offset}px`
        : undefined,
      minWidth: !qTable.fixedLayout.value
        ? props.column.minWidth ?? undefined
        : undefined
    }));

    const currentSlot = computed<Optional<Slot>>(() => {
      const slotName = props.column.slots?.header ?? 'header';
      return qTable.slots[slotName];
    });

    const contentClasses = computed<ClassValue>(() => ({
      'q-table-t-head-cell__content': true,
      'q-table-t-head-cell__content_ellipsis': !currentSlot.value,
      'q-table-t-head-cell__content_sortable': isSortable.value
    }));

    const content = computed<Nullable<VNode[] | string | number>>(() => {
      if (!currentSlot.value) return props.column.value;

      return currentSlot.value({
        data: props.column,
        columnKey: props.column.key,
        index: props.columnIndex,
        value: props.column.value
      });
    });

    const sortArrowElClasses = computed<ClassValue>(() => {
      const isDirectionAsc = props.sortBy?.direction === 'ascending';
      const isArrowUpShown = isCurrentSorting.value && isDirectionAsc;

      return {
        'q-table-t-head-cell__sort-arrow': true,
        'q-icon-arrow-up': isArrowUpShown,
        'q-icon-arrow-down': !isArrowUpShown
      };
    });

    let sortCounter = 0;
    const handleSortArrowClick = (): void => {
      let newDirection: SortDirection = null;
      const sortOrder = props.column.sortOrder ?? DEFAULT_SORTING_ORDER;

      if (Array.isArray(sortOrder)) {
        newDirection = sortOrder[sortCounter];
        sortCounter =
          sortOrder.length - 1 === sortCounter ? 0 : (sortCounter += 1);
      }

      qTable.updateSortBy({
        key: props.column.key,
        direction: newDirection
      });
    };

    const sortArrowEl = computed<Nullable<VNode>>(() => {
      if (!isSortable.value) return null;

      return h('button', {
        type: 'button',
        class: sortArrowElClasses.value,
        onClick: handleSortArrowClick
      });
    });

    const startCursorPosition = ref<number>(0);
    const dummyOffset = ref<number>(0);

    const handleMouseMove = (e: MouseEvent): void => {
      dummyOffset.value = e.clientX - startCursorPosition.value;
    };

    const endDragging = (): void => {
      ctx.emit('drop');
      document.removeEventListener('mouseup', endDragging);
      document.removeEventListener('mousemove', handleMouseMove);
    };

    const handleDragTriggerMouseDown = (e: MouseEvent): void => {
      e.preventDefault();
      startCursorPosition.value = e.clientX;
      dummyOffset.value = 0;

      ctx.emit('drag', props.column);
      document.addEventListener('mouseup', endDragging);
      document.addEventListener('mousemove', handleMouseMove);
    };

    const dragTriggerEl = computed<Nullable<VNode>>(() => {
      if (!props.column.group.draggable || props.column.draggable === false)
        return null;

      return h('div', {
        class: 'q-table-t-head-cell__drag-element q-icon-drag-linear',
        onMousedown: handleDragTriggerMouseDown
      });
    });

    const dummyEl = computed<Nullable<VNode>>(() => {
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

    const dropZoneEls = computed<Nullable<VNode[]>>(() => {
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

    const cellContainerAttrs: QTableTHeadCellContainerAttrs = {
      class: contentClasses.value
    };

    if (isSortable.value) cellContainerAttrs.onClick = handleSortArrowClick;

    return (): VNode =>
      h(
        'th',
        { ref: root, class: cellClasses.value, style: cellStyles.value },
        [
          dummyEl.value,
          dropZoneEls.value,
          h('div', { class: 'q-table-t-head-cell__container' }, [
            h('div', cellContainerAttrs, [content.value]),
            sortArrowEl.value,
            dragTriggerEl.value
          ])
        ]
      );
  }
});
</script>

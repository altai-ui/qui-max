import {
  ref,
  computed,
  inject,
  onMounted,
  watch,
  nextTick,
  Ref,
  reactive
} from 'vue';

import type { QScrollbarProvider } from '@/qComponents/QScrollbar';
import type {
  QTableContainerProvider,
  ExtendedColumn
} from './QTableContainer';
import type { QTableTProvider } from './QTableT';
import type { StickyConfig } from './types';
import { CHECKBOX_COL_WIDTH } from './config';

const BASE_Z_INDEX = 20;

const useSticky = (
  root: Ref<HTMLElement | null>,
  column: Ref<ExtendedColumn>,
  columnIndex: Ref<number>
): StickyConfig => {
  const qScrollbar = inject<QScrollbarProvider>(
    'qScrollbar',
    {} as QScrollbarProvider
  );
  const QTableContainer = inject<QTableContainerProvider>(
    'qTableContainer',
    {} as QTableContainerProvider
  );

  const qTableT = inject<QTableTProvider>('qTableT', {} as QTableTProvider);

  const selectionColumnCorrection = computed<number>(() =>
    qTableT.isSelectionColumnStickable ? CHECKBOX_COL_WIDTH : 0
  );

  const isSticked = ref<boolean>(false);
  const triggerPoint = ref<number>(0);

  const isStickable = computed<boolean>(() =>
    Boolean(column.value.sticky?.position)
  );

  const position = computed<string>(
    () => column.value.sticky?.position ?? 'left'
  );

  const offset = computed<number>(() => {
    if (!isStickable.value) return 0;

    if (position.value === 'left') {
      return (
        qTableT.stickyOffsetLeftArr.value
          .slice(0, columnIndex.value)
          .reduce((acc: number, width: number): number => acc + width, 0) +
        selectionColumnCorrection.value
      );
    }

    return qTableT.stickyOffsetRightArr.value
      .slice(
        0,
        qTableT.stickyOffsetRightArr.value.length - columnIndex.value - 1
      )
      .reduce((acc: number, width: number): number => acc + width, 0);
  });

  const isLastSticked = computed<boolean>(
    () =>
      qTableT.stickedRightColumnList.value.sort()[0] === columnIndex.value ||
      qTableT.stickedLeftColumnList.value.sort().slice(-1)[0] ===
        columnIndex.value
  );

  const checkSticky = (value: number): void => {
    if (position.value === 'left') {
      isSticked.value =
        value >
        triggerPoint.value - offset.value - selectionColumnCorrection.value;
    } else {
      const parentWidth = root.value?.offsetParent?.clientWidth ?? 0;
      isSticked.value = parentWidth + value < triggerPoint.value + offset.value;
    }
  };

  if (isStickable.value) {
    watch(
      isSticked,
      value => {
        if (value) {
          if (position.value === 'left')
            qTableT.stickedLeftColumnList.value.push(columnIndex.value);
          if (position.value === 'right')
            qTableT.stickedRightColumnList.value.push(columnIndex.value);
        } else {
          if (position.value === 'left')
            qTableT.stickedLeftColumnList.value.sort().pop();
          if (position.value === 'right')
            qTableT.stickedRightColumnList.value.sort().shift();
        }
      },
      { immediate: true }
    );

    watch(
      [qScrollbar.moveXInPx, qScrollbar.sizeWidth],
      ([value]) => {
        nextTick(() => checkSticky(value ?? 0));
      },
      { immediate: true }
    );
  }

  const zIndex = ref<number>(
    BASE_Z_INDEX + QTableContainer.columnList.value.length
  );

  onMounted(() => {
    if (!root.value) return;

    zIndex.value =
      position.value === 'left'
        ? zIndex.value - columnIndex.value
        : zIndex.value + columnIndex.value;

    qTableT.stickyOffsetLeftArr.value.push(
      isStickable.value && position.value === 'left'
        ? root.value.clientWidth
        : 0
    );
    qTableT.stickyOffsetRightArr.value.unshift(
      isStickable.value && position.value === 'right'
        ? root.value.clientWidth
        : 0
    );

    if (isStickable.value) {
      const correction = position.value === 'left' ? 0 : root.value.clientWidth;
      triggerPoint.value = root.value.offsetLeft + correction;
    }
  });

  return reactive({
    isStickable,
    isSticked,
    isLastSticked,
    position,
    offset,
    zIndex
  });
};

export default useSticky;

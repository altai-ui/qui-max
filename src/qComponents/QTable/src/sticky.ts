import { ref, computed, inject, onMounted, watch, nextTick, Ref } from 'vue';

import type {
  QTableContainerProvider,
  ExtendedColumn
} from './QTableContainer';
import type { QTableTProvider } from './QTableT';
import type { StickyConfig } from './types';

const BASE_Z_INDEX = 20;

const useSticky = (
  root: Ref<HTMLElement | null>,
  column: Ref<ExtendedColumn>,
  columnIndex: Ref<number>
): StickyConfig => {
  const QTableContainer = inject<QTableContainerProvider>(
    'qTableContainer',
    {} as QTableContainerProvider
  );

  const qTableT = inject<QTableTProvider>('qTableT', {} as QTableTProvider);

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
      return qTableT.stickyOffsetLeftArr.value
        .slice(0, columnIndex.value)
        .reduce((acc: number, width: number): number => acc + width, 0);
    }

    return qTableT.stickyOffsetRightArr.value
      .slice(
        0,
        qTableT.stickyOffsetRightArr.value.length - columnIndex.value - 1
      )
      .reduce((acc: number, width: number): number => acc + width, 0);
  });

  const checkSticky = (value: number): void => {
    if (position.value === 'left') {
      isSticked.value = value > triggerPoint.value - offset.value;
    } else {
      const parentWidth = root.value?.offsetParent?.clientWidth ?? 0;
      isSticked.value = parentWidth + value < triggerPoint.value + offset.value;
    }
  };

  if (isStickable.value) {
    watch(
      () => qTableT.moveXInPx?.value,
      value => {
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
        ? zIndex.value + columnIndex.value
        : zIndex.value - columnIndex.value;

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

  return {
    isStickable,
    isSticked,
    position,
    offset,
    zIndex
  };
};

export default useSticky;

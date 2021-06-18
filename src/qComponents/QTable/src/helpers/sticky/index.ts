import { computed, reactive } from 'vue';
import { isNil } from 'lodash-es';

import type { StickyGlobalConfig } from '../../QTableTSticky/QTableTSticky';

import type { StickyConfig } from './types';

const BASE_Z_INDEX = 100;

const useSticky = (
  position: Nullable<'left' | 'right' | undefined>,
  columnIndex: number,
  sticky: StickyGlobalConfig
): StickyConfig => {
  const isStickable = computed<boolean>(() => Boolean(position));
  const preparedPosition = computed<'left' | 'right'>(() => position ?? 'left');

  const columnsLeftNew = sticky?.columnsLeftNew ?? {};
  const columnsRightNew = sticky?.columnsRightNew ?? {};

  const isSticked = computed<boolean>(() => {
    if (!isStickable.value) return false;
    if (position === 'left') return !isNil(columnsLeftNew[columnIndex]);
    if (position === 'right') return !isNil(columnsRightNew[columnIndex]);
    return false;
  });

  const isLastSticked = computed<boolean>(() => {
    if (!isStickable.value) return false;
    return (
      Object.keys(columnsRightNew).sort()[0] === String(columnIndex) ||
      Object.keys(columnsLeftNew).sort().slice(-1)[0] === String(columnIndex)
    );
  });

  const isFirstSticked = computed<boolean>(() => {
    if (!isStickable.value) return false;
    return (
      Object.keys(columnsRightNew).sort().slice(-1)[0] ===
        String(columnIndex) ||
      Object.keys(columnsLeftNew).sort()[0] === String(columnIndex)
    );
  });

  const offset = computed<number>(
    () =>
      columnsRightNew[String(columnIndex)] ??
      columnsLeftNew[String(columnIndex)] ??
      0
  );

  const zIndex = computed<number>(() =>
    position === 'left'
      ? BASE_Z_INDEX - columnIndex
      : BASE_Z_INDEX + columnIndex
  );

  return reactive({
    isStickable,
    isSticked,
    isFirstSticked,
    isLastSticked,
    position: preparedPosition,
    offset,
    zIndex
  });
};

export default useSticky;

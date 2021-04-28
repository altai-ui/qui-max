<template>
  <div
    ref="root"
    class="q-table-drag-elements"
    @mousedown.stop="handleColDrag"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { throttle } from 'lodash-es';

import type {
  QTableDragElementsProps,
  QTableDragElementsState,
  QTableDragElementsInstance
} from './types';

const shadowDropOffset = 3;

export default defineComponent({
  name: 'QTableDragElements',
  componentName: 'QTableDragElements',

  props: {
    parentSelector: {
      type: String,
      required: true
    },
    limitBoxSelector: {
      type: String,
      required: true
    },
    dummySelector: {
      type: String,
      required: true
    },
    separatorSelector: {
      type: String,
      required: true
    },
    targetSelector: {
      type: String,
      required: true
    },
    dropZoneSelector: {
      type: String,
      required: true
    },
    colIndex: {
      type: Number,
      required: true
    },
    isFirstBlocked: {
      type: Boolean,
      default: false
    }
  },

  emits: ['change-order'],

  setup(props: QTableDragElementsProps, ctx): QTableDragElementsInstance {
    const state = reactive<QTableDragElementsState>({
      diff: 0,
      colEl: null,
      dummyEl: null,
      separatorDummyEl: null,
      parent: null,
      parentBox: null,
      draggendIndex: null
    });

    const separatorDummyMove = (e: MouseEvent): void => {
      if (!state.separatorDummyEl || !state.parentBox || !state.parent) return;

      state.separatorDummyEl.style.display = 'block';

      const elem = document
        .elementFromPoint(e.pageX, e.pageY - window.pageYOffset)
        ?.closest<HTMLElement>(props.dropZoneSelector);

      if (!elem) return;

      if (elem.classList.contains('dnd-before')) {
        state.separatorDummyEl.style.left = `${
          elem.getBoundingClientRect().left -
          state.parentBox.left +
          state.parent.scrollLeft
        }px`;
      } else {
        state.separatorDummyEl.style.left = `${
          elem.getBoundingClientRect().right -
          state.parentBox.left +
          state.parent.scrollLeft
        }px`;
      }

      state.draggendIndex = parseInt(
        (elem.attributes as NamedNodeMap & { dndidx: { value: string } }).dndidx
          .value,
        10
      );
    };

    const trottledSeparatorDummyMove = throttle(separatorDummyMove, 100);

    const handleDummyMoving = (e: MouseEvent): void => {
      const dummy = state.dummyEl;
      if (!dummy || !state.parentBox || !state.parent) return;

      const limitBox = document
        .querySelector(props.limitBoxSelector)
        ?.getBoundingClientRect();

      if (!limitBox) return;

      if (e.pageX - state.diff < limitBox.left) {
        dummy.style.left = '0';
        return;
      }

      if (e.pageX > state.parentBox.right) {
        state.parent.scrollLeft += e.pageX - state.parentBox.right;

        dummy.style.left = `${e.pageX - dummy.outerWidth - state.diff}px`;

        return;
      }

      if (e.pageX < state.parentBox.left) {
        state.parent.scrollLeft -= e.pageX;

        dummy.style.left = `${e.pageX - state.diff}px`;

        return;
      }

      if (e.pageX - state.diff + dummy.offsetWidth > limitBox.right) {
        dummy.style.left = `${limitBox.right - dummy.outerWidth}px`;
        return;
      }

      if (e.clientY < limitBox.top || e.clientY > limitBox.bottom) {
        dummy.style.left = `${e.pageX - state.diff - limitBox.left}px`;
        return;
      }

      dummy.style.left = `${e.pageX - state.diff - limitBox.left}px`;

      trottledSeparatorDummyMove(e);
    };

    const handleDummyMovingEnd = (): void => {
      if (
        !state.dummyEl ||
        !state.separatorDummyEl ||
        state.draggendIndex === null
      )
        return;

      document.removeEventListener('mousemove', handleDummyMoving);
      document.removeEventListener('mouseup', handleDummyMovingEnd);

      state.dummyEl.style.cssText = '';
      state.separatorDummyEl.style.cssText = '';

      document.querySelectorAll('.dragInit').forEach(({ classList }) => {
        classList.remove('dragInit');
      });

      const isCurrentColBlocked = props.isFirstBlocked
        ? Boolean(state.draggendIndex)
        : state.draggendIndex > -1;

      if (
        isCurrentColBlocked &&
        props.colIndex !== state.draggendIndex &&
        props.colIndex !== state.draggendIndex - 1
      ) {
        const newPositionIndex =
          props.colIndex < state.draggendIndex
            ? state.draggendIndex - 1
            : state.draggendIndex;

        ctx.emit('change-order', {
          oldPositionIndex: props.colIndex,
          newPositionIndex
        });
      }

      state.draggendIndex = null;
      state.colEl = null;
    };

    const root = ref<HTMLElement | null>(null);

    const handleColDrag = (e: MouseEvent): void => {
      if (!root.value?.parentElement) return;

      state.colEl = root.value.parentElement.parentElement;
      state.parent = document.querySelector<HTMLElement>(props.parentSelector);
      state.dummyEl = document.querySelector<HTMLElement>(props.dummySelector);
      state.separatorDummyEl = document.querySelector<HTMLElement>(
        props.separatorSelector
      );

      if (
        !state.parent ||
        !state.colEl ||
        !state.dummyEl ||
        !state.separatorDummyEl
      )
        return;

      state.parentBox = state.parent.getBoundingClientRect();
      state.diff = e.pageX - state.colEl.getBoundingClientRect().left;

      const dummyStyles = [
        'display:block',
        `width:${state.colEl.offsetWidth}px`,
        `height:${state.parent.offsetHeight - shadowDropOffset}px`,
        `left:${
          e.pageX - state.diff - state.parentBox.left + state.parent.scrollLeft
        }px`
      ];

      const separatorDummyStyles = [
        `height:${state.parent.offsetHeight - shadowDropOffset}px`
      ];

      state.dummyEl.style.cssText = dummyStyles.join(';');
      state.separatorDummyEl.style.cssText = separatorDummyStyles.join(';');

      document.querySelectorAll(props.targetSelector).forEach(item => {
        item.classList.add('dragInit');
      });

      document.addEventListener('mousemove', handleDummyMoving);
      document.addEventListener('mouseup', handleDummyMovingEnd);
    };

    return {
      root,
      handleColDrag
    };
  }
});
</script>

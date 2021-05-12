<script lang="ts">
import {
  h,
  defineComponent,
  ref,
  computed,
  PropType,
  inject,
  VNode,
  onMounted,
  watch,
  nextTick
} from 'vue';

import type { QTableProvider } from './QTable';
import type { QTableTProvider } from './QTableT';
import type { ExtendedColumn } from './QTableContainer';
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
    const qTable = inject<QTableProvider | null>('qTable', null);
    const qTableT = inject<QTableTProvider | null>('qTableT', null);
    const root = ref<HTMLElement | null>(null);

    const isStickable = computed<boolean>(() =>
      Boolean(props.column.sticky?.position)
    );

    const position = computed<string>(
      () => props.column.sticky?.position ?? 'left'
    );

    const isSticky = ref<boolean>(false);

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t-total-cell': true,
      'q-table-t-total-cell_sticked': isSticky.value,
      [`q-table-t-total-cell_sticked_${position.value}`]: isSticky.value
    }));

    const offset = computed<string>(() => {
      if (!isStickable.value) return 0;

      if (position.value === 'left') {
        return qTableT?.stickyOffsetLeftArr.value
          .slice(0, props.columnIndex)
          .reduce((acc, num) => (acc += num), 0);
      }

      return qTableT?.stickyOffsetRightArr.value
        .slice(
          0,
          qTableT?.stickyOffsetRightArr.value.length - props.columnIndex - 1
        )
        .reduce((acc, num) => (acc += num), 0);
    });

    const rootStyles = computed<Record<string, string>>(() => {
      const classes: Record<string, string> = {};

      if (isSticky.value) classes[position.value] = `${offset.value}px`;

      return classes;
    });

    const content = computed<VNode[] | string | number | null>(() => {
      const slotName = props.column.slots?.total ?? 'total';
      const currentSlot = qTable?.slots[slotName];

      const value = qTable?.total.value?.[props.column.key] ?? null;

      if (!currentSlot) return String(value ?? '');

      return currentSlot({
        data: props.column,
        columnKey: props.column.key,
        index: props.columnIndex,
        value
      });
    });

    const trigger = ref<number>(0);

    const checkSticky = value => {
      if (position.value === 'left') {
        isSticky.value = (value ?? 0) > trigger.value - offset.value;
      } else {
        const parentWidth = root.value?.offsetParent.clientWidth ?? 0;
        isSticky.value =
          parentWidth + (value ?? 0) < trigger.value + offset.value;
      }
    };

    if (isStickable.value) {
      watch(
        () => qTableT?.moveXInPx?.value,
        value => {
          console.log('value', value);
          nextTick(() => checkSticky(value));
        },
        { immediate: true }
      );
    }

    onMounted(() => {
      qTableT?.stickyOffsetLeftArr.value.push(
        isStickable.value && position.value === 'left'
          ? root.value.clientWidth
          : 0
      );
      qTableT?.stickyOffsetRightArr.value.unshift(
        isStickable.value && position.value === 'right'
          ? root.value.clientWidth
          : 0
      );

      if (root.value && isStickable.value) {
        if (position.value === 'left') {
          trigger.value = root.value.offsetLeft;
        } else {
          trigger.value = root.value?.offsetLeft + root.value?.clientWidth;
        }
      }
    });

    return (): VNode =>
      h(
        'th',
        { ref: root, class: rootClasses.value, style: rootStyles.value },
        [
          h('div', { class: 'q-table-t-total-cell__container' }, [
            h('div', { class: 'q-table-t-total-cell__content' }, [
              content.value
            ])
          ])
        ]
      );
  }
});
</script>

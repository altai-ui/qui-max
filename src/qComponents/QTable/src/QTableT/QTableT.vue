<template>
  <table
    :class="rootClasses"
    cellspacing="0"
    cellpadding="0"
  >
    <q-table-t-colgroup v-if="isColgroupShown" />

    <thead
      ref="thead"
      class="q-table-t__thead"
    >
      <q-table-t-head class="q-table-t__head" />
      <q-table-t-total
        v-if="isTotalShown"
        class="q-table-t__total"
      />
    </thead>

    <q-table-t-body class="q-table-t__tbody" />
  </table>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  computed,
  provide,
  onBeforeUpdate,
  watch,
  reactive,
  nextTick
} from 'vue';
import { isEmpty } from 'lodash-es';

import type { QScrollbarProvider } from '@/qComponents/QScrollbar';

import QTableTBody from '../QTableTBody/QTableTBody.vue';
import QTableTColgroup from '../QTableTColgroup/QTableTColgroup.vue';
import QTableTHead from '../QTableTHead/QTableTHead.vue';
import QTableTTotal from '../QTableTTotal/QTableTTotal.vue';
import type { StickyConfig } from '../helpers/sticky.d';
import type { QTableProvider } from '../QTable';

import type { QTableTProvider, QTableTInstance } from './QTableT';

export default defineComponent({
  name: 'QTableT',
  componentName: ' QTableT',

  components: {
    QTableTBody,
    QTableTColgroup,
    QTableTHead,
    QTableTTotal
  },

  setup(): QTableTInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);

    const isColgroupShown = computed<boolean>(() =>
      Boolean(qTable.fixedLayout.value)
    );
    const isTotalShown = computed<boolean>(() => !isEmpty(qTable.total.value));

    const isSelectionColumnStickable = computed<boolean>(() =>
      Boolean(qTable.selectionColumn.value?.sticky)
    );

    const stickyConfig = ref<StickyConfig[]>([]);
    const stickedLeftColumnList = ref<number[]>([]);
    const stickedRightColumnList = ref<number[]>([]);
    const stickyOffsetLeftArr = ref<number[]>([]);
    const stickyOffsetRightArr = ref<number[]>([]);

    const isSticked = ref<boolean>(false);
    const isLastSticked = computed(
      () => isSticked.value && !stickedLeftColumnList.value.length
    );
    const selectionColumn = reactive({
      isSticked,
      isLastSticked
    });

    const qScrollbar = inject<QScrollbarProvider>(
      'qScrollbar',
      {} as QScrollbarProvider
    );
    const thead = ref<HTMLElement | null>(null);

    const checkSticky = (value: number): void => {
      isSticked.value = value > (thead.value?.offsetLeft ?? 0);
    };

    watch(
      [qScrollbar.moveXInPx, qScrollbar.sizeWidth],
      ([value]) => {
        if (qTable.selectionColumn.value?.sticky) {
          nextTick(() => checkSticky(value ?? 0));
        }
      },
      { immediate: true }
    );

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t': true,
      'q-table-t_fixed': isColgroupShown.value,
      'q-table-t_grided': Boolean(qTable.grided.value)
    }));

    onBeforeUpdate(() => {
      stickyConfig.value = [];
      stickedLeftColumnList.value = [];
      stickedRightColumnList.value = [];
      stickyOffsetLeftArr.value = [];
      stickyOffsetRightArr.value = [];
    });

    provide<QTableTProvider>('qTableT', {
      isSelectionColumnStickable,
      selectionColumn,
      stickyConfig,
      stickedLeftColumnList,
      stickedRightColumnList,
      stickyOffsetLeftArr,
      stickyOffsetRightArr
    });

    return {
      thead,
      isColgroupShown,
      isTotalShown,
      rootClasses
    };
  }
});
</script>

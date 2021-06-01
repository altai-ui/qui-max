<template>
  <table
    ref="root"
    :class="rootClasses"
    cellspacing="0"
    cellpadding="0"
  >
    <q-table-t-colgroup v-if="isColgroupShown" />

    <thead
      ref="thead"
      class="q-table-t__thead"
    >
      <q-table-t-sticky ref="sticky" />
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
  onMounted,
  onBeforeUnmount,
  ComponentPublicInstance,
  UnwrapRef
} from 'vue';
import { isEmpty } from 'lodash-es';

import { addResizeListener, removeResizeListener } from '@/qComponents/helpers';

import QTableTBody from '../QTableTBody/QTableTBody.vue';
import QTableTColgroup from '../QTableTColgroup/QTableTColgroup.vue';
import QTableTHead from '../QTableTHead/QTableTHead.vue';
import QTableTSticky from '../QTableTSticky/QTableTSticky.vue';
import QTableTTotal from '../QTableTTotal/QTableTTotal.vue';
import type { QTableProvider } from '../QTable';
import type {
  StickyGlobalConfig,
  QTableTStickyInstance
} from '../QTableTSticky/QTableTSticky';

import type { QTableTProvider, QTableTInstance } from './QTableT';

export default defineComponent({
  name: 'QTableT',
  componentName: ' QTableT',

  components: {
    QTableTBody,
    QTableTColgroup,
    QTableTHead,
    QTableTSticky,
    QTableTTotal
  },

  setup(): QTableTInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);

    const isColgroupShown = computed<boolean>(() =>
      Boolean(qTable.fixedLayout.value)
    );
    const isTotalShown = computed<boolean>(() => !isEmpty(qTable.total.value));

    const root = ref<HTMLElement | null>(null);
    const thead = ref<HTMLElement | null>(null);
    const sticky =
      ref<ComponentPublicInstance<UnwrapRef<QTableTStickyInstance>> | null>(
        null
      );

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t': true,
      'q-table-t_fixed': isColgroupShown.value,
      'q-table-t_grided': Boolean(qTable.grided.value)
    }));

    const stickyGlobalConfig = computed<StickyGlobalConfig>(
      () =>
        sticky.value?.stickyConfig ?? {
          columnsLeftNew: {},
          columnsRightNew: {}
        }
    );

    const tableHeight = ref<number | null>(null);

    provide<QTableTProvider>('qTableT', {
      stickyGlobalConfig,
      tableHeight
    });

    const setTableHeight = (): void => {
      const el = root.value;
      if (!el) return;

      const computedStyle = getComputedStyle(el);
      tableHeight.value =
        el.clientHeight -
        parseFloat(computedStyle.paddingTop) -
        parseFloat(computedStyle.paddingBottom);
    };

    onMounted(() => {
      addResizeListener(root.value, setTableHeight);
    });

    onBeforeUnmount(() => {
      removeResizeListener(root.value, setTableHeight);
    });

    return {
      root,
      thead,
      sticky,
      isColgroupShown,
      isTotalShown,
      rootClasses
    };
  }
});
</script>

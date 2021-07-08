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
import { defineComponent, inject, ref, computed, provide, watch } from 'vue';
import { isEmpty } from 'lodash-es';

import { useResizeListener } from '@/qComponents/hooks';
import type { Nullable, UnwrappedInstance } from '#/helpers';

import QTableTBody from '../QTableTBody/QTableTBody.vue';
import QTableTColgroup from '../QTableTColgroup/QTableTColgroup.vue';
import QTableTHead from '../QTableTHead/QTableTHead.vue';
import QTableTSticky from '../QTableTSticky/QTableTSticky.vue';
import QTableTTotal from '../QTableTTotal/QTableTTotal.vue';
import type { QTableProvider } from '../types';
import type {
  StickyGlobalConfig,
  QTableTStickyInstance
} from '../QTableTSticky/types';

import type { QTableTProvider, QTableTInstance } from './types';

const CHANGE_WIDTH_EVENT = 'change-width';

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

  emits: [CHANGE_WIDTH_EVENT],

  setup(_, ctx): QTableTInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);

    const isColgroupShown = computed<boolean>(() =>
      Boolean(qTable.fixedLayout.value)
    );
    const isTotalShown = computed<boolean>(() => !isEmpty(qTable.total.value));

    const root = ref<Nullable<HTMLElement>>(null);
    const thead = ref<Nullable<HTMLElement>>(null);
    const sticky = ref<UnwrappedInstance<QTableTStickyInstance>>(null);

    const rootResize = useResizeListener(root);

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

    const tableHeight = ref<Nullable<number>>(null);

    provide<QTableTProvider>('qTableT', {
      stickyGlobalConfig,
      tableHeight
    });

    watch(rootResize.observedEntry, value => {
      tableHeight.value = value?.contentRect?.height ?? null;
      ctx.emit(CHANGE_WIDTH_EVENT, value?.contentRect.width ?? null);
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

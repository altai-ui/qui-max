<template>
  <table
    :class="rootClasses"
    cellspacing="0"
    cellpadding="0"
  >
    <q-table-t-colgroup v-if="isColgroupShown" />

    <thead class="q-table-t__thead">
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
  onBeforeUpdate
} from 'vue';
import { isEmpty } from 'lodash-es';

import QTableTBody from './QTableTBody.vue';
import QTableTColgroup from './QTableTColgroup.vue';
import QTableTHead from './QTableTHead.vue';
import QTableTTotal from './QTableTTotal.vue';
import type { QTableProvider } from './QTable';
import type { QTableTProvider, QTableTInstance } from './QTableT';
import type { StickyConfig } from './types';

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
      Boolean(qTable?.fixedLayout.value)
    );
    const isTotalShown = computed<boolean>(() => !isEmpty(qTable?.total.value));

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t': true,
      'q-table-t_fixed': isColgroupShown.value
    }));

    const stickyConfig = ref<StickyConfig[]>([]);
    const stickedLeftColumnList = ref<number[]>([]);
    const stickedRightColumnList = ref<number[]>([]);
    const stickyOffsetLeftArr = ref<number[]>([]);
    const stickyOffsetRightArr = ref<number[]>([]);

    onBeforeUpdate(() => {
      stickyConfig.value = [];
      stickedLeftColumnList.value = [];
      stickedRightColumnList.value = [];
      stickyOffsetLeftArr.value = [];
      stickyOffsetRightArr.value = [];
    });

    provide<QTableTProvider>('qTableT', {
      stickyConfig,
      stickedLeftColumnList,
      stickedRightColumnList,
      stickyOffsetLeftArr,
      stickyOffsetRightArr
    });

    return {
      isColgroupShown,
      isTotalShown,
      rootClasses
    };
  }
});
</script>

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
import { defineComponent, inject, computed } from 'vue';
import { isEmpty } from 'lodash-es';

import QTableTBody from './QTableTBody.vue';
import QTableTColgroup from './QTableTColgroup.vue';
import QTableTHead from './QTableTHead.vue';
import QTableTTotal from './QTableTTotal.vue';
import type { QTableProvider } from './QTable';
import type { QTableTInstance } from './QTableT';

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
    const qTable = inject<QTableProvider | null>('qTable', null);

    const isColgroupShown = computed<boolean>(() =>
      Boolean(qTable?.fixedLayout.value)
    );
    const isTotalShown = computed<boolean>(() => !isEmpty(qTable?.total.value));

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-table-t': true,
      'q-table-t_fixed': isColgroupShown.value
    }));

    return {
      isColgroupShown,
      isTotalShown,
      rootClasses
    };
  }
});
</script>

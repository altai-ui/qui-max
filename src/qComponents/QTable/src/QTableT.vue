<template>
  <table
    class="q-table-t"
    cellspacing="0"
    cellpadding="0"
  >
    <thead class="q-table-t__thead">
      <q-table-t-head />
      <q-table-t-total v-if="isTotalShown" />
    </thead>

    <tbody class="q-table-t__tbody">

    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import { isEmpty } from 'lodash-es';

import QTableTHead from './QTableTHead.vue';
import QTableTTotal from './QTableTTotal.vue';
import type { QTableProvider } from './QTable';
import type { QTableTProps, QTableTInstance } from './QTableT';

export default defineComponent({
  name: 'QTableT',
  componentName: ' QTableT',

  components: {
    QTableTHead,
    QTableTTotal
  },

  props: {
    emptyText: {
      type: String,
      default: null
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props: QTableTProps): QTableTInstance {
    const qTable = inject<QTableProvider | null>('qTable', null);

    const isTotalShown = computed<boolean>(() => !isEmpty(qTable?.total.value));

    return {
      isTotalShown
    };
  }
});
</script>

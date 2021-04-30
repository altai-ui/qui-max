<template>
  <table
    class="q-table-t"
    cellspacing="0"
    cellpadding="0"
  >
    QTableT
    <q-table-t-head />
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import QTableTHead from './QTableTHead.vue';
import type { QTableTProps, QTableTInstance } from './QTableT';

export default defineComponent({
  name: 'QTableT',
  componentName: ' QTableT',

  components: {
    QTableTHead
  },

  props: {
    emptyText: {
      type: String,
      default: null
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props: QTableTProps): QTableTInstance {
    return {};
  }
});
</script>

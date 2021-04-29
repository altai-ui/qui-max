<template>
  <div
    ref="root"
    class="q-table"
  >
    table
    <q-table-empty :empty-text="emptyText" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import { validateArray } from '@/qComponents/helpers';
import QTableEmpty from './QTableEmpty.vue';

import type { QTableProps, QTableInstance } from './types';

export default defineComponent({
  name: 'QTable',
  componentName: ' QTable',

  components: {
    QTableEmpty
  },

  props: {
    /**
     * used to change 'loading file' text
     */
    emptyText: {
      type: String,
      default: null
    }
  },

  setup(props: QTableProps): QTableInstance {
    return {};
  }
});
</script>

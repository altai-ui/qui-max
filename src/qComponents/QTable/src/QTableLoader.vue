<template>
  <div
    class="q-table-loader"
    :class="{ 'q-table-loader_is-loading': isLoading }"
  >
    <div class="q-table-loader__circle">
      <div class="q-table-loader__quarter" />
      <div class="q-table-loader__quarter" />
      <div class="q-table-loader__quarter" />
      <div class="q-table-loader__quarter" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QTableLoader',
  componentName: 'QTableLoader',

  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  }
});
</script>

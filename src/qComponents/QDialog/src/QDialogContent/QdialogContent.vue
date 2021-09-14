<template>
  <div>
    <h2>{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'QDialogContent',
  props: {
    title: {
      type: [String],
      default: null
    }
  },

  setup() {
    onMounted(() => {});
  }
});
</script>

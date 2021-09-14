<template>
  <div>
    <h2>Test Dialog Inner Component</h2>
    <p>Lorem ipsum dolor sit amet</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'QDialogContent',
  props: {
    title: {
      type: String,
      default: null
    }
  },

  setup() {
    onMounted(() => {});
  }
});
</script>

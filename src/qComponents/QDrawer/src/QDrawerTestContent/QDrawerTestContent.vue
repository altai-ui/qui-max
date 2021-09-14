<template>
  <div>
    <p>{{ testProp }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'QDrawerTestContent',
  componentName: 'QDrawerTestContent',
  props: {
    testProp: {
      type: [String],
      default: null
    }
  },
  setup() {
    onMounted(() => {
      // eslint-disable-next-line no-console
      console.log('test');
    });
  }
});
</script>

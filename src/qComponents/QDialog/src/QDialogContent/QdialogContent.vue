<template>
  <div>
    <h2>Test Dialog Inner Component</h2>
    <p>Lorem ipsum dolor sit amet</p>
    <button @click="handleClick">Test</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QDialogContent',
  props: {
    title: {
      type: String,
      default: null
    }
  },

  emits: ['closed', 'done'],

  setup(_, { emit }) {
    const handleClick = (): void => {
      // eslint-disable-next-line no-console
      console.log('clicked test');
      emit('closed');
    };

    return {
      handleClick
    };
  }
});
</script>

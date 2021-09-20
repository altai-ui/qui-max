<template>
  <div class="q-dialog-content">
    <div class="q-dialog-content__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="q-dialog-content__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QDialogContent',
  componentName: 'QDialogContent',

  props: {
    /**
     * title of the QDialog
     */
    title: {
      type: String,
      default: null
    }
  }
});
</script>

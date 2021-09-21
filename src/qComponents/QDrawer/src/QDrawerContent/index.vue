<template>
  <div class="q-drawer-content">
    <div class="q-drawer-content__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="q-drawer-content__body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QDrawerContent',
  componentName: 'QDrawerContent',

  props: {
    /**
     * title of the QDrawer
     */
    title: {
      type: String,
      default: null
    }
  }
});
</script>

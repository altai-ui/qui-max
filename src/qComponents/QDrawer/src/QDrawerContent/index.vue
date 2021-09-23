<template>
  <div class="q-drawer-content">
    <div class="q-drawer-content__header">
      <div class="q-drawer-content__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <button
        type="button"
        class="q-drawer-content__close q-icon-close"
        @click="handleClose"
      />
    </div>
    <q-scrollbar
      theme="secondary"
      class="q-drawer-content__scrollbar"
      view-class="q-drawer-content__view"
      visible
    >
      <div class="q-drawer-content__body">
        <slot />
      </div>
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import QScrollbar from '@/qComponents/QScrollbar';

export default defineComponent({
  name: 'QDrawerContent',
  componentName: 'QDrawerContent',

  components: { QScrollbar },

  props: {
    title: {
      type: String,
      default: null
    }
  },

  setup() {
    const handleClose = inject('handleClose');

    return {
      handleClose
    };
  }
});
</script>

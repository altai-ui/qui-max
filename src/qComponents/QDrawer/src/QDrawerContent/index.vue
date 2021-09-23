<template>
  <div class="q-drawer-content">
    <div class="q-drawer-content__header">
      <div class="q-drawer-content__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <button
        type="button"
        class="q-drawer-content__close q-icon-close"
        @click="handleDrawerCloseButtonClick"
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
import { QDrawerContainerProvider } from '../QDrawerContainer';

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
    const QDrawerContainer =
      inject<QDrawerContainerProvider>('QDrawerContainer');
    const handleDrawerCloseButtonClick =
      QDrawerContainer?.closeDrawerButtonClick;

    return {
      handleDrawerCloseButtonClick
    };
  }
});
</script>

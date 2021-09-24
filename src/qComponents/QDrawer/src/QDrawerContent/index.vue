<template>
  <div class="q-drawer-content">
    <div class="q-drawer-content__header">
      <div class="q-drawer-content__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <button
        type="button"
        class="q-drawer-content__close q-icon-close"
        @click="handleCloseBtnClick"
      />
    </div>
    <q-scrollbar>
      <div class="q-drawer-content__body">
        <slot />
      </div>
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

import QScrollbar from '@/qComponents/QScrollbar';

import { Nullable } from '#/helpers';
import { QDrawerContainerProvider } from '../QDrawerContainer';
import { QDrawerContentInstance, QDrawerContentProps } from './types';

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

  setup(props: QDrawerContentProps): QDrawerContentInstance {
    const QDrawerContainer = inject<Nullable<QDrawerContainerProvider>>(
      'qDrawerContainer',
      null
    );

    const handleCloseBtnClick = (): void => {
      QDrawerContainer?.emitCloseEvent();
    };

    return {
      handleCloseBtnClick
    };
  }
});
</script>

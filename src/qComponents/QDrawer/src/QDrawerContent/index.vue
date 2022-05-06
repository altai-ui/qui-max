<template>
  <div class="q-drawer-content">
    <div
      v-if="title || $slots.title"
      class="q-drawer-content__title"
    >
      <slot name="title">{{ title }}</slot>
    </div>

    <button
      v-if="!hideCloseButton"
      type="button"
      class="q-drawer-content__close q-icon-close"
      @click="handleCloseBtnClick"
    />

    <q-scrollbar view-class="q-drawer-content__view">
      <div class="q-drawer-content__body">
        <slot />
      </div>
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

import { QScrollbar } from '@/qComponents/QScrollbar';

import type { Nullable } from '#/helpers';

import type { QDrawerContainerProvider } from '../QDrawerContainer';

import type { QDrawerContentInstance, QDrawerContentProps } from './types';

export default defineComponent({
  name: 'QDrawerContent',
  componentName: 'QDrawerContent',

  components: { QScrollbar },

  props: {
    /**
     * title of the QDrawer
     */
    title: {
      type: String,
      default: null
    },
    /**
     * whether to hide close button
     */
    hideCloseButton: {
      type: Boolean,
      default: false
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props: QDrawerContentProps): QDrawerContentInstance {
    const qDrawerContainer = inject<Nullable<QDrawerContainerProvider>>(
      'qDrawerContainer',
      null
    );

    const handleCloseBtnClick = (): void => {
      qDrawerContainer?.emitCloseEvent();
    };

    return {
      handleCloseBtnClick
    };
  }
});
</script>

<template>
  <div
    class="q-collapse-item"
    :class="{
      'q-collapse-item_active': isActive
    }"
  >
    <button
      type="button"
      class="q-collapse-item__header"
      @click="handleHeaderClick"
    >
      <slot name="title">
        <div class="q-collapse-item__title">{{ title }}</div>
      </slot>
      <component
        :is="customIcon"
        :class="collapseIconClass"
      />
    </button>

    <q-collapse-transition>
      <div
        v-show="isActive"
        class="q-collapse-item__body"
      >
        <div class="q-collapse-item__content">
          <slot />
        </div>
      </div>
    </q-collapse-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, type Component } from 'vue';

import { randId } from '@/qComponents/helpers';
import type { QCollapseProvider } from '@/qComponents/QCollapse';

import type { ClassValue } from '#/helpers';

import QCollapseTransition from './QCollapseTransition.vue';
import type { QCollapseItemProps, QCollapseItemInstance } from './types';

export default defineComponent({
  name: 'QCollapseItem',
  componentName: 'QCollapseItem',

  components: { QCollapseTransition },

  props: {
    title: {
      type: String,
      default: null
    },
    name: {
      type: [String, Number],
      default: null
    }
  },

  setup(props: QCollapseItemProps): QCollapseItemInstance {
    const qCollapse = inject<QCollapseProvider>('qCollapse');

    const preparedName = computed<string | number>(
      () =>
        props.name ?? qCollapse?.uniqueId('default-collapse-name-') ?? randId()
    );

    const isActive = computed<boolean>(
      () =>
        qCollapse?.activeNames?.value.includes(preparedName.value ?? '') ??
        false
    );

    const customIcon = computed<Component | string>(() => {
      if (!qCollapse?.openIcon || !qCollapse?.closeIcon) return 'div';

      return isActive.value ? qCollapse.closeIcon : qCollapse.openIcon;
    });

    const icon = computed<'q-icon-minus' | 'q-icon-plus'>(() =>
      isActive.value ? 'q-icon-minus' : 'q-icon-plus'
    );

    const collapseIconClass = computed<ClassValue>(() => ({
      'q-icon-collapse-item__icon': true,
      [icon.value]: customIcon.value === 'div'
    }));

    const handleHeaderClick = (): void => {
      if (preparedName.value) qCollapse?.updateValue(preparedName.value);
    };

    return {
      isActive,
      customIcon,
      collapseIconClass,
      handleHeaderClick
    };
  }
});
</script>

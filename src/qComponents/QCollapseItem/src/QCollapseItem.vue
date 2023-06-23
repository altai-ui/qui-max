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
      <div
        v-if="$slots['icon-active'] && $slots['icon-not-active']"
        class="q-icon-collapse-item__icon"
      >
        <slot
          v-if="isActive"
          name="icon-active"
        />
        <slot
          v-else
          name="icon-not-active"
        />
      </div>
      <div
        v-else
        class="q-collapse-item__icon"
        :class="icon"
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
import { defineComponent, inject, computed } from 'vue';

import { randId } from '@/qComponents/helpers';
import type { QCollapseProvider } from '@/qComponents/QCollapse';

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
    const icon = computed<'q-icon-minus' | 'q-icon-plus'>(() =>
        isActive.value ? 'q-icon-minus' : 'q-icon-plus'
    );

    const handleHeaderClick = (): void => {
      if (preparedName.value) qCollapse?.updateValue(preparedName.value);
    };

    return {
      isActive,
      icon,
      handleHeaderClick
    };
  }
});
</script>

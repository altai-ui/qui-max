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
      @click="handleTabClick"
    >
      <slot name="title">
        <div class="q-collapse-item__title">{{ title }}</div>
      </slot>
      <div class="q-collapse-item__icon" :class="icon" />
    </button>

    <q-collapse-transition>
      <div v-show="isActive" class="q-collapse-item__body">
        <div class="q-collapse-item__content">
          <slot />
        </div>
      </div>
    </q-collapse-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';

import { QCollapseProvider } from '../../QCollapse';
import QCollapseTransition from './QCollapseTransition.vue';

export default defineComponent({
  name: 'QCollapseItem',
  componentName: 'QCollapseItem',

  components: { QCollapseTransition },

  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: null
    }
  },

  setup(props) {
    const qCollapse = inject<QCollapseProvider>('qCollapse');

    const preparedName = computed(
      () => props.name ?? qCollapse?.uniqueId('default-collapse-name-')
    );
    const isActive = computed(
      () => qCollapse?.activeNames?.value.includes(preparedName.value) ?? false
    );
    const icon = computed(() =>
      isActive.value ? 'q-icon-minus' : 'q-icon-plus'
    );

    const handleTabClick = () => {
      qCollapse?.updateValue(preparedName.value);
    };

    return {
      isActive,
      icon,
      handleTabClick
    };
  }
});
</script>

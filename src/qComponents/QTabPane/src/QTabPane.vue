<template>
  <div
    class="q-tab-pane"
    :style="tabWidthStyle"
  >
    <div class="q-tab-pane__inner">
      <button
        type="button"
        class="q-tab-pane__btn"
        :class="tabBtnClasses"
        :disabled="isDisabled"
        @click="handleTabClick"
      >
        {{ title }}
      </button>

      <slot name="content" />
    </div>
    <div
      v-if="description"
      class="q-tab-pane__description"
    >
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';

import type { QTabsProvider } from '@/qComponents/QTabs';
import type { QTabPaneProps, QTabPaneInstance } from './types';

export default defineComponent({
  name: 'QTabPane',
  componentName: 'QTabPane',

  props: {
    /**
     * key of QTabPane
     */
    name: {
      type: String,
      required: true
    },
    /**
     * title of QTabPane
     */
    title: {
      type: String,
      required: true
    },
    /**
     * description of QTabPane
     */
    description: {
      type: String,
      default: null
    },
    /**
     * width of QTabPane
     */
    width: {
      type: [String, Number],
      default: null
    },
    /**
     * whether QTabPane is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props: QTabPaneProps): QTabPaneInstance {
    const qTabs = inject<QTabsProvider>('qTabs');

    const isDisabled = computed<boolean>(
      () => props.disabled || Boolean(qTabs?.disabled.value)
    );

    const tabWidthStyle = computed<Record<string, string>>(() => {
      const width = props.width ?? qTabs?.tabWidth.value ?? '';

      return {
        '--tab-pane-width': Number.isNaN(Number(width))
          ? `${Number(width)}px`
          : String(width)
      };
    });

    const tabBtnClasses = computed<Record<string, boolean>>(() => ({
      'q-tab-pane__btn_active': qTabs?.currentName.value === props.name,
      'q-tab-pane__btn_disabled': isDisabled.value
    }));

    const handleTabClick = (): void => {
      qTabs?.updateValue(props.name);
    };

    return {
      isDisabled,
      tabWidthStyle,
      tabBtnClasses,
      handleTabClick
    };
  }
});
</script>

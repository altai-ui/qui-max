<template>
  <div
    :id="uniqueId"
    :class="rootClasses"
    role="menuitem"
    tabindex="-1"
  >
    <div
      v-if="multiple"
      class="q-cascader-row__checkbox"
    >
      <q-checkbox
        ref="checkbox"
        input-tab-index="-1"
        :disabled="disabled"
      />
    </div>

    <span class="q-cascader-row__label">{{ label }}</span>

    <span
      v-if="isIconShown"
      :class="iconClasses"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import type { QCascaderRowProps, QCascaderRowInstance } from './QCascaderRow';

export default defineComponent({
  name: 'QCascaderRow',
  componentName: 'QCascaderRow',

  props: {
    uniqueId: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    hasChildren: {
      type: Boolean,
      required: true
    },
    multiple: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props: QCascaderRowProps): QCascaderRowInstance {
    const checkbox = ref<HTMLElement | null>(null);

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-cascader-row': true,
      'q-cascader-row_disabled': Boolean(props.disabled)
    }));

    const isIconShown = computed<boolean>(
      () => props.disabled || props.hasChildren
    );

    const iconClasses = computed<Record<string, boolean>>(() => ({
      'q-cascader-row__icon': true,
      'q-icon-lock': Boolean(props.disabled),
      'q-icon-triangle-right': !props.disabled && props.hasChildren
    }));

    return {
      checkbox,
      rootClasses,
      isIconShown,
      iconClasses
    };
  }
});
</script>

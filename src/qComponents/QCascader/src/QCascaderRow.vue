<template>
  <div
    :id="uniqueId"
    :class="rootClasses"
    role="menuitem"
    tabindex="-1"
    @click="handleClick"
    @keyup.right="handleRightKeyUp"
    @keyup.enter="handleEnterKeyUp"
  >
    <div
      v-if="multiple"
      class="q-cascader-row__checkbox"
    >
      <q-checkbox
        input-tab-index="-1"
        :disabled="disabled"
        @change="handleCheckboxChange"
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
import { defineComponent, computed } from 'vue';

import type { QCascaderRowProps, QCascaderRowInstance } from './QCascaderRow';

const EXPAND_EVENT = 'expand';
const CHECK_EVENT = 'check';

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
    expanded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: [EXPAND_EVENT, CHECK_EVENT],

  setup(props: QCascaderRowProps, ctx): QCascaderRowInstance {
    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-cascader-row': true,
      'q-cascader-row_disabled': Boolean(props.disabled),
      'q-cascader-row_expanded': Boolean(props.expanded)
    }));

    const isIconShown = computed<boolean>(
      () => props.disabled || props.hasChildren
    );

    const iconClasses = computed<Record<string, boolean>>(() => {
      const isArrowShown = !props.disabled && props.hasChildren;

      return {
        'q-cascader-row__icon': true,
        'q-icon-lock': Boolean(props.disabled),
        'q-icon-triangle-right': isArrowShown,
        'q-cascader-row__icon_reverse': isArrowShown && Boolean(props.expanded)
      };
    });

    const handleClick = (): void => {
      if (props.disabled) return;

      if (!props.multiple && !props.hasChildren) {
        ctx.emit(CHECK_EVENT);
      }

      ctx.emit(EXPAND_EVENT);
    };

    const handleRightKeyUp = (): void => {
      if (props.disabled || !props.hasChildren) return;

      ctx.emit(EXPAND_EVENT);
    };

    const handleEnterKeyUp = (): void => {
      if (props.disabled || (!props.multiple && props.hasChildren)) return;

      ctx.emit(CHECK_EVENT);
    };

    const handleCheckboxChange = (): void => {
      ctx.emit(CHECK_EVENT);
    };

    return {
      rootClasses,
      isIconShown,
      iconClasses,
      handleClick,
      handleRightKeyUp,
      handleEnterKeyUp,
      handleCheckboxChange
    };
  }
});
</script>

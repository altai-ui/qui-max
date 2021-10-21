<template>
  <div
    :id="uniqueId"
    :class="rootClasses"
    role="menuitem"
    :tabindex="row.disabled ? false : -1"
    @click="handleClick"
    @keyup.right="handleRightKeyUp"
    @keyup.enter="handleEnterKeyUp"
  >
    <div
      v-if="isMultiple || (!isMultiple && isCheckStrictly)"
      class="q-cascader-row__checkbox"
    >
      <q-checkbox
        tabindex="-1"
        :model-value="isChecked"
        :indeterminate="isIndeterminate"
        :disabled="row.disabled"
        @change="handleCheckboxChange"
      />
    </div>

    <span class="q-cascader-row__label">{{ row.label }}</span>

    <span
      v-if="isIconShown"
      :class="iconClasses"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, PropType } from 'vue';

import QCheckbox from '@/qComponents/QCheckbox';
import getChildStatuses from '../helpers/getChildStatuses';
import type { QCascaderProvider } from '../types';

import type {
  QCascaderRowPropRow,
  QCascaderRowProps,
  QCascaderRowInstance
} from './types';

export default defineComponent({
  name: 'QCascaderRow',
  components: { QCheckbox },
  componentName: 'QCascaderRow',

  props: {
    uniqueId: {
      type: String,
      required: true
    },
    row: {
      type: [Object] as PropType<QCascaderRowPropRow>,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },

  emits: ['expand', 'check'],

  setup(props: QCascaderRowProps, ctx): QCascaderRowInstance {
    const qCascader = inject<QCascaderProvider>(
      'qCascader',
      {} as QCascaderProvider
    );

    const isMultiple = computed<boolean>(
      () => qCascader.multiple.value ?? false
    );

    const isCheckStrictly = computed<boolean>(
      () => qCascader.checkStrictly.value ?? false
    );

    const childStatuses = computed<boolean[]>(() => {
      if (!qCascader.multiple.value || qCascader.checkStrictly.value) return [];
      return getChildStatuses(props.row, qCascader.modelValue.value);
    });

    const isChecked = computed<boolean>(() => {
      const modelValue = qCascader.modelValue.value;
      if (!isMultiple.value) return modelValue === props.row.value;

      if (!qCascader.checkStrictly.value)
        return (
          Boolean(childStatuses.value.length) &&
          childStatuses.value.every(Boolean)
        );

      return Array.isArray(modelValue)
        ? modelValue.includes(props.row.value)
        : false;
    });

    const isIndeterminate = computed<boolean>(() => {
      if (
        !qCascader.multiple.value ||
        qCascader.checkStrictly.value ||
        isChecked.value
      )
        return false;

      if (childStatuses.value.every(Boolean)) return false;
      return childStatuses.value.some(Boolean);
    });

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-cascader-row': true,
      'q-cascader-row_disabled': Boolean(props.row.disabled),
      'q-cascader-row_expanded': Boolean(props.expanded),
      'q-cascader-row_checked': isChecked.value
    }));

    const hasChildren = computed<boolean>(() =>
      Boolean(props.row.children?.length)
    );

    const isIconShown = computed<boolean>(
      () => props.row.disabled || hasChildren.value
    );

    const iconClasses = computed<Record<string, boolean>>(() => {
      const isArrowShown = !props.row.disabled && hasChildren.value;

      return {
        'q-cascader-row__icon': true,
        'q-icon-lock': Boolean(props.row.disabled),
        'q-icon-triangle-right': isArrowShown,
        'q-cascader-row__icon_reverse': isArrowShown && Boolean(props.expanded)
      };
    });

    const handleClick = (): void => {
      if (props.row.disabled) return;

      if (!isMultiple.value && !props.row.children) {
        ctx.emit('check', props.row, isChecked.value);
      }

      ctx.emit('expand', props.rowIndex, hasChildren.value);
    };

    const handleRightKeyUp = (): void => {
      if (props.row.disabled) return;

      ctx.emit('expand', props.rowIndex, hasChildren.value);
    };

    const handleEnterKeyUp = (): void => {
      if (props.row.disabled || (!isMultiple.value && hasChildren.value))
        return;

      ctx.emit('check', props.row, isChecked.value);
    };

    const handleCheckboxChange = (): void => {
      ctx.emit('check', props.row, isChecked.value);
    };

    return {
      rootClasses,
      isMultiple,
      isCheckStrictly,
      isChecked,
      isIndeterminate,
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

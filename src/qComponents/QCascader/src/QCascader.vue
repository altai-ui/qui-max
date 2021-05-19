<template>
  <div :class="rootClasses">
    cascader
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';

import type { QFormProvider } from '@/qComponents/QForm';
// import type { QFormItemProvider } from '@/qComponents/QFormItem';

import type {
  QCascaderPropModelValue,
  QCascaderProps,
  QCascaderInstance
} from './QCascader';

export default defineComponent({
  props: {
    /**
     * binding value
     */
    modelValue: {
      type: [String, Number, Array] as QCascaderPropModelValue,
      default: null
    },
    /**
     * array of objects with required fields, example:
     * `{ value: 'guide', label: 'Guide', children: [{ ... }] }`
     */
    options: {
      type: Array,
      default: null
    },
    /**
     * separator in tags
     */
    separator: {
      type: String,
      default: ' / '
    },
    /**
     * whether QCascader accept multiple values
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * whether QCascader is clearable
     */
    clearable: {
      type: Boolean,
      default: false
    },
    /**
     * whether QCascader is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props: QCascaderProps): QCascaderInstance {
    const qForm = inject<QFormProvider | null>('qForm', null);
    // const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);

    const isDisabled = computed(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-cascader': true,
      'q-cascader_disabled': isDisabled.value,
      'q-cascader_multiple': Boolean(props.multiple),
      'q-cascader_clearable': Boolean(props.clearable)
    }));

    return {
      rootClasses
    };
  }
});
</script>

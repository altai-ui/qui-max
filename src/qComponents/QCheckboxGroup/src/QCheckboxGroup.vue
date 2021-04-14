<template>
  <component
    :is="tag"
    :class="['q-checkbox-group', `q-checkbox-group_${direction}`]"
    role="group"
    aria-label="checkbox-group"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  PropType,
  provide,
  watch,
  computed,
  toRefs
} from 'vue';
import { QFormItemProvider } from '@/qComponents/QFormItem';

import type { QCheckboxGroupProvider } from './types';

const UPDATE_MODEL_VALUE_EVENT = 'update:modelValue';

export default defineComponent({
  name: 'QCheckboxGroup',
  componentName: 'QCheckboxGroup',

  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    /**
     * disable all inner QCheckbox'es
     */
    disabled: { type: Boolean, default: false },
    /**
     * minimum checked values
     */
    min: { type: Number, default: 0 },
    /**
     * maximum checked values
     */
    max: { type: Number, default: Infinity },
    /**
     * root tag
     */
    tag: { type: String, default: 'div' },
    /**
     * vertical renders to column, horizontal to row
     */
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
      validator: (value: string) => ['vertical', 'horizontal'].includes(value)
    }
  },

  emits: [UPDATE_MODEL_VALUE_EVENT],

  setup(props, ctx) {
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);

    const isLimitExceeded = computed(
      () =>
        props.modelValue.length < props.min ||
        props.modelValue.length > props.max
    );

    const update = (value: string[]) => {
      ctx.emit(UPDATE_MODEL_VALUE_EVENT, value);
    };

    watch(
      () => props.modelValue,
      () => {
        qFormItem?.validateField('change');
      }
    );

    const { modelValue, min, max, disabled } = toRefs(props);

    provide<QCheckboxGroupProvider>('qCheckboxGroup', {
      modelValue,
      min,
      max,
      disabled,
      isLimitExceeded,
      update
    });
  }
});
</script>

<template>
  <component
    :is="tag || 'div'"
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

import { validateArray } from '@/qComponents/helpers';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { Nullable } from '#/helpers';

import type {
  QCheckboxGroupProps,
  QCheckboxGroupPropDirection,
  QCheckboxGroupProvider,
  QCheckboxGroupInstance
} from './types';

export default defineComponent({
  name: 'QCheckboxGroup',
  componentName: 'QCheckboxGroup',

  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: (): [] => []
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
      type: String as PropType<QCheckboxGroupPropDirection>,
      default: 'vertical',
      validator: validateArray<QCheckboxGroupPropDirection>([
        'vertical',
        'horizontal'
      ])
    }
  },

  emits: [
    /**
     * triggers when model updates
     */
    'update:modelValue',
    /**
     * alias for update:modelValue
     */
    'change'
  ],

  setup(props: QCheckboxGroupProps, ctx): QCheckboxGroupInstance {
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);

    const isLimitExceeded = computed<boolean>(() => {
      const modelValueLength = props.modelValue?.length ?? 0;

      return (
        (props.min !== null && modelValueLength < props.min) ||
        (props.max !== null && modelValueLength > props.max)
      );
    });

    const update = (value: string[]): void => {
      ctx.emit('update:modelValue', value);
      ctx.emit('change', value);
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

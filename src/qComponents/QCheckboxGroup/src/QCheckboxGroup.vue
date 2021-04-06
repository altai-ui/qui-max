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
import { defineComponent, inject, PropType, watch } from "vue";
import { QFormItemProvider } from '@/qComponents/QFormItem';

export default defineComponent({
  name: 'QCheckboxGroup',
  componentName: 'QCheckboxGroup',

  props: {
    modelValue: {
      type: Array,
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
      validator: value => ['vertical', 'horizontal'].includes(value)
    }
  },

  setup(props) {
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);

    watch(() => props.modelValue, () => {
      qFormItem?.validateField('change');
    })
  },
});
</script>

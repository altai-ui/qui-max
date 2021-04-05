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

<script>
import Emitter from '../../mixins/emitter';

export default {
  name: 'QCheckboxGroup',
  componentName: 'QCheckboxGroup',

  mixins: [Emitter],

  inject: {
    qFormItem: {
      default: null
    }
  },

  props: {
    value: {
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
      type: String,
      default: 'vertical',
      validator: value => ['vertical', 'horizontal'].includes(value)
    }
  },

  watch: {
    value() {
      this.qFormItem?.validateField('change');
    }
  }
};
</script>

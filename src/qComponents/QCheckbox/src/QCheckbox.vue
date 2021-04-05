<template>
  <component
    :is="rootTag"
    class="q-checkbox"
    :class="{
      'q-checkbox_disabled': isDisabled,
      'q-checkbox_checked': isChecked
    }"
  >
    <span
      class="q-checkbox__input"
      :class="{
        'q-checkbox__input_disabled': isDisabled,
        'q-checkbox__input_checked': isChecked,
        'q-checkbox__input_focus': focus
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="q-checkbox__inner">
        <span
          class="q-checkbox__inner-icon"
          :class="{
            'q-icon-minus': indeterminate,
            'q-icon-check': isChecked
          }"
        />
      </span>
      <input
        ref="checkboxInput"
        v-model="model"
        class="q-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        :tabindex="inputTabIndex"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span
      v-if="$slots.default || label"
      class="q-checkbox__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script>
import { computed, defineComponent, inject, reactive } from 'vue';
import { isBoolean } from 'lodash-es';
import { QFormProvider } from '@/qComponents/QForm';
import { QFormItemProvider } from '@/qComponents/QFormItem';

export default defineComponent({
  name: 'QCheckbox',
  componentName: 'QCheckbox',

  props: {
    /**
     * Array for group, Boolean for single
     */
    modelValue: {
      type: [Array, Boolean],
      default: null
    },
    /**
     * Checkbox label
     */
    label: { type: String, default: '' },
    /**
     * wheteher Checkbox is indeterminate
     */
    indeterminate: { type: Boolean, default: false },
    /**
     * wheteher Checkbox is disabled
     */
    disabled: { type: Boolean, default: false },
    /**
     * wheteher Checkbox is checked
     */
    checked: { type: Boolean, default: false },
    /**
     * as native name
     */
    name: { type: String, default: '' },
    rootTag: { type: String, default: 'label' },
    /**
     * as native tabIndex
     */
    inputTabIndex: {
      type: [Number, String],
      default: null
    }
  },

  setup(props, ctx) {
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const qForm = inject<QFormProvider | null>('qForm', null);

    const store = computed(() => {
      return state.checkboxGroup ? state.checkboxGroup.value : props.modelValue;
    });

    const model = computed({
      get: () => {
        const result = props.modelValue !== undefined ? props.modelValue : state.selfModel;
        return state.isGroup ? this.store : result;
      },
      set: val => {
        count.value = val - 1
      }
    });

    const isChecked = computed(() => {
      if (isBoolean(this.model)) return this.model;
      if (Array.isArray(this.model)) return this.model.includes(this.label);
      return false;
    },

    const state = reactive({
      selfModel: false,
      focus: false,
      isLimitExceeded: false,
      isGroup: false,
      checkboxGroup: null
    });

    return {
      state,
      model
    }
  },

  computed: {
    model: {
      get() {
        const result = this.value !== undefined ? this.value : this.selfModel;
        return this.isGroup ? this.store : result;
      },
      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          if (
            val.length < this.checkboxGroup.min ||
            val.length > this.checkboxGroup.max
          ) {
            this.isLimitExceeded = true;
          }
          if (!this.isLimitExceeded)
            this.dispatch('QCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },

    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled() {
      const { max, min } = this.checkboxGroup;
      return (
        (Boolean(max || min) && this.model.length >= max && !this.isChecked) ||
        (this.model.length <= min && this.isChecked)
      );
    },

    isDisabled() {
      return this.isGroup
        ? this.checkboxGroup.disabled ||
            this.disabled ||
            (this.qForm?.disabled ?? false) ||
            this.isLimitDisabled
        : this.disabled || (this.qForm?.disabled ?? false);
    }
  },

  watch: {
    value() {
      this.qFormItem?.validateField('change');
    }
  },

  created() {
    if (this.checked) this.addToStore();
  },

  mounted() {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.componentName !== 'QCheckboxGroup') {
        parent = parent.$parent;
        this.isGroup = false;
      } else {
        this.checkboxGroup = parent;
        this.isGroup = true;
        break;
      }
    }
  },

  methods: {
    /**
     * @public
     */
    nativeClick() {
      this.$refs.checkboxInput.click();
    },

    addToStore() {
      if (Array.isArray(this.model) && this.model.includes(this.label)) {
        this.model.push(this.label);
        return;
      }

      this.model = false;
    },

    handleChange(event) {
      if (this.isLimitExceeded) return;
      const value = event.target.checked;
      this.$emit('change', value, event);

      if (this.isGroup) {
        this.$nextTick(() => {
          this.dispatch('QCheckboxGroup', 'change', [this.checkboxGroup.value]);
        });
      }
    }
  }
});
</script>

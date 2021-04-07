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
        'q-checkbox__input_focus': state.focus
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
        v-bind="$attrs"
        ref="checkboxInput"
        v-model="model"
        class="q-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        @focus="state.focus = true"
        @blur="state.focus = false"
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

<script lang="ts">
import { computed, defineComponent, inject, reactive, watch, ref } from 'vue';
import { QFormProvider } from '@/qComponents/QForm';
import { QFormItemProvider } from '@/qComponents/QFormItem';
import { QCheckboxGroupProvider } from '@/qComponents/QCheckboxGroup/src/types';

export default defineComponent({
  name: 'QCheckbox',
  componentName: 'QCheckbox',
  inheritAttrs: false,

  props: {
    /**
     * Array for group, Boolean for single
     */
    modelValue: {
      type: Boolean,
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
    rootTag: { type: String, default: 'label' },
  },

  emits: ['input', 'update:modelValue', 'change'],

  setup(props, ctx) {
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const qForm = inject<QFormProvider | null>('qForm', null);
    const qCheckboxGroup = inject<QCheckboxGroupProvider | null>('qCheckboxGroup', null);
    const checkboxInput = ref(null);

    const state = reactive({
      focus: false,
    });

    const isChecked = computed(() => {
      if (qCheckboxGroup) {
        return qCheckboxGroup.modelValue.value.includes(props.label);
      }

      return props.modelValue
    })

    const isLimitDisabled = computed(() => {
      if (qCheckboxGroup === null) return false;
      const { max, min } = qCheckboxGroup;
      return (
        (Boolean(max.value || min.value) && qCheckboxGroup.modelValue.value.length >= max.value && !isChecked.value) ||
        (qCheckboxGroup.modelValue.value.length <= min.value && isChecked.value)
      );
    });

    const isDisabled = computed(() => {
      return qCheckboxGroup
        ? qCheckboxGroup?.disabled.value ||
            props.disabled ||
            (qForm?.disabled ?? false) ||
            isLimitDisabled.value
        : props.disabled || (qForm?.disabled ?? false);
    })

    const model = computed({
      get: () => isChecked.value,
      set: (value) => {
        if (!qCheckboxGroup) {
          ctx.emit('update:modelValue', value);
          ctx.emit('change', value)
        } else {
          const set = new Set(qCheckboxGroup.modelValue.value)
          if (value) {
            set.add(props.label)
          } else {
            set.delete(props.label)
          }

          qCheckboxGroup.update(Array.from(set));
        }
      }
    })

    watch(() => props.modelValue, () => {
      qFormItem?.validateField('change');
    })

    /**
     * @public
     */
    const nativeClick = (): void => {
      const checkboxEl: HTMLInputElement | null = checkboxInput.value;
      checkboxEl?.click();
    };

    return {
      state,
      model,
      isChecked,
      isLimitDisabled,
      isDisabled,
      nativeClick,
      checkboxInput
    }
  },
});
</script>

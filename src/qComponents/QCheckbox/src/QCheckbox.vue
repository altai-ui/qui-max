<template>
  <component
    :is="rootTag || 'label'"
    class="q-checkbox"
    :class="{
      'q-checkbox_disabled': isDisabled,
      'q-checkbox_checked': isChecked
    }"
    @click.prevent="handleCheckboxClick"
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
        v-bind="$attrs"
        ref="checkboxInput"
        :value="isChecked"
        class="q-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
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

<script lang="ts">
import { computed, defineComponent, inject, watch, ref } from 'vue';

import {
  UPDATE_MODEL_VALUE_EVENT,
  CHANGE_EVENT
} from '@/qComponents/constants/events';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { QCheckboxGroupProvider } from '@/qComponents/QCheckboxGroup';

import type { QCheckboxProps, QCheckboxInstance } from './types';

export default defineComponent({
  name: 'QCheckbox',
  componentName: 'QCheckbox',

  inheritAttrs: false,

  props: {
    /**
     * Array for group, Boolean for single
     */
    modelValue: { type: Boolean, default: null },
    /**
     * Checkbox label
     */
    label: { type: String, default: null },
    /**
     * wheteher Checkbox is indeterminate
     */
    indeterminate: { type: Boolean, default: false },
    /**
     * wheteher Checkbox is disabled
     */
    disabled: { type: Boolean, default: false },
    rootTag: { type: String, default: 'label' },
    /**
     * wheteher is validate parent q-form if present
     */
    validateEvent: { type: Boolean, default: false }
  },

  emits: [UPDATE_MODEL_VALUE_EVENT, CHANGE_EVENT],

  setup(props: QCheckboxProps, ctx): QCheckboxInstance {
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const qForm = inject<QFormProvider | null>('qForm', null);
    const qCheckboxGroup = inject<QCheckboxGroupProvider | null>(
      'qCheckboxGroup',
      null
    );
    const checkboxInput = ref<HTMLInputElement | null>(null);

    const focus = ref<boolean>(false);

    const isChecked = computed<boolean>(() => {
      if (!qCheckboxGroup) return Boolean(props.modelValue);

      return (
        qCheckboxGroup.modelValue.value?.includes(props.label ?? '') ?? false
      );
    });

    const isLimitDisabled = computed<boolean>(() => {
      if (qCheckboxGroup === null) return false;

      const { max, min, modelValue } = qCheckboxGroup;
      const groupLength = modelValue.value?.length ?? 0;

      return (
        (max.value !== null && groupLength >= max.value && !isChecked.value) ||
        (min.value !== null && groupLength <= min.value && isChecked.value)
      );
    });

    const isDisabled = computed<boolean>(() =>
      qCheckboxGroup
        ? qCheckboxGroup?.disabled.value ||
          props.disabled ||
          (qForm?.disabled.value ?? false) ||
          isLimitDisabled.value
        : props.disabled || (qForm?.disabled.value ?? false)
    );

    const handleCheckboxClick = (): void => {
      const value = !isChecked.value;

      if (!qCheckboxGroup) {
        ctx.emit(UPDATE_MODEL_VALUE_EVENT, value);
        ctx.emit(CHANGE_EVENT, value);
      } else {
        if (!props.label) return;

        const set = new Set(qCheckboxGroup.modelValue.value);

        if (value) {
          set.add(props.label);
        } else {
          set.delete(props.label);
        }

        qCheckboxGroup.update(Array.from(set));
      }

      watch(
        () => props.modelValue,
        () => {
          if (props.validateEvent) qFormItem?.validateField('change');
        }
      );
    };

    /**
     * @public
     */
    const nativeClick = (): void => {
      const checkboxEl: HTMLInputElement | null = checkboxInput.value;
      checkboxEl?.click();
    };

    return {
      focus,
      isChecked,
      isLimitDisabled,
      isDisabled,
      nativeClick,
      checkboxInput,
      handleCheckboxClick
    };
  }
});
</script>

<template>
  <component
    :is="rootTag || 'label'"
    class="q-checkbox"
    :class="qCheckboxClasses"
    @click.prevent="handleCheckboxClick"
  >
    <span
      class="q-checkbox__input"
      :class="qCheckboxInputClasses"
      :tabindex="isIndeterminate ? 0 : undefined"
      :role="isIndeterminate ? 'checkbox' : undefined"
      :aria-checked="isIndeterminate ? 'mixed' : false"
    >
      <span class="q-checkbox__inner">
        <span
          class="q-checkbox__inner-icon"
          :class="qCheckboxInnerIconClasses"
        />
      </span>
      <input
        v-bind="$attrs"
        ref="checkboxInput"
        :value="isChecked"
        class="q-checkbox__original"
        type="checkbox"
        :aria-hidden="isIndeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span
      v-if="$slots.default || label"
      class="q-checkbox__label"
      :class="labelClass"
    >
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, inject, watch, ref } from 'vue';
import type { PropType } from 'vue';

import { validateArray } from '@/qComponents/helpers';
import type { QCheckboxGroupProvider } from '@/qComponents/QCheckboxGroup';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';

import type { Nullable, ClassValue } from '#/helpers';

import type {
  QCheckboxProps,
  QCheckboxInstance,
  QCheckboxPropLabelSize,
  QCheckboxPropModelValue,
  QCheckboxPropLabel,
  QCheckboxPropIndeterminate,
  QCheckboxPropDisabled,
  QCheckboxPropRootTag,
  QCheckboxPropValidateEvent
} from './types';

export default defineComponent({
  name: 'QCheckbox',
  componentName: 'QCheckbox',

  inheritAttrs: false,

  props: {
    /**
     * Array for group, Boolean for single
     */
    modelValue: {
      type: Boolean as PropType<QCheckboxPropModelValue>,
      default: null
    },
    /**
     * Checkbox label
     */
    label: {
      type: String as PropType<QCheckboxPropLabel>,
      default: null
    },
    /**
     * wheteher Checkbox is indeterminate
     */
    indeterminate: {
      type: Boolean as PropType<QCheckboxPropIndeterminate>,
      default: false
    },
    /**
     * wheteher Checkbox is disabled
     */
    disabled: {
      type: Boolean as PropType<QCheckboxPropDisabled>,
      default: false
    },
    rootTag: {
      type: String as PropType<QCheckboxPropRootTag>,
      default: 'label'
    },
    /**
     * wheteher is validate parent q-form if present
     */
    validateEvent: {
      type: Boolean as PropType<QCheckboxPropValidateEvent>,
      default: false
    },
    /**
     * label size
     */
    labelSize: {
      type: String as PropType<QCheckboxPropLabelSize>,
      default: 'regular',
      validator: validateArray<QCheckboxPropLabelSize>(['regular', 'small'])
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
    'change',
    /**
     * triggers when click
     */
    'click'
  ],

  setup(props: QCheckboxProps, ctx): QCheckboxInstance {
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);
    const qCheckboxGroup = inject<Nullable<QCheckboxGroupProvider>>(
      'qCheckboxGroup',
      null
    );
    const checkboxInput = ref<Nullable<HTMLInputElement>>(null);

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

    const isIndeterminate = computed<boolean>(
      () => !isChecked.value && Boolean(props.indeterminate)
    );

    const labelClass = computed<ClassValue>(
      () => `q-checkbox__label_size_${props.labelSize ?? 'regular'}`
    );

    const qCheckboxClasses = computed<ClassValue>(() => ({
      'q-checkbox_disabled': Boolean(isDisabled),
      'q-checkbox_checked': Boolean(isChecked),
      'q-checkbox_indeterminate': Boolean(isIndeterminate)
    }));

    const qCheckboxInputClasses = computed<ClassValue>(() => ({
      'q-checkbox__input_disabled': Boolean(isDisabled),
      'q-checkbox__input_checked': Boolean(isChecked),
      'q-checkbox__input_indeterminate': Boolean(isIndeterminate),
      'q-checkbox__input_focus': Boolean(focus)
    }));

    const qCheckboxInnerIconClasses = computed<ClassValue>(() => ({
      'q-icon-minus': Boolean(isIndeterminate),
      'q-icon-check': Boolean(isChecked)
    }));

    const handleCheckboxClick = (event: Event): void => {
      if (isDisabled.value) return;

      const value = !isChecked.value;

      if (!qCheckboxGroup) {
        ctx.emit('update:modelValue', value);
        ctx.emit('change', value);
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

      ctx.emit('click', event);
    };

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) qFormItem?.validateField('change');
      }
    );

    /**
     * @public
     */
    const nativeClick = (): void => {
      const checkboxEl: Nullable<HTMLInputElement> = checkboxInput.value;
      checkboxEl?.click();
    };

    return {
      focus,
      isChecked,
      isIndeterminate,
      isLimitDisabled,
      isDisabled,
      nativeClick,
      checkboxInput,
      handleCheckboxClick,
      labelClass,
      qCheckboxClasses,
      qCheckboxInputClasses,
      qCheckboxInnerIconClasses
    };
  }
});
</script>

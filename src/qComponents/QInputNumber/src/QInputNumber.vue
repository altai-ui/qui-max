<template>
  <div class="q-input-number">
    <input
      v-bind="$attrs"
      ref="inputRef"
      :disabled="isDisabled"
      type="text"
      inputMode="numeric"
      class="q-input-number__inner"
      @input="handleInputCommon"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, nextTick, ref, watch } from 'vue';
import { isNil } from 'lodash-es';

import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { QFormProvider } from '@/qComponents/QForm';
import type { Nullable } from '#/helpers';

import type { QInputNumberInstance, QInputNumberProps } from './types';

const MIN_INTEGER = Number(String(Number.MIN_SAFE_INTEGER).slice(0, -2));
const MAX_INTEGER = Number(String(Number.MAX_SAFE_INTEGER).slice(0, -2));

export default defineComponent({
  name: 'QInputNumber',
  componentName: 'QInputNumber',
  inheritAttrs: false,

  props: {
    /** Input value */
    modelValue: {
      type: Number,
      default: null
    },

    /** Number of digits after decimal separator */
    precision: {
      type: Number,
      default: null
    },

    /** Disabled status */
    disabled: {
      type: Boolean,
      default: false
    },

    /** Minimum allowed value. Must be less than maximum value */
    min: {
      type: Number,
      default: MIN_INTEGER,
      validator: (val: number) => val >= MIN_INTEGER
    },

    /** Maximum allowed value. Must be higher than minimum value */
    max: {
      type: Number,
      default: MAX_INTEGER,
      validator: (val: number) => val <= MAX_INTEGER
    },

    /** validate parent form if present */
    validateEvent: {
      type: Boolean,
      default: true
    }
  },

  emits: [
    /** triggers when model updates */
    'update:modelValue',

    /** triggers when model updates */
    'change',

    /** triggers when native input event fires */
    'input',

    /** triggers when input is focused */
    'focus',

    /** triggers when input lose focus */
    'blur'
  ],

  setup(props: QInputNumberProps, ctx): QInputNumberInstance {
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const inputRef = ref<Nullable<HTMLInputElement>>(null);

    const precision = computed<number>(() => Math.max(props.precision ?? 0, 0));

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    let internalValue: Nullable<string> = null;

    const changesEmitter = (type: 'input' | 'change', value: string): void => {
      const emittedValue =
        value && !Number.isNaN(Number(value)) ? Number(value) : null;

      if (props.modelValue === emittedValue) return;

      ctx.emit('update:modelValue', emittedValue);
      ctx.emit(type, emittedValue);
      if (props.validateEvent) qFormItem?.validateField(type);
    };

    const getValueMatchRegExp = ({
      matchEnd
    }: {
      matchEnd: boolean;
    }): RegExp => {
      const signPattern = (props.min ?? MIN_INTEGER) < 0 ? '-?' : '';
      const integerPattern = '[0-9]*';
      const fractionPattern =
        precision.value > 0 ? `[.,]?[0-9]{0,${precision.value}}` : '';
      const endPattern = matchEnd ? '$' : '';

      return new RegExp(
        `^${signPattern}${integerPattern}${fractionPattern}${endPattern}`
      );
    };

    const matchValue = (value: string): string => {
      const cleanValue = value
        .replace(/[^0-9,.-]/g, '')
        .replace(/-{2,}/g, '-')
        .replace(',', '.');
      const match = cleanValue.match(getValueMatchRegExp({ matchEnd: false }));

      return cleanValue && match ? String(Number(match[0])) : '';
    };

    const testValue = (value: string): boolean => {
      const hasIncorrectCombination = /^(--|(-?(0{2,}|0[1-9])))/.test(value);

      return (
        !hasIncorrectCombination &&
        getValueMatchRegExp({ matchEnd: true }).test(value)
      );
    };

    const getClampedValue = (value: string): string => {
      const min = props.min ?? MIN_INTEGER;
      const max = props.max ?? MAX_INTEGER;

      if (!value) return '';
      if (Number(value) < min) return String(min);
      if (Number(value) > max) return String(max);
      return value;
    };

    const handleInputCommon = (event: Event): void => {
      const target = event.target as HTMLInputElement;

      if (
        event instanceof InputEvent &&
        event.inputType === 'insertFromPaste'
      ) {
        internalValue = getClampedValue(matchValue(target.value));
        target.value = internalValue;
      } else {
        if (testValue(target.value)) {
          internalValue = getClampedValue(target.value);
        }
        target.value = internalValue ?? '';
      }

      if (Number.isNaN(Number(target.value))) return;

      changesEmitter('input', target.value);
    };

    const handleChange = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      target.value = matchValue(target.value);
      changesEmitter('change', target.value);
    };

    const handleFocus = (event: FocusEvent): void => {
      internalValue = (event.target as HTMLInputElement).value;
      ctx.emit('focus', event);
      if (props.validateEvent) qFormItem?.validateField('focus');
    };

    const handleBlur = (event: FocusEvent): void => {
      internalValue = null;
      ctx.emit('blur', event);
      if (props.validateEvent) qFormItem?.validateField('blur');
    };

    watch(
      () => props.modelValue,
      async value => {
        await nextTick();

        const input = inputRef.value;
        if (!input) return;

        if (isNil(value)) {
          internalValue = '';
          input.value = internalValue;
          return;
        }

        if (value !== Number(internalValue)) {
          internalValue = getClampedValue(matchValue(String(value)));
          input.value = internalValue;
        }
      },
      { immediate: true }
    );

    return {
      inputRef,
      isDisabled,
      handleInputCommon,
      handleChange,
      handleFocus,
      handleBlur
    };
  }
});
</script>

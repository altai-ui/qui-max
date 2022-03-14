<template>
  <div class="q-input-number-new">
    <input
      v-bind="$attrs"
      ref="inputRef"
      :disabled="isDisabled"
      type="text"
      inputMode="numeric"
      class="q-input-number-new__inner"
      @input="handleInput"
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

import type { QInputNumberNewInstance, QInputNumberNewProps } from './types';

const MIN_INTEGER = Number(String(Number.MIN_SAFE_INTEGER).slice(0, -2));
const MAX_INTEGER = Number(String(Number.MAX_SAFE_INTEGER).slice(0, -2));

export default defineComponent({
  name: 'QInputNumberNew',
  componentName: 'QInputNumberNew',
  inheritAttrs: false,

  props: {
    /** Input value */
    modelValue: {
      type: Number,
      default: null
    },

    /** validate parent form if present */
    validateEvent: {
      type: Boolean,
      default: true
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

  setup(props: QInputNumberNewProps, ctx): QInputNumberNewInstance {
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const inputRef = ref<Nullable<HTMLInputElement>>(null);

    const precision = computed<number>(() => Math.max(props.precision ?? 0, 0));

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    let internalValue: Nullable<string> = null;

    const changesEmitter = (type: string, value: string): void => {
      const emitValue =
        value && !Number.isNaN(Number(value)) ? Number(value) : null;

      ctx.emit('update:modelValue', emitValue);
      if (type === 'input' || type === 'change') ctx.emit(type, emitValue);
      if (props.validateEvent) qFormItem?.validateField(type);
    };

    const getValueMatchRegExp = (matchEnd: boolean): RegExp => {
      const signPattern = props.min ?? MIN_INTEGER < 0 ? '-?' : '';
      const integerPattern = '[0-9]*';
      const fractionPattern =
        precision.value > 0 ? `[.,]?[0-9]{0,${precision.value}}` : '';

      return new RegExp(
        `^${signPattern}${integerPattern}${fractionPattern}${
          matchEnd ? '$' : ''
        }`
      );
    };

    const matchNumber = (value: string): Nullable<string> => {
      const match = value.match(getValueMatchRegExp(false));

      return match ? match[0] : null;
    };

    const testNumber = (value: string): boolean => {
      const hasIncorrectCombination = /^(--|(-?(0{2,}|0[1-9])))/.test(value);

      return !hasIncorrectCombination && getValueMatchRegExp(true).test(value);
    };

    const getClampedNumber = (value: number): number => {
      const min = props.min ?? MIN_INTEGER;
      const max = props.max ?? MAX_INTEGER;
      return Math.min(Math.max(value, min), max);
    };

    const handleInput = (event: InputEvent): void => {
      const target = event.target as HTMLInputElement;
      const value = target.value;

      let valueMatch: Nullable<string> = null;

      if (event.inputType === 'insertFromPaste') {
        valueMatch = matchNumber(value);
      } else {
        // put back previous valid value if current input is invalid
        valueMatch = testNumber(value) ? value : internalValue;
      }

      if (valueMatch) {
        if (props.min && Number(valueMatch) < props.min) {
          valueMatch = String(props.min);
        }
        if (props.max && Number(valueMatch) > props.max) {
          valueMatch = String(props.max);
        }
        target.value = valueMatch;
      } else {
        target.value = value ? internalValue ?? '' : '';
      }

      internalValue = target.value;

      if (Number.isNaN(Number(target.value))) return;

      changesEmitter('input', target.value);
    };

    const handleChange = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      target.value = matchNumber(target.value) ?? '';
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
          input.value = '';
          return;
        }

        input.value = matchNumber(String(getClampedNumber(value))) ?? '';
        internalValue = input.value;
      },
      { immediate: true }
    );

    return {
      inputRef,
      isDisabled,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur
    };
  }
});
</script>

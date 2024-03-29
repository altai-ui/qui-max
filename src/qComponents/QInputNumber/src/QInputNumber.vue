<template>
  <div class="q-input-number">
    <input
      v-bind="$attrs"
      ref="inputRef"
      :disabled="isDisabled"
      type="text"
      inputMode="numeric"
      class="q-input-number__inner"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <div
      v-if="isPostfixVisible"
      class="q-input-number__postfix"
    >
      <span
        v-if="isDisabled"
        class="q-input-number__icon q-icon-lock"
      />
      <slot
        v-else
        name="postfix"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { isNil } from 'lodash-es';
import { computed, defineComponent, inject, nextTick, ref, watch } from 'vue';

import { getConfig } from '@/qComponents/config';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';

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
      default: null,
      validator: (val: number) => val >= 0 && val <= 20
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

    /** Text before main value in blurred state of the input */
    prefix: {
      type: String,
      default: null
    },

    /** Text after main value in blurred state of the input */
    suffix: {
      type: String,
      default: null
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

    const isPostfixVisible = computed<boolean>(() =>
      Boolean(isDisabled.value || ctx.slots.postfix)
    );

    let internalValue: Nullable<string> = null;

    const formatNumber = (value: Nullable<string>): string => {
      if (!value) return '';

      const locale = getConfig('locale');

      const localizedNumber = Number(value).toLocaleString(locale, {
        maximumFractionDigits: precision.value
      });

      const prefix = props.prefix ?? '';
      const suffix = props.suffix ?? '';

      return `${prefix} ${localizedNumber} ${suffix}`.trim();
    };

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

    const handleInput = (event: Event): void => {
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
      const target = event.target as HTMLInputElement;
      internalValue = isNil(props.modelValue)
        ? target.value
        : getClampedValue(matchValue(String(props.modelValue)));
      target.value = internalValue;
      ctx.emit('focus', event);
      if (props.validateEvent) qFormItem?.validateField('focus');
    };

    const handleBlur = (event: FocusEvent): void => {
      const target = event.target as HTMLInputElement;
      target.value = formatNumber(target.value);
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

        if (!internalValue || value !== Number(internalValue)) {
          internalValue = getClampedValue(matchValue(String(value)));
          input.value = formatNumber(internalValue);
        }
      },
      { immediate: true }
    );

    return {
      inputRef,
      isDisabled,
      isPostfixVisible,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur
    };
  }
});
</script>

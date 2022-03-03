<template>
  <div class="q-input-number">
    <div class="q-input">
      <input
        v-bind="$attrs"
        ref="inputRef"
        :disabled="isDisabled"
        type="text"
        inputmode="numeric"
        class="q-input__inner"
        @input="handleInput"
        @paste="handleInput"
        @change="handleChange"
        @focus="handleEvent"
        @blur="handleEvent"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, nextTick, ref, watch } from 'vue';
import { isNil } from 'lodash-es';

import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { QFormProvider } from '@/qComponents/QForm';
import type { Nillable, Nullable } from '#/helpers';

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

    const getFormattedValue = (value: Nillable<string | number>): string => {
      const val = Number(value);
      if (isNil(value) || Number.isNaN(val)) return '';
      return val.toFixed(precision.value);
    };

    const matchNumber = (value: string): Nullable<string> => {
      const valueRegExp = new RegExp(
        `^-?(?=0?[.,]|[1-9])(0(?=[.,])|[1-9]\\d*)?([.,](?=\\d)\\d{0,${precision.value})?`
      );
      const match = value.match(valueRegExp);
      return match ? match[0] : null;
    };

    const changesEmitter = (
      type: 'input' | 'change' | 'focus' | 'blur',
      value: string
    ): void => {
      ctx.emit('update:modelValue', Number(value));
      ctx.emit(type, Number(value));
      if (props.validateEvent) qFormItem?.validateField(type);
    };

    const handleInput = (event: KeyboardEvent | ClipboardEvent): void => {
      const target = event.target as HTMLInputElement;

      const clipboardData = (event as ClipboardEvent).clipboardData;
      const clipboardValue = clipboardData?.getData('text/plain');
      let valueMatch = matchNumber(clipboardValue ?? target.value);
      if (valueMatch) {
        if (props.min && Number(valueMatch) < MIN_INTEGER) {
          valueMatch = MIN_INTEGER.toFixed(precision.value);
        }
        if (props.max && Number(valueMatch) > MAX_INTEGER) {
          valueMatch = MAX_INTEGER.toFixed(precision.value);
        }

        target.value = valueMatch;

        return;
      }

      target.value = String(props.modelValue);
      changesEmitter('input', target.value);
    };

    const handleChange = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      target.value = getFormattedValue(target.value);
      changesEmitter('change', target.value);
    };

    const handleEvent = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      changesEmitter(event.type as 'focus' | 'blur', target.value);
    };

    watch(
      () => props.modelValue,
      value => {
        nextTick(() => {
          const input = inputRef.value;
          if (input && !isNil(value)) {
            input.value = getFormattedValue(value);
          }
        });
      },
      {
        immediate: true
      }
    );

    return {
      inputRef,
      isDisabled,
      handleInput,
      handleChange,
      handleEvent
    };
  }
});
</script>

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
        @blur="handleBlur"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { Nullable } from '#/helpers';
import { QFormItemProvider } from '@/qComponents/QFormItem';
import { QFormProvider } from '@/qComponents/QForm';
import { QInputNumberNewInstance, QInputNumberNewProps } from '@/qComponents';

const MIN_INTEGER = Number(String(Number.MIN_SAFE_INTEGER).slice(0, -2));
const MAX_INTEGER = Number(String(Number.MAX_SAFE_INTEGER).slice(0, -2));

export default defineComponent({
  name: 'QInputNumberNew',
  componentName: 'QInputNumberNew',
  inheritAttrs: false,

  props: {
    /** Input value */
    modelValue: {
      type: [String, Number],
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
    'change',

    /** triggers when native input event fires */
    'input',

    /** triggers when model updates */
    'update:modelValue'
  ],

  setup(props: QInputNumberNewProps, ctx): QInputNumberNewInstance {
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);
    const inputRef = ref<Nullable<HTMLInputElement>>(null);
    let internalValue = '';

    const precision = computed<number>(() => Math.max(props.precision ?? 0, 0));

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const getFormattedValue = (value: string | number): string => {
      return Number(value).toFixed(precision.value);
    };

    const matchNumber = (value: string): Nullable<string[]> => {
      // FIXME: double minus at the beginning of string
      const valueRegExp = new RegExp(`^-?\\d*[.,]?\\d{0,${precision.value}}`);
      return value.match(valueRegExp);
    };

    onMounted(() => {
      const input = inputRef.value;
      const initialValue = props.modelValue;
      if (input && initialValue) {
        input.value = getFormattedValue(initialValue);
        internalValue = input.value;
      }
    });

    const handleInput = (event: KeyboardEvent | ClipboardEvent): void => {
      const target = event.target as HTMLInputElement;

      const clipboardData = (event as ClipboardEvent).clipboardData;
      const clipboardValue = clipboardData?.getData('text/plain');
      const valueMatches = matchNumber(clipboardValue ?? target.value);
      if (valueMatches) {
        // TODO: validate against min and max values

        target.value = valueMatches[0];
        internalValue = target.value;
      }

      target.value = internalValue;

      ctx.emit('input', target.value);
      ctx.emit('update:modelValue', target.value);

      if (props.validateEvent) qFormItem?.validateField('input');
    };

    const handleBlur = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      target.value = getFormattedValue(value);

      if (props.validateEvent) qFormItem?.validateField('blur');
    };

    // TODO: add handlers for other events

    return {
      inputRef,
      isDisabled,
      handleInput,
      handleBlur
    };
  }
});
</script>

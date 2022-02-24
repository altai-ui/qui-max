<template>
  <div class="q-input-number">
    <div class="q-input">
      <input
        v-bind="$attrs"
        ref="inputRef"
        :value="modelValue"
        :disabled="isDisabled"
        type="text"
        inputmode="numeric"
        class="q-input__inner"
        @input="handleInput"
        @keydown="handleKeyDown"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue';
import { Nullable, UnwrappedInstance } from '#/helpers';
import { QFormItemProvider } from '@/qComponents/QFormItem';
import { QFormProvider } from '@/qComponents/QForm';
import { getConfig } from '@/qComponents/config';
import { getLocaleSeparator } from '@/qComponents/QInputNumber/src/helpers';

const MIN_INTEGER = parseInt((Number.MIN_SAFE_INTEGER / 100).toString(), 10);
const MAX_INTEGER = parseInt((Number.MAX_SAFE_INTEGER / 100).toString(), 10);

export default defineComponent({
  name: 'QInputNumberNew',
  componentName: 'QInputNumberNew',
  inheritAttrs: false,

  props: {
    /** Input value */
    modelValue: {
      type: String,
      default: null
    },

    /** BCP47 language identifier */
    localization: {
      type: String,
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

  setup(props, ctx) {
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);

    const inputRef = ref<UnwrappedInstance<HTMLInputElement>>(null);

    const localizationTag = computed<string>(
      () => props.localization ?? getConfig('locale') ?? 'en'
    );

    const decimalSeparator = computed<string>(() =>
      getLocaleSeparator('decimal', localizationTag.value)
    );

    const precision = computed<number>(() => Math.max(props.precision ?? 0, 0));

    if (props.modelValue) {
      ctx.emit(
        'update:modelValue',
        parseFloat(props.modelValue).toFixed(precision.value)
      );
    }

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const updateModel = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      ctx.emit('update:modelValue', target.value ?? '');
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      const curPos = target.selectionStart;
      const separator = decimalSeparator.value;

      const isAllowedKey = [
        'Backspace',
        'Delete',
        'Home',
        'End',
        'ArrowLeft',
        'ArrowRight'
      ].includes(event.code);

      const isAllowedCombination =
        (event.metaKey || event.ctrlKey) &&
        ['KeyA', 'KeyX', 'KeyC', 'KeyV'].includes(event.code);

      const isAllowedSymbol = event.key.match(
        new RegExp(`[-0-9${decimalSeparator.value}]`)
      );

      if (!isAllowedKey && !isAllowedSymbol && !isAllowedCombination) {
        event.preventDefault();
      }

      // prevent entering 'minus' if it already exists or cursor is not at the start of the string
      if (event.key === '-' && (curPos !== 0 || value.includes('-'))) {
        event.preventDefault();
      }

      // prevent entering decimal separator if it already exists or disabled
      if (
        event.key === separator &&
        (!precision.value || value.includes(separator))
      ) {
        event.preventDefault();
      }

      // TODO handle numbers with delimiter (change, delete)
    };

    const handleInput = (event: InputEvent): void => {
      ctx.emit('input', event);
      updateModel(event);
    };

    return {
      isDisabled,
      handleInput,
      handleKeyDown
    };
  }
});
</script>

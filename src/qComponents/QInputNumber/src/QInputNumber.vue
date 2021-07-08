<template>
  <div
    class="q-input-number"
    :class="inputNumberClass"
  >
    <button
      v-if="areControlsEnabled"
      class="
        q-input-number__button q-input-number__button_decrease
        q-icon-minus
      "
      type="button"
      :disabled="isDisabled || isDecreaseDisabled"
      :class="isDecreaseDisabled && 'q-input-number__button_is-disabled'"
      @click="handleChangeNumberButtonClick(false)"
    />

    <q-input
      ref="inputRef"
      v-bind="$attrs"
      :model-value="formattedValue"
      class="q-input-number__input"
      :disabled="isDisabled"
      :validate-event="false"
      @blur="handleBlur"
      @focus="handleFocus"
      @keypress.prevent="handleKeyPress"
      @keydown="handleKeyDown"
      @paste.prevent="handlePaste"
      @click="handleClick"
    />

    <button
      v-if="areControlsEnabled"
      class="q-input-number__button q-input-number__button_increase q-icon-plus"
      type="button"
      :disabled="isDisabled || isIncreaseDisabled"
      :class="isIncreaseDisabled && 'q-input-number__button_is-disabled'"
      @click="handleChangeNumberButtonClick(true)"
    />
  </div>
</template>

<script lang="ts">
import { inject, computed, reactive, ref, defineComponent } from 'vue';

import { getConfig } from '@/qComponents/config';

import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';

import type { QInputInstance } from '@/qComponents/QInput';
import type { Nullable, UnwrappedInstance } from '#/helpers';

import type {
  QInputNumberProps,
  QInputNumberState,
  QInputNumberInstance,
  AddittionsMatch,
  InsertedTextParts
} from './types';

import {
  parseLocaleNumber,
  getValueWithoutAdditions,
  getIncreasedValue,
  getDecreasedValue,
  getCleanSelections,
  getLocaleSeparator,
  insertText,
  insertPasteText,
  setCursorPosition
} from './helpers';

export default defineComponent({
  name: 'QInputNumber',
  componentName: 'QInputNumber',

  inheritAttrs: false,

  props: {
    /**
     * precision of input value
     */
    precision: {
      type: Number,
      default: 0
    },
    /**
     * whether the component is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether to enable the control buttons
     */
    noControls: {
      type: Boolean,
      default: false
    },
    /**
     * default to v-model
     */
    modelValue: {
      type: [String, Number],
      default: null,
      validator: (value: string | number): boolean =>
        !Number.isNaN(Number(value)) || value === null
    },
    /** validate parent form if present */
    validateEvent: {
      type: Boolean,
      default: true
    },
    /**
     * `String` before number
     */
    prefix: {
      type: String,
      default: null
    },
    /**
     * `String` after number
     */
    suffix: {
      type: String,
      default: null
    },
    /**
     * BCP47 language identifier
     */
    localization: {
      type: String,
      default: null
    },
    /**
     * Whether to use thousand separators
     */
    useGrouping: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    /**
     * triggers when model updates
     */
    'change',
    /**
     * triggers when input gets focus
     */
    'focus',
    /**
     * triggers when input gets blur
     */
    'blur',
    /**
     * triggers when native input event fires
     */
    'input',
    /**
     * triggers when model updates
     */
    'update:modelValue'
  ],

  setup(props: QInputNumberProps, ctx): QInputNumberInstance {
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);

    const inputRef = ref<UnwrappedInstance<QInputInstance>>(null);

    const state = reactive<QInputNumberState>({
      minValue: ctx.attrs.min ? Number(ctx.attrs.min) : Number.MIN_SAFE_INTEGER,
      maxValue: ctx.attrs.max ? Number(ctx.attrs.max) : Number.MAX_SAFE_INTEGER,
      step: ctx.attrs.step ? Number(ctx.attrs.step) : 1,
      prevValue: null
    });

    const localizationTag = computed<string>(
      () => props.localization ?? getConfig('locale') ?? 'en'
    );

    const additions = computed<AddittionsMatch>(() => ({
      prefix: props.prefix,
      suffix: props.suffix
    }));

    const formattedValue = computed<string>(() => {
      const prefix = props.prefix ?? '';
      const suffix = props.suffix ?? '';

      const value = Intl.NumberFormat(localizationTag.value, {
        useGrouping: props.useGrouping ?? undefined,
        minimumFractionDigits: props.precision ?? undefined,
        maximumFractionDigits: props.precision ?? undefined
      }).format(Number(props.modelValue));

      return props.modelValue !== null ? `${prefix}${value}${suffix}` : '';
    });

    const parsedValue = computed<string>(() =>
      getValueWithoutAdditions(formattedValue.value, additions.value)
    );

    const parsedNumber = computed<number>(() => {
      const numberWithoutSeparators = parseLocaleNumber(
        parsedValue.value,
        localizationTag.value
      );

      return formattedValue.value ? numberWithoutSeparators : 0;
    });

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const areControlsEnabled = computed<boolean>(
      () => !props.noControls && !isDisabled.value
    );

    const inputNumberClass = computed<Record<string, boolean>>(() => ({
      'q-input-number': true,
      'q-input-number_with-controls': !props.noControls
    }));

    const isIncreaseDisabled = computed<boolean>(() => {
      const number = parsedNumber.value ?? 0;

      return (
        number >= state.maxValue ||
        getIncreasedValue(number, state.step) > state.maxValue
      );
    });

    const isDecreaseDisabled = computed<boolean>(() => {
      const number = parsedNumber.value ?? 0;

      return (
        number <= state.minValue ||
        getDecreasedValue(number, state.step) < state.minValue
      );
    });

    const prefixLength = computed<number>(() => props.prefix?.length ?? 0);

    const suffixLength = computed<number>(() => props.suffix?.length ?? 0);

    const insertTextFn = (
      target: HTMLInputElement,
      key: string
    ): InsertedTextParts =>
      insertText(
        target,
        key,
        localizationTag.value,
        {
          min: state.minValue,
          max: state.maxValue
        },
        props.precision ?? 0
      );

    const changesEmmiter = (value: Nullable<number>, type: string): void => {
      ctx.emit('update:modelValue', value);

      if (type === 'change') {
        ctx.emit('change', value);
        if (props.validateEvent) qFormItem?.validateField('change');
        return;
      }

      ctx.emit('input', value);
      ctx.emit('change', value);
      if (props.validateEvent) qFormItem?.validateField('input');
    };

    const handleChangeNumberButtonClick = (isIncrease: boolean): void => {
      const step = isIncrease ? state.step : -state.step;

      const updatedNumber = getIncreasedValue(parsedNumber.value, step);

      if (
        (isIncrease && updatedNumber > state.maxValue) ||
        updatedNumber < state.minValue
      )
        return;

      changesEmmiter(updatedNumber, 'change');
    };

    const setCaret = (
      target: HTMLInputElement,
      newValue: Nullable<string>,
      prevPart: string,
      lastPart: string,
      key: string,
      selectionStart: number,
      selectionEnd: number
    ): void => {
      if (prevPart === '-') {
        setCursorPosition(target, prefixLength.value + key.length + 1);
        return;
      }

      if (!prevPart && !lastPart) {
        setCursorPosition(target, prefixLength.value + key.length);
        return;
      }

      let selectionMove = prevPart.includes(
        getLocaleSeparator('decimal', localizationTag.value)
      )
        ? 1
        : 0;

      let newCaretPos =
        (newValue?.length || 0) - lastPart.length + selectionMove;
      const difference =
        (newValue?.length || 0) - lastPart.length || prefixLength.value;

      if (key === 'Backspace') {
        selectionMove = prevPart.includes(
          getLocaleSeparator('decimal', localizationTag.value)
        )
          ? (selectionEnd - selectionStart || 1) * -1
          : 0;
        newCaretPos = (difference <= 0 ? 0 : difference) + selectionMove;
      }

      if (key === 'Delete') {
        selectionMove = prevPart.includes(
          getLocaleSeparator('decimal', localizationTag.value)
        )
          ? -1
          : 0;
        newCaretPos = difference + selectionMove;
      }

      setCursorPosition(target, newCaretPos);
    };

    const updateInput = ({
      target,
      numberValue,
      prevPart,
      lastPart,
      key
    }: InsertedTextParts): void => {
      const { selectionStart, selectionEnd } = target;

      if (numberValue === null) {
        const correction = key === 'Backspace' ? -1 : 1;
        setCursorPosition(target, (selectionStart || 0) + correction);
        return;
      }

      if (
        (numberValue.toString().includes('.') ||
          numberValue.toString().includes('-.') ||
          !numberValue) &&
        !Number(numberValue) &&
        inputRef?.value?.input
      ) {
        inputRef.value.input.value = '';
        changesEmmiter(null, 'input');
        setCursorPosition(target, props.prefix?.length || 0);
        return;
      }

      const numberValueAsNumber = Number(numberValue);

      const newForamttedValue = Intl.NumberFormat(localizationTag.value, {
        useGrouping: props.useGrouping ?? undefined,
        minimumFractionDigits: props.precision ?? undefined,
        maximumFractionDigits: props.precision ?? undefined
      }).format(numberValueAsNumber);

      const newValue = `${props.prefix || ''}${newForamttedValue}${
        props.suffix || ''
      }`;

      if (
        numberValueAsNumber >= state.maxValue ||
        numberValueAsNumber <= state.minValue
      ) {
        changesEmmiter(numberValueAsNumber, 'input');
        setCursorPosition(target, newValue.length);
        return;
      }

      if (inputRef?.value?.input) inputRef.value.input.value = newValue;

      changesEmmiter(numberValueAsNumber, 'input');

      setCaret(
        target,
        newValue,
        prevPart,
        lastPart,
        key,
        selectionStart ?? 0,
        selectionEnd ?? 0
      );
    };

    const handleBlur = (event: FocusEvent): void => {
      if (state.prevValue === inputRef?.value?.input?.value) return;

      ctx.emit('blur', event);

      const target = event.target as HTMLInputElement;

      const emittedValue =
        !target.value || target.value === '-'
          ? null
          : parseLocaleNumber(
              getValueWithoutAdditions(target.value, additions.value),
              localizationTag.value
            );

      changesEmmiter(emittedValue, 'change');

      if (props.validateEvent) qFormItem?.validateField('blur');
    };
    const handleFocus = (event: FocusEvent): void => {
      state.prevValue = inputRef?.value?.input?.value ?? null;
      ctx.emit('focus', event);
    };

    const handleKeyPress = (event: KeyboardEvent): void => {
      if (Number.isNaN(Number(event.key)) && event.key !== '-') return;

      const target = event.target as HTMLInputElement;
      const { value, selectionNewStart, selectionNewEnd } = getCleanSelections(
        target,
        additions.value
      );

      if (event.key === '-') {
        if (
          !formattedValue.value ||
          selectionNewEnd - selectionNewStart === value.length
        ) {
          if (inputRef?.value?.input) inputRef.value.input.value = '-';
        } else if (selectionNewStart === 0 && !value.includes('-')) {
          updateInput(insertTextFn(target, event.key));
        }

        return;
      }

      if (value.length && selectionNewStart > value.length) {
        return;
      }

      updateInput(insertTextFn(target, event.key));
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      const target = event.target as HTMLInputElement;

      const { value, selectionStart, selectionEnd } = target;
      const {
        value: cleanValue,
        selectionNewStart,
        selectionNewEnd
      } = getCleanSelections(target, additions.value);

      switch (event.key) {
        case 'Backspace':
        case 'Delete':
          event.preventDefault();

          if (
            ((event.key === 'Backspace' && selectionNewStart === 0) ||
              (event.key === 'Delete' &&
                selectionNewEnd === cleanValue.length)) &&
            selectionStart === selectionEnd
          ) {
            return;
          }

          if (
            selectionNewEnd - selectionNewStart === cleanValue.length ||
            cleanValue === '-'
          ) {
            if (inputRef?.value?.input) inputRef.value.input.value = '';
            changesEmmiter(null, 'input');
          } else {
            updateInput(insertTextFn(target, event.key));
          }

          break;
        case 'ArrowLeft':
          if (
            (selectionStart ?? 0) <= prefixLength.value &&
            selectionStart !== selectionEnd
          ) {
            setCursorPosition(target, prefixLength.value);
          }

          if (props.prefix && (selectionStart ?? 0) <= prefixLength.value)
            event.preventDefault();

          break;
        case 'ArrowRight':
          if (
            selectionNewEnd >= cleanValue.length &&
            selectionStart !== selectionEnd
          ) {
            setCursorPosition(target, value.length - suffixLength.value);
          }

          if (selectionNewEnd >= cleanValue.length) event.preventDefault();

          break;
        case 'ArrowUp':
          event.preventDefault();
          setCursorPosition(target, prefixLength.value);
          break;
        case 'ArrowDown':
          event.preventDefault();
          setCursorPosition(target, value.length - suffixLength.value);
          break;
        default:
          break;
      }
    };

    const handlePaste = (event: ClipboardEvent): void => {
      const target = event.target as HTMLInputElement;
      const text = event?.clipboardData?.getData('Text') ?? '';

      if (Number.isNaN(Number(text))) return;

      updateInput(
        insertPasteText(
          target,
          text,
          localizationTag.value,
          {
            min: state.minValue,
            max: state.maxValue
          },
          props.precision ?? 0
        )
      );
    };

    const handleClick = (event: MouseEvent): void => {
      const target = event.target as HTMLInputElement;
      const { value, selectionStart, selectionEnd } = target;

      if (selectionStart !== selectionEnd) {
        event.preventDefault();
        return;
      }

      if ((selectionStart ?? 0) < prefixLength.value + 1) {
        setCursorPosition(target, prefixLength.value);
      } else if (
        (selectionStart ?? 0) >
        value.length - suffixLength.value - 1
      ) {
        setCursorPosition(target, value.length - suffixLength.value);
      }
    };

    return {
      state,
      isDisabled,
      inputNumberClass,
      areControlsEnabled,
      isIncreaseDisabled,
      isDecreaseDisabled,
      handleBlur,
      handleFocus,
      inputRef,
      handleKeyDown,
      handleKeyPress,
      formattedValue,
      handleChangeNumberButtonClick,
      handlePaste,
      handleClick
    };
  }
});
</script>

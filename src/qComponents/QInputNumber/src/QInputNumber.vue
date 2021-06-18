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
      @click.prevent="handleChangeNumberButtonClick(false)"
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
      @click.prevent="handleChangeNumberButtonClick(true)"
    />
  </div>
</template>

<script lang="ts">
import { inject, computed, reactive, ref, defineComponent } from 'vue';

import { getConfig } from '@/qComponents/config';

import {
  CHANGE_EVENT,
  FOCUS_EVENT,
  BLUR_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_VALUE_EVENT
} from '@/qComponents/constants/events';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';

import type { QInputInstance } from '@/qComponents/QInput/src/types';

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
  insertText,
  insertPasteText
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
    CHANGE_EVENT,
    FOCUS_EVENT,
    BLUR_EVENT,
    INPUT_EVENT,
    UPDATE_MODEL_VALUE_EVENT
  ],

  setup(props: QInputNumberProps, ctx): QInputNumberInstance {
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const qForm = inject<QFormProvider | null>('qForm', null);

    const inputRef = ref<QInputInstance | null>(null);

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
        minimumFractionDigits: props.precision ?? undefined
      }).format(Number(props.modelValue));

      return props.modelValue !== null ? `${prefix}${value}${suffix}` : '';
    });

    const parsedValue = computed<string>(() => {
      return getValueWithoutAdditions(formattedValue.value, additions.value);
    });

    const parsedNumber = computed<number>(() => {
      return formattedValue.value
        ? parseLocaleNumber(parsedValue.value, localizationTag.value)
        : 0;
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
        formattedValue.value,
        additions.value,
        inputRef,
        localizationTag.value,
        {
          min: state.minValue,
          max: state.maxValue
        }
      );

    const changesEmmiter = (value: number | null, type: string): void => {
      ctx.emit(UPDATE_MODEL_VALUE_EVENT, value);

      if (type === CHANGE_EVENT) {
        ctx.emit(CHANGE_EVENT, value);
        if (props.validateEvent) qFormItem?.validateField(CHANGE_EVENT);
        return;
      }

      ctx.emit(INPUT_EVENT, value);
      ctx.emit(CHANGE_EVENT, value);
      if (props.validateEvent) qFormItem?.validateField(INPUT_EVENT);
    };

    const handleChangeNumberButtonClick = (isIncrease: boolean): void => {
      const step = isIncrease ? state.step : -state.step;

      const updatedNumber = getIncreasedValue(parsedNumber.value, step);

      if (
        (isIncrease && updatedNumber > state.maxValue) ||
        updatedNumber < state.minValue
      )
        return;

      changesEmmiter(updatedNumber, CHANGE_EVENT);
    };

    const setCursorPosition = (
      target: HTMLInputElement,
      position: number
    ): void => {
      target.setSelectionRange(position, position);
    };

    const updateInput = ({
      target,
      newValue,
      selectionEnd,
      hasMinusChar
    }: InsertedTextParts): void => {
      if (!target) return;
      if (newValue === null) {
        changesEmmiter(null, INPUT_EVENT);
        return;
      }

      const fixedNewValue = newValue.toFixed(props.precision ?? 0);

      const minusZero = Number(fixedNewValue) === 0 && hasMinusChar;

      const prefix = props.prefix ?? '';
      const suffix = props.suffix ?? '';
      const value = Intl.NumberFormat(localizationTag.value, {
        useGrouping: props.useGrouping ?? undefined,
        minimumFractionDigits: props.precision ?? undefined
      }).format(Number(minusZero ? -0 : fixedNewValue));

      const newFormattedValue = `${prefix}${value}${suffix}`;

      const newLength = newFormattedValue.length;
      const newCaretPosition =
        target.value.length > 1
          ? selectionEnd + (newLength - target.value.length || 1)
          : target.value.length + prefixLength.value + 1;

      if (inputRef?.value?.input)
        inputRef.value.input.value = newFormattedValue;

      changesEmmiter(Number(minusZero ? -0 : fixedNewValue), INPUT_EVENT);

      let movedCaret = newCaretPosition;

      if (newCaretPosition < 0) {
        movedCaret = selectionEnd;
      } else if (newCaretPosition < prefixLength.value) {
        movedCaret = prefixLength.value;
      } else if (
        newCaretPosition >
        newFormattedValue.length - prefixLength.value
      ) {
        movedCaret = newFormattedValue.length - prefixLength.value;
      }

      setCursorPosition(target, movedCaret);
    };

    const handleBlur = (event: FocusEvent): void => {
      if (state.prevValue === inputRef?.value?.input?.value) return;

      ctx.emit(BLUR_EVENT, event);

      const target = event.target as HTMLInputElement;

      const emittedValue =
        !target.value || target.value === '-'
          ? null
          : parseLocaleNumber(
              getValueWithoutAdditions(target.value, additions.value),
              localizationTag.value
            );

      changesEmmiter(emittedValue, 'change');

      if (props.validateEvent) qFormItem?.validateField(BLUR_EVENT);
    };
    const handleFocus = (event: FocusEvent): void => {
      state.prevValue = inputRef?.value?.input?.value ?? null;
      ctx.emit(FOCUS_EVENT, event);
    };

    const handleKeyPress = (event: KeyboardEvent): void => {
      const target = event.target as HTMLInputElement;

      if (
        Number.isNaN(Number(event.key)) &&
        event.key !== '-' &&
        event.key !== '.' &&
        event.key !== ','
      )
        return;

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
        } else if (selectionNewStart === 1) {
          updateInput(insertTextFn(target, event.key));
        }

        return;
      }

      updateInput(insertTextFn(target, event.key));
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      const target = event.target as HTMLInputElement;

      const { value, selectionStart, selectionEnd } = target;

      switch (event.key) {
        case 'Backspace':
        case 'Delete':
          event.preventDefault();
          updateInput(insertTextFn(target, event.key));
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          if (
            (event.key === 'ArrowLeft' &&
              (selectionStart ?? 0) < prefixLength.value + 1) ||
            (event.key === 'ArrowRight' &&
              (selectionEnd ?? 0) > value.length - suffixLength.value - 1)
          ) {
            event.preventDefault();
          }
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

      updateInput(
        insertPasteText(target, text, formattedValue.value, additions.value)
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

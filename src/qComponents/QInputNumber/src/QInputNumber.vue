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
      @keypress.prevent="onInputKeyPress"
      @keydown="handleKeydown"
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

import {
  CHANGE_EVENT,
  FOCUS_EVENT,
  BLUR_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_VALUE_EVENT
} from '@/qComponents/constants/events';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';

import type {
  QInputNumberProps,
  QInputNumberState,
  QInputNumberInstance
} from './types';
import type { Selections } from './Common';

import helpers from './helpers';

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

    const {
      localizationTag,
      parseLocaleNumber,
      getLocaleSeparator,
      getValueWithoutAdditions,
      isCharReadonly,
      getIncreasedValue,
      getDecreasedValue
    } = helpers(props);

    const inputRef = ref(null);

    const state = reactive<QInputNumberState>({
      minValue: ctx.attrs.min ? Number(ctx.attrs.min) : Number.MIN_SAFE_INTEGER,
      maxValue: ctx.attrs.max ? Number(ctx.attrs.max) : Number.MAX_SAFE_INTEGER,
      step: ctx.attrs.step ? Number(ctx.attrs.step) : 1
    });

    const formattedValue = computed<string>(() => {
      const prefix = props.prefix ?? '';
      const suffix = props.suffix ?? '';

      const value = Intl.NumberFormat(localizationTag, {
        useGrouping: props.useGrouping ?? undefined,
        minimumFractionDigits: props.precision ?? undefined
      }).format(Number(props.modelValue));

      return props.modelValue !== null ? `${prefix}${value}${suffix}` : '';
    });

    const parsedNumber = computed<number>(() => {
      return formattedValue.value
        ? parseLocaleNumber(getValueWithoutAdditions(formattedValue.value))
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

    const prefixLength = computed<number>(() => {
      return props.prefix?.length ?? 0;
    });

    const suffixLength = computed<number>(() => {
      return props.suffix?.length ?? 0;
    });

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
      let updatedNumber = parsedNumber.value;
      const step = isIncrease ? state.step : -state.step;

      updatedNumber = Math.round((updatedNumber + step) * 100) / 100;

      if (
        (isIncrease && updatedNumber > state.maxValue) ||
        updatedNumber < state.minValue
      )
        return;

      changesEmmiter(updatedNumber, CHANGE_EVENT);
    };

    const setCursorPosition = (
      target: HTMLTextAreaElement,
      position: number
    ): void => {
      target.setSelectionRange(position, position);
    };

    const getCleanSelections = ({
      value,
      selectionStart,
      selectionEnd
    }: {
      value: string;
      selectionStart: number;
      selectionEnd: number;
    }): Selections => {
      const selectionNewStart =
        selectionStart <= prefixLength.value
          ? prefixLength.value
          : selectionStart;

      const selectionNewEnd =
        selectionEnd >= value.length - suffixLength.value
          ? value.length - suffixLength.value
          : selectionEnd;

      return {
        selectionNewStart,
        selectionNewEnd,
        value: getValueWithoutAdditions(value)
      };
    };

    const updateInput = (
      target: HTMLTextAreaElement,
      newValue: string | null,
      selectionEnd: number,
      isMinusSign: boolean
    ): void => {
      if (newValue === null) {
        changesEmmiter(null, INPUT_EVENT);
        return;
      }

      const minusZero = Number(newValue) === 0 && isMinusSign;

      const prefix = props.prefix ?? '';
      const suffix = props.suffix ?? '';
      const value = Intl.NumberFormat(localizationTag, {
        useGrouping: props.useGrouping ?? undefined,
        minimumFractionDigits: props.precision ?? undefined
      }).format(Number(minusZero ? -0 : newValue));

      const newFormattedValue = `${prefix}${value}${suffix}`;

      const newLength = newFormattedValue.length;
      const newCaretPosition =
        target.value.length > 1
          ? selectionEnd + (newLength - target.value.length || 1)
          : target.value.length + prefixLength.value + 1;

      inputRef.value.$refs.input.value = newFormattedValue;

      changesEmmiter(Number(minusZero ? -0 : newValue), INPUT_EVENT);

      let movedCaret = newCaretPosition;

      if (newCaretPosition < prefixLength.value) {
        movedCaret = prefixLength.value;
      } else if (
        newCaretPosition >
        newFormattedValue.length - prefixLength.value
      ) {
        movedCaret = newFormattedValue.length - prefixLength.value;
      }

      setCursorPosition(target, movedCaret);
    };

    const updateValue = (
      target: HTMLTextAreaElement,
      selectionStart: number,
      selectionEnd: number,
      insertedValue: string,
      key: string
    ): void => {
      const { value } = target;

      const valueSeparatedParts = [
        value.substring(prefixLength.value, selectionStart),
        value.substring(selectionEnd, value.length - suffixLength.value)
      ];

      if (
        !valueSeparatedParts[0] &&
        valueSeparatedParts[1].substring(1, -1) ===
          getLocaleSeparator('decimal')
      ) {
        updateInput(target, null, selectionEnd, false);
        return;
      }

      const newValue = parseLocaleNumber(
        `${valueSeparatedParts[0]}${insertedValue}${valueSeparatedParts[1]}`
      );

      if (newValue > state.maxValue || newValue < state.minValue) return;

      updateInput(
        target,
        newValue.toFixed(props.precision ?? 0),
        selectionEnd,
        newValue < 0 || key === '-'
      );
    };

    const insertText = (target: HTMLTextAreaElement, key: string): void => {
      const { selectionStart } = target;

      const { value, selectionNewStart, selectionNewEnd } =
        getCleanSelections(target);

      let movedSelectionEnd = selectionNewEnd;

      let moveSelection = 0;
      let insertedValue = '';

      const previousPart = getValueWithoutAdditions(
        formattedValue.value.substring(0, selectionNewStart)
      );
      const lastPart = getValueWithoutAdditions(
        formattedValue.value.substring(movedSelectionEnd)
      );

      if (
        (key === 'Backspace' && !previousPart.length) ||
        (key === 'Delete' && !lastPart.length)
      ) {
        if (movedSelectionEnd - selectionNewStart === value.length) {
          updateInput(target, null, movedSelectionEnd, false);
        }

        if (value === '-') {
          inputRef.value.$refs.input.value = '';
        }

        return;
      }

      const prevChar = previousPart.substring(previousPart.length - 1);
      const nextChar = lastPart.substring(1, -1);

      if (key === getLocaleSeparator('decimal')) {
        if (nextChar === getLocaleSeparator('decimal'))
          setCursorPosition(target, selectionStart + 1);

        return;
      }

      if (key === '-' && nextChar === key) return;

      switch (key) {
        case 'Backspace':
          moveSelection = isCharReadonly(prevChar) ? -2 : -1;
          movedSelectionEnd -= isCharReadonly(prevChar) ? 1 : 0;
          break;
        case 'Delete':
          moveSelection = isCharReadonly(nextChar) ? 1 : 0;
          movedSelectionEnd += isCharReadonly(nextChar) ? 2 : 1;
          break;
        default:
          insertedValue = key;
          break;
      }

      if (insertedValue && !formattedValue.value) {
        updateInput(
          target,
          Number(Number(key) * -1).toFixed(props.precision ?? 0),
          movedSelectionEnd,
          false
        );
        return;
      }

      updateValue(
        target,
        selectionNewStart + moveSelection,
        movedSelectionEnd,
        insertedValue,
        key
      );
    };

    const handleBlur = (event: FocusEvent): void => {
      ctx.emit(BLUR_EVENT, event);

      const target = event.target as HTMLTextAreaElement;

      const emittedValue =
        !target.value || target.value === '-'
          ? null
          : parseLocaleNumber(getValueWithoutAdditions(target.value));

      changesEmmiter(emittedValue, 'change');

      if (props.validateEvent) qFormItem?.validateField(BLUR_EVENT);
    };
    const handleFocus = (event: FocusEvent): void => {
      ctx.emit(FOCUS_EVENT, event);
    };

    const onInputKeyPress = (event: KeyboardEvent): void => {
      const target = event.target as HTMLTextAreaElement;

      if (
        Number.isNaN(Number(event.key)) &&
        event.key !== '-' &&
        event.key !== '.' &&
        event.key !== ','
      )
        return;

      const { value, selectionNewStart, selectionNewEnd } =
        getCleanSelections(target);

      if (event.key === '-') {
        if (
          !formattedValue.value ||
          selectionNewEnd - selectionNewStart === value.length
        ) {
          inputRef.value.$refs.input.value = '-';
        } else if (selectionNewStart === 1) {
          insertText(target, event.key);
        }

        return;
      }

      insertText(target, event.key);
    };

    const handleKeydown = (event: KeyboardEvent): void => {
      const target = event.target as HTMLTextAreaElement;

      const { value, selectionStart, selectionEnd } = target;

      switch (event.key) {
        case 'Backspace':
        case 'Delete':
          event.preventDefault();
          insertText(target, event.key);
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          if (
            (event.key === 'ArrowLeft' &&
              selectionStart < prefixLength.value + 1) ||
            (event.key === 'ArrowRight' &&
              selectionEnd > value.length - suffixLength.value - 1)
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

    const insertPasteText = (
      target: HTMLTextAreaElement,
      text: string
    ): void => {
      const parsedText = parseLocaleNumber(getValueWithoutAdditions(text));
      if (Number.isNaN(Number(parsedText))) return;

      const { selectionStart, selectionEnd } = target;

      const previousPart = getValueWithoutAdditions(
        formattedValue.value.substring(0, selectionStart)
      );
      const lastPart = getValueWithoutAdditions(
        formattedValue.value.substring(selectionEnd)
      );

      const newValue = parseLocaleNumber(
        `${previousPart}${parsedText}${lastPart}`
      );

      updateInput(
        target,
        newValue.toFixed(props.precision ?? 0),
        selectionEnd,
        false
      );
    };

    const handlePaste = (event: ClipboardEvent): void => {
      const target = event.target as HTMLTextAreaElement;
      const text = event?.clipboardData?.getData('Text') ?? '';

      insertPasteText(target, text);
    };

    const handleClick = (event: MouseEvent): void => {
      const target = event.target as HTMLTextAreaElement;
      const { value, selectionStart, selectionEnd } = target;

      if (selectionStart !== selectionEnd) {
        event.preventDefault();
        return;
      }

      if (selectionStart < prefixLength.value + 1) {
        setCursorPosition(target, prefixLength.value);
      } else if (selectionStart > value.length - suffixLength.value - 1) {
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
      handleKeydown,
      onInputKeyPress,
      formattedValue,
      handleChangeNumberButtonClick,
      handlePaste,
      handleClick
    };
  }
});
</script>

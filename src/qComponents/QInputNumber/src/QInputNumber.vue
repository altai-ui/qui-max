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
      @click="handleDecreaseClick"
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
      @keydown="handleKeyDown"
      @paste.prevent="handlePaste"
      @click="handleClick"
      @select="handleSelect"
    />

    <button
      v-if="areControlsEnabled"
      class="q-input-number__button q-input-number__button_increase q-icon-plus"
      type="button"
      :disabled="isDisabled || isIncreaseDisabled"
      :class="isIncreaseDisabled && 'q-input-number__button_is-disabled'"
      @click="handleIncreaseClick"
    />
  </div>
</template>

<script lang="ts">
import {
  inject,
  computed,
  reactive,
  ref,
  defineComponent,
  nextTick
} from 'vue';

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
  InsertedTextParts,
  InputWithNumericSelections
} from './types';

import {
  parseLocaleNumber,
  getValueWithoutAdditions,
  getIncreasedValue,
  getDecreasedValue,
  getCleanSelections,
  handleClickFn,
  insertText,
  insertPasteText,
  setCursorPosition,
  setCaret,
  getLocaleSeparator
} from './helpers';

// to round to decimal, it must be multiplied by 100
const MIN_INTEGER = (Number.MIN_SAFE_INTEGER + 91) / 100;
const MAX_INTEGER = (Number.MAX_SAFE_INTEGER - 91) / 100;

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
        !Number.isNaN(Number(value)) || value == null
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
    },
    /**
     * Minimum allowed value. Min must be less than max
     */
    min: {
      type: Number,
      default: MIN_INTEGER,
      validator: (val: number) => val >= MIN_INTEGER
    },
    /**
     * Maximum allowed value.
     */
    max: {
      type: Number,
      default: MAX_INTEGER,
      validator: (val: number) => val <= MAX_INTEGER
    },
    /**
     * Incremental step
     */
    step: {
      type: Number,
      default: 1
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
      prevValue: null
    });

    const localizationTag = computed<string>(
      () => props.localization ?? getConfig('locale') ?? 'en'
    );

    const decimalSeparator = computed<string>(() =>
      getLocaleSeparator('decimal', localizationTag.value)
    );

    const additions = computed<AddittionsMatch>(() => ({
      prefix: props.prefix,
      suffix: props.suffix
    }));
    const precision = computed<Nullable<number>>(() =>
      props.precision && props.precision < 0 ? 0 : props.precision
    );

    const formattedValue = computed<string>(() => {
      const prefix = props.prefix ?? '';
      const suffix = props.suffix ?? '';

      const value = Intl.NumberFormat(localizationTag.value, {
        useGrouping: props.useGrouping ?? undefined,
        minimumFractionDigits: precision.value ?? undefined,
        maximumFractionDigits: precision.value ?? undefined
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
        (!(props.step && props.step < 0) &&
          (number >= (props.max ?? MAX_INTEGER) ||
            getIncreasedValue(number, props.step || 1, precision.value || 1) >
              (props.max ?? MAX_INTEGER))) ||
        (props.step &&
          props.step < 0 &&
          (number <= (props.min ?? MIN_INTEGER) ||
            getDecreasedValue(number, props.step, precision.value || 1) <
              (props.min ?? MIN_INTEGER))) ||
        false
      );
    });

    const isDecreaseDisabled = computed<boolean>(() => {
      const number = parsedNumber.value ?? 0;

      return (
        (!(props.step && props.step < 0) &&
          (number <= (props.min ?? MIN_INTEGER) ||
            getDecreasedValue(number, props.step || 1, precision.value || 1) <
              (props.min ?? MIN_INTEGER))) ||
        (props.step &&
          props.step < 0 &&
          (number >= (props.max ?? MAX_INTEGER) ||
            getDecreasedValue(number, props.step, precision.value || 1) >
              (props.max ?? MAX_INTEGER))) ||
        false
      );
    });

    const prefixLength = computed<number>(() => props.prefix?.length ?? 0);

    const suffixLength = computed<number>(() => props.suffix?.length ?? 0);

    const insertTextFn = (
      target: HTMLInputElement,
      key: string
    ): InsertedTextParts =>
      insertText({
        target,
        key,
        localizationTag: localizationTag.value,
        minMax: {
          min: props.min ?? MIN_INTEGER,
          max: props.max ?? MAX_INTEGER
        },
        precision: precision.value ?? 0
      });

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
      const step = isIncrease ? props.step || 1 : -(props.step || 1);

      const updatedNumber = getIncreasedValue(
        parsedNumber.value,
        step,
        precision.value || 1
      );

      if (
        updatedNumber > (props.max ?? MAX_INTEGER) ||
        updatedNumber < (props.min ?? MIN_INTEGER)
      )
        return;

      changesEmmiter(updatedNumber, 'change');
    };

    const handleDecreaseClick = (): void => {
      handleChangeNumberButtonClick(false);
    };

    const handleIncreaseClick = (): void => {
      handleChangeNumberButtonClick(true);
    };

    const updateInput = ({
      target,
      numberValue,
      prevPart,
      lastPart,
      key
    }: InsertedTextParts): void => {
      const { value, selectionStart, selectionEnd } =
        target as InputWithNumericSelections;

      if ((!value || value === '-') && numberValue === 0 && precision.value) {
        changesEmmiter(numberValue, 'input');
        const cursorCorrection = !value ? 2 : 3;
        nextTick(() => {
          setCursorPosition(target, prefixLength.value + cursorCorrection);
        });
        return;
      }
      if (numberValue === null) {
        const correction = key === 'Backspace' ? -1 : 1;
        setCursorPosition(target, selectionStart + correction);
        return;
      }

      if (
        (numberValue.toString().includes(decimalSeparator.value) ||
          numberValue.toString().includes(`-${decimalSeparator.value}`) ||
          !numberValue) &&
        !Number(numberValue) &&
        inputRef?.value?.input
      ) {
        inputRef.value.input.value = '';
        changesEmmiter(null, 'input');
        setCursorPosition(target, prefixLength.value);
        return;
      }

      let numberValueAsNumber = Number(numberValue);

      if (numberValueAsNumber > (props.max ?? MAX_INTEGER))
        numberValueAsNumber = props.max ?? MAX_INTEGER;
      if (numberValueAsNumber < (props.min ?? MIN_INTEGER))
        numberValueAsNumber = props.min ?? MIN_INTEGER;

      const newFormattedValue = Intl.NumberFormat(localizationTag.value, {
        useGrouping: props.useGrouping ?? undefined,
        minimumFractionDigits: precision.value ?? undefined,
        maximumFractionDigits: precision.value ?? undefined
      }).format(numberValueAsNumber);

      const newValue = `${props.prefix || ''}${newFormattedValue}${
        props.suffix || ''
      }`;

      if (
        numberValueAsNumber >= (props.max ?? MAX_INTEGER) ||
        numberValueAsNumber <= (props.min ?? MIN_INTEGER)
      ) {
        changesEmmiter(numberValueAsNumber, 'input');
        const position =
          newValue.length - suffixLength.value - ((precision.value || -1) + 1);

        nextTick(() => {
          setCursorPosition(target, position);
        });
        return;
      }

      if (inputRef?.value?.input) inputRef.value.input.value = newValue;

      changesEmmiter(numberValueAsNumber, 'input');

      setCaret(
        target,
        value,
        newValue,
        prevPart,
        lastPart,
        key,
        selectionStart,
        selectionEnd,
        prefixLength.value,
        suffixLength.value,
        localizationTag.value
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

    const handleSelect = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      const { value, selectionStart, selectionEnd } =
        target as InputWithNumericSelections;
      target.selectionStart =
        selectionStart < prefixLength.value
          ? prefixLength.value
          : selectionStart;
      target.selectionEnd =
        selectionEnd > value.length - suffixLength.value
          ? value.length - suffixLength.value
          : selectionEnd;
    };

    const handleKeyDown = async (event: KeyboardEvent): Promise<void> => {
      const isCombinationKeys = ['a', 'c', 'v', 'x'].some(
        key => event.key === key && (event.metaKey || event.ctrlKey)
      );
      const lettersReg = new RegExp(`^[^-\\d\\${decimalSeparator.value}]$`);
      const numbersReg = new RegExp(/^\d$/);
      const lastBeforeMinus = new RegExp(/-\d$/);

      const isNumberOrLetter =
        lettersReg.test(event.key.trim()) || numbersReg.test(event.key.trim());

      if (isNumberOrLetter && !isCombinationKeys) event.preventDefault();

      if (isCombinationKeys) return;

      const target = event.target as HTMLInputElement;

      const { value, selectionStart, selectionEnd } =
        target as InputWithNumericSelections;
      const {
        value: cleanValue,
        selectionNewStart,
        selectionNewEnd
      } = getCleanSelections(target, additions.value);

      if (
        selectionStart !== selectionNewEnd &&
        lettersReg.test(event.key) &&
        !isCombinationKeys
      )
        return;

      switch (event.key) {
        case 'c':
        case 'v':
        case 'a':
        case 'x':
        case 'Meta':
        case 'Control':
        case 'Shift':
        case 'Enter':
          break;
        case ' ':
          event.preventDefault();
          break;
        case '-':
          event.preventDefault();

          if (
            !formattedValue.value ||
            selectionNewEnd - selectionNewStart === cleanValue.length
          ) {
            if (inputRef?.value?.input) inputRef.value.input.value = '-';
          } else if (selectionNewStart === 0 && !cleanValue.includes('-')) {
            updateInput(insertTextFn(target, event.key));
          }

          break;
        case 'Backspace':
        case 'Delete':
          event.preventDefault();
          if (
            (lastBeforeMinus.test(cleanValue) ||
              (selectionNewEnd === cleanValue.length &&
                selectionNewStart !== selectionNewEnd &&
                cleanValue.slice(0, selectionNewStart) === '-')) &&
            inputRef?.value?.input
          ) {
            inputRef.value.input.value = '-';
            return;
          }
          if (
            ((event.key === 'Backspace' && selectionNewStart === 0) ||
              (event.key === 'Delete' &&
                selectionNewEnd === cleanValue.length)) &&
            selectionStart === selectionEnd
          )
            return;
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
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setCursorPosition(target, prefixLength.value);
            return;
          }
          if (
            selectionStart <= prefixLength.value &&
            selectionStart !== selectionEnd
          ) {
            setCursorPosition(target, prefixLength.value);
          }

          if (props.prefix && selectionStart <= prefixLength.value)
            event.preventDefault();

          break;
        case 'ArrowRight':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setCursorPosition(target, value.length - suffixLength.value);
            return;
          }
          if (selectionStart !== selectionEnd && !event.shiftKey)
            target.selectionStart = selectionEnd;
          if (selectionEnd && selectionEnd >= value.length - prefixLength.value)
            event.preventDefault();
          break;
        case 'ArrowUp':
          event.preventDefault();
          setCursorPosition(target, prefixLength.value);
          break;
        case 'ArrowDown':
          event.preventDefault();
          setCursorPosition(target, value.length - suffixLength.value);
          break;
        case decimalSeparator.value:
          event.preventDefault();

          if (value[selectionEnd] === decimalSeparator.value)
            setCursorPosition(target, selectionEnd + 1);
          break;
        default:
          if (
            (cleanValue.length && selectionNewStart > cleanValue.length) ||
            (cleanValue[selectionNewStart] === '-' &&
              selectionNewEnd !== cleanValue.length)
          ) {
            return;
          }

          updateInput(insertTextFn(target, event.key));
          break;
      }
    };

    const handlePaste = (event: ClipboardEvent): void => {
      const target = event.target as HTMLInputElement;
      const text = event?.clipboardData?.getData('Text') ?? '';
      const numericText = text.replace(/[^\d.-]/g, '');

      if (Number.isNaN(Number(numericText))) return;
      updateInput(
        insertPasteText({
          target,
          key: numericText,
          localizationTag: localizationTag.value,
          minMax: {
            min: props.min ?? MIN_INTEGER,
            max: props.max ?? MAX_INTEGER
          },
          precision: precision.value ?? 0
        })
      );
    };

    const handleClick = (event: MouseEvent): void => {
      handleClickFn(event, prefixLength.value, suffixLength.value);
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
      formattedValue,
      handleDecreaseClick,
      handleIncreaseClick,
      handlePaste,
      handleClick,
      handleSelect
    };
  }
});
</script>

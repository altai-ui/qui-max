<template>
  <div
    class="q-input-number"
    :class="withControlsClass"
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
      v-bind="$attrs"
      :model-value="currentValue"
      class="q-input-number__input"
      :disabled="isDisabled"
      :validate-event="false"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleChangeInput($event, 'input')"
      @change="handleChangeInput($event, 'change')"
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
  watch,
  defineComponent,
  nextTick
} from 'vue';

import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { Nullable } from '#/helpers';

import type {
  QInputNumberProps,
  QInputNumberState,
  QInputNumberInstance
} from './types';

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
    'input'
  ],

  setup(props: QInputNumberProps, ctx): QInputNumberInstance {
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);

    const state = reactive<QInputNumberState>({
      number: null,
      userNumber: null,
      prevValue: null,
      minValue: ctx.attrs.min ? Number(ctx.attrs.min) : Number.MIN_SAFE_INTEGER,
      maxValue: ctx.attrs.max ? Number(ctx.attrs.max) : Number.MAX_SAFE_INTEGER,
      step: ctx.attrs.step ? Number(ctx.attrs.step) : 1
    });

    const getIncreasedValue = (number: number, step: number): number =>
      Math.round((number + step) * 100) / 100;

    const getDecreasedValue = (number: number, step: number): number =>
      Math.round((number - step) * 100) / 100;

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const withControlsClass = computed<Record<string, boolean>>(() => ({
      'q-input-number_with-controls': !props.noControls
    }));

    const isIncreaseDisabled = computed<boolean>(() => {
      const number = state.number ?? 0;

      return (
        number >= state.maxValue ||
        getIncreasedValue(number, state.step) > state.maxValue
      );
    });

    const isDecreaseDisabled = computed<boolean>(() => {
      const number = state.number ?? 0;

      return (
        number <= state.minValue ||
        getDecreasedValue(number, state.step) < state.minValue
      );
    });

    const currentValue = computed<string>(() =>
      (state.userNumber ?? state.number ?? '').toString()
    );

    const areControlsEnabled = computed<boolean>(
      () => !props.noControls && !isDisabled.value
    );

    watch(
      () => props.modelValue,
      value => {
        state.number = value !== null ? Number(value) : null;
      },
      { immediate: true }
    );

    const handleBlur = (event: FocusEvent): void => {
      ctx.emit('blur', event);
      if (props.validateEvent) qFormItem?.validateField('blur');
    };

    const handleFocus = (event: FocusEvent): void => {
      ctx.emit('focus', event);
    };

    const changesEmmiter = (value: Nullable<number>, type: string): void => {
      let passedData: Nullable<number> = null;

      if (value !== null) {
        state.number = Number(value.toFixed(props.precision ?? 0));
        passedData = state.number;
      }

      if (type === 'change') {
        ctx.emit('change', passedData);
        if (props.validateEvent) qFormItem?.validateField('change');
        return;
      }

      ctx.emit('input', passedData);
      if (props.validateEvent) qFormItem?.validateField('input');
    };

    const processUserValue = async (
      value: number,
      type: string
    ): Promise<void> => {
      state.userNumber = null;

      if (value > state.maxValue || value < state.minValue) {
        state.number = null;

        await nextTick();

        state.userNumber =
          value > state.maxValue ? state.maxValue : state.minValue;
        state.number = state.userNumber;
        return;
      }

      if (type === 'change') {
        changesEmmiter(value, type);
        return;
      }

      ctx.emit('input', Number(value.toFixed(props.precision ?? 0)));
      if (props.validateEvent) qFormItem?.validateField('input');
    };

    const handleChangeInput = (event: Event, type: string): void => {
      const value = (event.target as HTMLInputElement)?.value ?? null;

      if (value === '-') return;

      if (value === null || value === '') {
        state.userNumber = value;
        state.number = null;
        changesEmmiter(null, type);
        return;
      }

      processUserValue(Number(value), type);
    };

    const handleIncreaseClick = (): void => {
      const number = state.number ?? 0;
      const updatedNumber = getIncreasedValue(number, state.step);

      state.userNumber = updatedNumber;
      changesEmmiter(updatedNumber, 'change');
    };

    const handleDecreaseClick = (): void => {
      const number = state.number ?? 0;
      const updatedNumber = getDecreasedValue(number, state.step);

      state.userNumber = updatedNumber;
      changesEmmiter(updatedNumber, 'change');
    };

    return {
      state,
      isDisabled,
      withControlsClass,
      isIncreaseDisabled,
      isDecreaseDisabled,
      currentValue,
      areControlsEnabled,
      handleIncreaseClick,
      handleDecreaseClick,
      handleBlur,
      handleFocus,
      handleChangeInput,
      processUserValue,
      changesEmmiter
    };
  }
});
</script>

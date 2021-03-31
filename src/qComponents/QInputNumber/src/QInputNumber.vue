<template>
  <div
    class="q-input-number"
    :class="withControlsClass"
  >
    <button
      v-if="areControlsEnabled"
      class="q-input-number__button q-input-number__button_decrease q-icon-minus"
      type="button"
      :disabled="isDisabled"
      :class="decreaseClass"
      @click="handleDecreaseClick"
    />

    <q-input
      :model-value="currentValue"
      class="q-input-number__input"
      :disabled="isDisabled"
      :validate-event="false"
      @blur="handleBlur"
      @focus="handleFocus"
      @update:model-value="handleChangeInput"
    />

    <button
      v-if="areControlsEnabled"
      class="q-input-number__button q-input-number__button_increase q-icon-plus"
      type="button"
      :disabled="isDisabled"
      :class="increaseClass"
      @click="handleIncreaseClick"
    />
  </div>
</template>

<script lang="ts">
import { inject, computed, reactive, watch, defineComponent, PropType, nextTick } from 'vue';

import { QFormProvider } from '@/qComponents/QForm';
import { QFormItemProvider } from '@/qComponents/QFormItem';

interface State {
  number: number | null;
  userNumber: number | string | null;
  prevValue: number | null;
  minValue: number;
  maxValue: number;
  step: number;
};

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
    controls: {
      type: Boolean,
      default: true
    },
    /**
     * default to v-model
     */
    modelValue: {
      type: [String, Number] as PropType<
        null | string | number
      >,
      default: '',
      validator: (value: string | number): boolean => {
        if (!Number.isNaN(Number(value)) || value === null) return true;

        return false;
      }
    },
    /** validate parent form if present */
    validateEvent: {
      type: Boolean,
      default: true
    }
  },

  emits: [
    'blur',
    'focus',
    'input',
    'change'
  ],

  setup(props, ctx) {
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const qForm = inject<QFormProvider | null>('qForm', null);

    const state = reactive<State>({
      number: null,
      userNumber: null,
      prevValue: null,
      minValue: ctx.attrs.min as number ?? Number.MIN_SAFE_INTEGER,
      maxValue: ctx.attrs.max as number ?? Number.MAX_SAFE_INTEGER,
      step: ctx.attrs.step as number ?? 1
    });

    const isDisabled = computed(() => props.disabled || (qForm?.disabled ?? false));

    const withControlsClass = computed(() => ({ 'q-input-number_with-controls': props.controls }));

    const increaseClass = computed(() => {
      if (
        (state.number && state.number >= state.maxValue)
        || (state.number === null && state.maxValue === 0)
      ) {
        return 'q-input-number__button_is-disabled';
      }

      return '';
    });

    const decreaseClass = computed(() => {
      if (
        (state.number && state.number <= state.minValue)
        || (state.number === null && state.minValue === 0)
      ) {
        return 'q-input-number__button_is-disabled';
      }

      return '';
    });

    const currentValue = computed(() => {
      return (state.userNumber ?? state.number ?? '').toString()
    });

    const areControlsEnabled = computed(() => props.controls && !isDisabled.value);

    watch(
      () => props.modelValue,
      (value) => {
        state.number = value !== null ? Number(value) : null;
      },
      { immediate:true }
    );

    const handleBlur = (event: FocusEvent) => {
      ctx.emit('blur', event);
      if (props.validateEvent) qFormItem?.validateField('blur');
    };

    const handleFocus = (event: FocusEvent) => {
      ctx.emit('focus', event);
    };

    const changesEmmiter = (value: number | null, type: string) => {
      let passedData = null;

      if (value !== null) {
        state.number = Number(value.toFixed(props.precision));
        passedData = state.number;
      }

      if (type === 'change') {
        ctx.emit('change', passedData);
        if (props.validateEvent) qFormItem?.validateField('change');
        return;
      }

      ctx.emit('input', passedData);
      if (props.validateEvent) qFormItem?.validateField('input');
    }

    const processUserValue = async (value: number, type: string) => {
      state.userNumber = null;
      
      if (value > state.maxValue || value < state.minValue) {
        state.number = null;

        await nextTick();
        
        state.userNumber = value > state.maxValue ? state.maxValue : state.minValue;
        state.number = state.userNumber;
        return;
      }

      if (type === 'change') {
        changesEmmiter(value, type);
        return;
      }

      ctx.emit('input', Number(value.toFixed(props.precision)));
      if (props.validateEvent) qFormItem?.validateField('input');
    };

    const handleChangeInput = (value: number | string | null, type: string) => {
      if (value === null || value === '') {
        state.userNumber = value;
        state.number = null;
        changesEmmiter(null, type);
        return;
      }

      processUserValue(Number(value), type);
    };

    const handleIncreaseClick = () => {
      const number = state.number ?? 0;
      const updatedNumber = Math.round((number + state.step) * 100) / 100;

      if (updatedNumber > state.maxValue) return;

      state.userNumber = updatedNumber;
      changesEmmiter(updatedNumber, 'change');
    };

    const handleDecreaseClick = () => {
      const number = state.number ?? 0;
      const updatedNumber = Math.round((number - state.step) * 100) / 100;

      if (updatedNumber < state.minValue) return;

      state.userNumber = updatedNumber;
      changesEmmiter(updatedNumber, 'change');
    };

    return {
      state,
      isDisabled,
      withControlsClass,
      increaseClass,
      decreaseClass,
      currentValue,
      areControlsEnabled,
      handleIncreaseClick,
      handleDecreaseClick,
      handleBlur,
      handleFocus,
      handleChangeInput,
      processUserValue,
      changesEmmiter
    }
  }
});
</script>

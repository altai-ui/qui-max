<template>
  <div
    class="q-input-number"
    :class="withControlsClass"
  >
    <button
      v-if="controls"
      class="q-input-number__button q-input-number__button_decrease q-icon-minus"
      type="button"
      :disabled="isDisabled"
      :class="decreaseClass"
      @click="handleDecreaseClick"
    />

    <q-input
      v-bind="$attrs"
      :model-value="currentValue"
      class="q-input-number__input"
      :disabled="isDisabled"
      :validate-event="false"
      type="number"
      @blur="handleBlur"
      @focus="handleFocus"
      @update:model-value="handleChangeInput"
    />

    <button
      v-if="controls"
      class="q-input-number__button q-input-number__button_increase q-icon-plus"
      type="button"
      :disabled="isDisabled"
      :class="increaseClass"
      @click="handleIncreaseClick"
    />
  </div>
</template>

<script lang="ts">
import { inject, computed, reactive, watch, defineComponent, PropType } from 'vue';

import { QFormProvider } from '@/qComponents/QForm';
import { QFormItemProvider } from '@/qComponents/QFormItem';

interface State {
  number: number | null;
  userNumber: number | null;
};

export default defineComponent({
  name: 'QInputNumber',
  componentName: 'QInputNumber',

  inheritAttrs: false,

  props: {
    /**
      * the minimum allowed value
      */
    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER
    },

    /**
      * the maximum allowed value
      */
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },

    /**
      * incremental step
      */
    step: {
      type: Number,
      default: 1
    },

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
      userNumber: null
    });

    const isDisabled = computed(() => props.disabled || (qForm?.disabled ?? false));

    const withControlsClass = computed(() => ({ 'q-input-number_with-controls': props.controls }));

    const increaseClass = computed(() => {
      if (state.number && state.number >= props.max) {
        return 'q-input-number__button_is-disabled';
      }

      return '';
    });

    const decreaseClass = computed(() => {
      if (state.number && state.number <= props.min) {
        return 'q-input-number__button_is-disabled';
      }

      return '';
    });

    const currentValue = computed(() => (state.userNumber ?? state.number ?? '').toString());


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

      if (value || value === 0) {
        state.number = Number(value.toFixed(props.precision));
        passedData = state.number;
      }

      if (type === 'change') {
        ctx.emit('input', passedData);
        ctx.emit('change', passedData);
        if (props.validateEvent) qFormItem?.validateField('change');
        return;
      }

      ctx.emit('input', passedData);
      if (props.validateEvent) qFormItem?.validateField('input');
    }

    const processUserValue = (value: number, type: string) => {
      state.userNumber = null;

      if (value > props.max || value < props.min) {
        return;
      }

      if (type === 'change') {
        changesEmmiter(value, type);
        return;
      }

      ctx.emit('input', Number(value.toFixed(props.precision)));
      if (props.validateEvent) qFormItem?.validateField('input');
    };

    const handleChangeInput = (value: number | null, type: string) => {
      if (!value && value !== 0) {
        state.userNumber = value;
        changesEmmiter(null, type);
        return;
      }

      processUserValue(Number(value), type);
    };

    const handleIncreaseClick = () => {
      const number = state.number ?? 0;
      const updatedNumber = Math.round((number + props.step) * 100) / 100;

      if (updatedNumber > props.max) return;

      state.userNumber = updatedNumber;
      changesEmmiter(updatedNumber, 'change');
    };

    const handleDecreaseClick = () => {
      const number = state.number ?? 0;
      const updatedNumber = Math.round((number - props.step) * 100) / 100;

      if (updatedNumber < props.min) return;

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

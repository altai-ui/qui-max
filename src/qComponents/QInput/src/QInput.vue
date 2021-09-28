<template>
  <div
    ref="root"
    :class="classes"
    @mouseenter="state.hovering = true"
    @mouseleave="state.hovering = false"
  >
    <div
      v-if="isSymbolLimitShown"
      class="q-input__count"
    >
      <span class="q-input__count-inner">
        {{ t('QInput.charNumber') }}: {{ textLength }}/{{ $attrs.maxlength }}
      </span>
    </div>

    <input
      v-bind="$attrs"
      ref="input"
      :value="modelValue"
      class="q-input__inner"
      :type="inputType"
      :disabled="isDisabled"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <span
      v-if="isSuffixVisible"
      class="q-input__suffix"
    >
      <span
        v-if="isDisabled"
        class="q-input__icon q-icon-lock"
      />

      <span
        v-else-if="isClearButtonShown"
        class="q-input__icon q-icon-close"
        @click="handleClearClick"
      />

      <span
        v-else-if="isPasswordSwitchShown"
        class="q-input__icon"
        :class="state.isPasswordVisible ? 'q-icon-eye' : 'q-icon-eye-close'"
        @click="handlePasswordVisible"
      />

      <span
        v-else-if="suffixIcon"
        class="q-input__icon"
        :class="suffixIcon"
      />

      <slot
        v-else
        name="suffix"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { inject, computed, ref, reactive, watch, defineComponent } from 'vue';
import type { PropType } from 'vue';

import { t } from '@/qComponents/locale';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { Nullable } from '#/helpers';

import type {
  QInputInstance,
  QInputPropRootClass,
  QInputProps,
  QInputState,
  QInputClass
} from './types';

export default defineComponent({
  name: 'QInput',
  componentName: 'QInput',

  inheritAttrs: false,

  props: {
    /**
     * default to v-model
     */
    modelValue: {
      type: String,
      default: null
    },
    /**
     * whether input is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * shows the counter
     */
    showSymbolLimit: {
      type: Boolean,
      default: false
    },
    /**
     * validate parent form if present
     */
    validateEvent: {
      type: Boolean,
      default: true
    },
    /**
     * suffix icon class
     */
    suffixIcon: {
      type: String,
      default: null
    },
    /**
     * whether to show clear button
     */
    clearable: {
      type: Boolean,
      default: false
    },
    /**
     * whether to show password
     */
    passwordSwitch: {
      type: Boolean,
      default: false
    },
    /**
     * as native attrs bind to native input, via rootСlass you can set class for q-input root
     */
    rootClass: {
      type: [Array, Object] as PropType<QInputPropRootClass>,
      default: null
    }
  },

  emits: [
    /**
     * triggers when model updates
     */
    'update:modelValue',
    /**
     * alias for update:modelValue
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
     * triggers when clear button clicks
     */
    'clear',
    /**
     * triggers when native input event fires
     */
    'input'
  ],

  setup(props: QInputProps, ctx): QInputInstance {
    const root = ref<Nullable<HTMLElement>>(null);
    const input = ref<Nullable<HTMLInputElement>>(null);
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);

    const state = reactive<QInputState>({
      hovering: false,
      focused: false,
      // state of passwordSwitch
      isPasswordVisible: false
    });

    const inputType = computed<string>(() => {
      if (!props.passwordSwitch) return String(ctx.attrs.type ?? 'text');

      return state.isPasswordVisible ? 'text' : 'password';
    });

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const isSymbolLimitShown = computed<boolean>(() =>
      Boolean(
        props.showSymbolLimit &&
          ctx.attrs.maxlength &&
          !isDisabled.value &&
          !ctx.attrs.readonly &&
          !props.passwordSwitch
      )
    );

    const isPasswordSwitchShown = computed<boolean>(() =>
      Boolean(
        props.passwordSwitch &&
          !ctx.attrs.readonly &&
          (props.modelValue || state.focused || state.hovering)
      )
    );

    const isClearButtonShown = computed<boolean>(() =>
      Boolean(
        props.clearable &&
          !ctx.attrs.readonly &&
          props.modelValue &&
          (state.focused || state.hovering)
      )
    );

    const isSuffixVisible = computed<boolean>(() =>
      Boolean(
        isDisabled.value ||
          isClearButtonShown.value ||
          isPasswordSwitchShown.value ||
          props.suffixIcon ||
          ctx.slots.suffix
      )
    );

    const classes = computed<QInputClass[]>(() => {
      const mainClass = 'q-input';

      return [
        mainClass,
        props.rootClass,
        {
          [`${mainClass}_disabled`]: isDisabled.value,
          [`${mainClass}_suffix`]: isSuffixVisible.value
        }
      ];
    });

    const textLength = computed<number>(() => props.modelValue?.length ?? 0);

    const updateModel = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      ctx.emit('update:modelValue', target.value ?? '');
    };

    const handleInput = (event: Event): void => {
      ctx.emit('input', event);
      updateModel(event);
    };

    const handleChange = (event: Event): void => {
      ctx.emit('change', event);
      updateModel(event);
    };

    const handleBlur = (event: FocusEvent): void => {
      state.focused = false;
      ctx.emit('blur', event);
      if (props.validateEvent) qFormItem?.validateField('blur');
    };

    const handleFocus = (event: FocusEvent): void => {
      state.focused = true;
      ctx.emit('focus', event);
    };

    const handlePasswordVisible = (): void => {
      state.isPasswordVisible = !state.isPasswordVisible;
      input?.value?.focus();
    };

    const handleClearClick = (event: MouseEvent): void => {
      ctx.emit('update:modelValue', '');
      ctx.emit('clear', event);
      input?.value?.focus();
    };

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) qFormItem?.validateField('change');
      }
    );

    return {
      root,
      state,
      classes,
      isDisabled,
      isPasswordSwitchShown,
      isSuffixVisible,
      isClearButtonShown,
      isSymbolLimitShown,
      textLength,
      inputType,
      input,
      handleBlur,
      handleFocus,
      handlePasswordVisible,
      handleClearClick,
      updateModel,
      handleInput,
      handleChange,
      t
    };
  }
});
</script>

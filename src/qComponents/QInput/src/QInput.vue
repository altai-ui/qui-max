<template>
  <div
    :class="classes"
    @mouseenter="state.hovering = true"
    @mouseleave="state.hovering = false"
    @click="$emit('click')"
  >
    <div
      v-if="isSymbolLimitShown"
      class="q-input__count"
    >
      <span class="q-input__count-inner">
        {{ t('QInput.charNumber') }}: {{ textLength }}/{{ upperLimit }}
      </span>
    </div>
    <input
      v-bind="$attrs"
      ref="input"
      :value="modelValue"
      class="q-input__inner"
      :type="inputType"
      :disabled="isDisabled"
      @input="updateModel"
      @change="updateModel"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span
      v-if="isSuffixVisible"
      class="q-input__suffix"
    >
      <span class="q-input__suffix-inner">
        <template v-if="!isClearButtonShown || !isPasswordSwitchShown">
          <span
            v-if="suffixIcon"
            class="q-input__icon"
            :class="suffixIcon"
          />
          <slot
            v-else
            name="suffix"
          />
        </template>
        <span
          v-if="isClearButtonShown"
          class="q-input__icon q-icon-close"
          @click="handleClearClick"
        />
        <span
          v-if="isPasswordSwitchShown"
          class="q-input__icon"
          :class="state.isPasswordVisible ? 'q-icon-eye' : 'q-icon-eye-close'"
          @click="handlePasswordVisible"
        />
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { inject, computed, ref, reactive, watch, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { QFormProvider } from '@/qComponents/QForm';
import { QFormItemProvider } from '@/qComponents/QFormItem';

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
      default: ''
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
    /** validate parent form if present */
    validateEvent: {
      type: Boolean,
      default: true
    },
    /**
     * suffix icon class
     */
    suffixIcon: {
      type: String,
      default: ''
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
    }
  },

  emits: [
    'blur',
    'focus',
    'input',
    'change',
    'click',
    'clear',
    'update:modelValue'
  ],

  setup(props, ctx) {
    const input = ref<HTMLElement | null>(null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const qForm = inject<QFormProvider | null>('qForm', null);

    const state = reactive({
      hovering: false,
      focused: false,
      isPasswordVisible: false // state of passwordSwitch
    });

    const inputType = computed(() => {
      if (props.passwordSwitch)
        return state.isPasswordVisible ? 'password' : 'text';
      return ctx.attrs.type;
    });

    const isDisabled = computed(
      () => props.disabled || (qForm?.disabled ?? false)
    );

    const isPasswordSwitchShown = computed(
      () =>
        props.passwordSwitch &&
        !isDisabled.value &&
        !ctx.attrs.readonly &&
        (Boolean(props.modelValue) || state.focused || state.hovering)
    );

    const isClearButtonShown = computed(() =>
      Boolean(
        props.clearable &&
          !isDisabled.value &&
          !ctx.attrs.readonly &&
          props.modelValue &&
          (state.focused || state.hovering)
      )
    );

    const isSuffixVisible = computed(() =>
      Boolean(
        ctx.slots.suffix ||
          props.suffixIcon ||
          isClearButtonShown.value ||
          props.passwordSwitch
      )
    );

    const isSymbolLimitShown = computed(
      () =>
        props.showSymbolLimit &&
        ctx.attrs.maxlength &&
        !isDisabled.value &&
        !ctx.attrs.readonly &&
        !props.passwordSwitch
    );

    const classes = computed(() => {
      const mainClass = 'q-input';

      return [
        mainClass,
        {
          [`${mainClass}_disabled`]: isDisabled.value,
          [`${mainClass}_suffix`]: isSuffixVisible.value
        }
      ];
    });

    const upperLimit = computed(() => ctx.attrs.maxlength);

    const textLength = computed(() => props.modelValue?.length ?? 0);

    const updateModel = (event: Event) => {
      const target = event.target as HTMLInputElement;
      ctx.emit('update:modelValue', target.value ?? '');
    };

    const handleBlur = (event: FocusEvent) => {
      state.focused = false;
      ctx.emit('blur', event);
      if (props.validateEvent) qFormItem?.validateField('blur');
    };

    const handleFocus = (event: FocusEvent) => {
      state.focused = true;
      ctx.emit('focus', event);
    };

    const handlePasswordVisible = (): void => {
      state.isPasswordVisible = !state.isPasswordVisible;
      input?.value?.focus();
    };

    const handleClearClick = (event: MouseEvent) => {
      ctx.emit('update:modelValue', '');
      ctx.emit('clear', event);
    };

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) qFormItem?.validateField('change');
      }
    );

    const { t } = useI18n();

    return {
      state,
      classes,
      isDisabled,
      isPasswordSwitchShown,
      isSuffixVisible,
      isClearButtonShown,
      isSymbolLimitShown,
      upperLimit,
      textLength,
      inputType,
      input,
      handleBlur,
      handleFocus,
      handlePasswordVisible,
      handleClearClick,
      updateModel,
      t
    };
  }
});
</script>

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
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('update:modelValue', $event.target.value)"
      ref="input"
      class="q-input__inner"
      :type="inputType"
      :disabled="inputDisabled"
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
import {
  inject,
  computed,
  ref,
  toRefs,
  reactive,
  watch
} from 'vue';
import { useI18n } from 'vue-i18n';
import emitter from '../../mixins/emitter';
import { QFormItemProvider } from '../../QFormItem'

export default {
  name: 'QInput',
  componentName: 'QInput',

  mixins: [emitter],

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

  emits: ['blur', 'focus', 'input', 'change', 'click', 'clear', 'update:modelValue'],

  setup(props, ctx) {    
    const input = ref<HTMLElement | null>(null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const qForm: any = inject('qForm', null);

    const state = reactive({
      hovering: false,
      focused: false,
      isPasswordVisible: false, // state of passwordSwitch
    });

    const inputType = computed(() => {
      if (props.passwordSwitch) return state.isPasswordVisible ? 'password' : 'text';
      return ctx.attrs.type;
    })
    
    const isPasswordSwitchShown = computed(() => {
      return (
        props.passwordSwitch &&
        !inputDisabled.value &&
        !ctx.attrs.readonly &&
        (Boolean(props.modelValue) || state.focused || state.hovering)
      );
    });
    
    const isClearButtonShown = computed(() => {
      return Boolean(
        props.clearable &&
          !inputDisabled.value &&
          !ctx.attrs.readonly &&
          props.modelValue &&
          (state.focused || state.hovering)
      );
    });

    const isSuffixVisible = computed(() => {      
      return Boolean(
        ctx.slots.suffix ||
          props.suffixIcon ||
          isClearButtonShown.value ||
          props.passwordSwitch
      );
    });

    const inputDisabled = computed(() => {
      return props.disabled || (qForm?.disabled ?? false)
    })
    
    const isSymbolLimitShown = computed(() => {
      return (
        props.showSymbolLimit &&
        ctx.attrs.maxlength &&
        !inputDisabled.value &&
        !ctx.attrs.readonly &&
        !props.passwordSwitch
      );
    });

    const classes = computed(() => {
      const mainClass: string = 'q-input';
      
      return [
        mainClass,
        {
          [`${mainClass}_disabled`]: inputDisabled.value,
          [`${mainClass}_suffix`]: isSuffixVisible.value
        }
      ];
    });

    const upperLimit = computed(() => {
      return ctx.attrs.maxlength
    })

    const textLength = computed(() => {  
      return props.modelValue?.length ?? 0
    })

    const handleBlur = (event: FocusEvent) => {
      state.focused = false;
      ctx.emit('blur', event);
      if (props.validateEvent) qFormItem?.validateField('blur');
    }

    const handleFocus = (event: FocusEvent) => {
      state.focused = true;
      ctx.emit('focus', event);
    }

    const handlePasswordVisible = (): void => {
      state.isPasswordVisible = !state.isPasswordVisible;      
      input?.value?.focus();
    }

    const handleClearClick = (event: Event) =>  {
      ctx.emit('update:modelValue', '');
      ctx.emit('clear', event);
    }

    const { modelValue } = toRefs(props);

    watch(modelValue, () => {
      if (props.validateEvent) qFormItem?.validateField('change');
    })

    const { t } = useI18n();

    return {
      // computed
      state,
      classes,
      inputDisabled,
      isPasswordSwitchShown,
      isSuffixVisible,
      isClearButtonShown,
      isSymbolLimitShown,
      upperLimit,
      textLength,
      inputType,
      // refs
      input,
      // methods
      handleBlur,
      handleFocus,
      handlePasswordVisible,
      handleClearClick,
      t
    }
  },
};
</script>

<template>
  <div
    :class="classes"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @click="$emit('click')"
  >
    <div
      v-if="isSymbolLimitShown"
      class="q-input__count"
    >
      <span class="q-input__count-inner">
        {{ $t('QInput.charNumber') }}: {{ textLength }}/{{ upperLimit }}
      </span>
    </div>
    <input
      ref="input"
      :tabindex="tabindex"
      class="q-input__inner"
      v-bind="$attrs"
      :type="nativeInputType"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :aria-label="label"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <span
      v-if="isSuffixVisible"
      class="q-input__suffix"
    >
      <span class="q-input__suffix-inner">
        <template v-if="!isClearButtonShown || !isPasswordShown">
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
          v-if="isPasswordShown"
          class="q-input__icon"
          :class="passwordVisible ? 'q-icon-eye' : 'q-icon-eye-close'"
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
  onMounted,
  nextTick,
  watch
} from 'vue';
import { isDisabled } from '../../composables/inputDisabled';
import emitter from '../../mixins/emitter';

export default {
  name: 'QInput',
  componentName: 'QInput',

  mixins: [emitter],

  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showSymbolLimit: {
      type: Boolean,
      default: false
    },
    counterLimit: {
      type: Number,
      default: null
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    label: { type: String, default: '' },
    tabindex: { type: String, default: '' },
    /**
     * as native input type
     */
    type: {
      type: String,
      default: 'text',
      validator: (value: string) =>
        [
          'text',
          'password',
          'number',
          'email',
          'hidden',
          'tel',
          'url'
        ].includes(value)
    },

    /**
     * as native input autocomplete
     */
    autocomplete: {
      type: String,
      default: 'off'
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
    showPassword: {
      type: Boolean,
      default: false
    }
  },

  emits: ['blur', 'focus', 'input', 'change', 'click', 'clear'],

  setup(props, ctx) {
    const input: any = ref(null);
    const qFormItem: any = inject('qFormItem', null);

    const state = reactive({
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    });

    const nativeInputValue = computed(() => String(props.value ?? ''));
    
    const nativeInputType = computed(() => {
      let type = props.type;
      if (props.showPassword) {
        type = state.passwordVisible ? 'text' : 'password';
      }
      return type;
    });
    const isPasswordShown = computed(() => {
      return (
        props.showPassword &&
        !props.disabled &&
        !props.readonly &&
        (Boolean(nativeInputValue.value) || state.focused || state.hovering)
      );
    });
    const isClearButtonShown = computed(() => {
      return Boolean(
        props.clearable &&
          !props.disabled &&
          !props.readonly &&
          nativeInputValue.value &&
          (state.focused || state.hovering)
      );
    });
    const isSuffixVisible = computed(() => {
      return Boolean(
        ctx.slots.suffix ||
          props.suffixIcon ||
          isClearButtonShown.value ||
          props.showPassword
      );
    });
    const isSymbolLimitShown = computed(() => {
      return (
        props.showSymbolLimit &&
        (ctx.attrs.maxlength || props.counterLimit) &&
        !props.disabled &&
        !props.readonly &&
        !props.showPassword
      );
    });
    const classes = computed(() => {
      const mainClass = 'q-input';

      return [
        mainClass,
        {
          [`${mainClass}_disabled`]: props.disabled,
          [`${mainClass}_suffix`]: isSuffixVisible
        }
      ];
    });
    const upperLimit = computed(() => {
      return ctx.attrs.maxlength ?? props.counterLimit;
    })

    const textLength = computed(() => {    
      return props.value?.length ?? 0
    })

    const setNativeInputValue = () => {
      console.log('setNativeInputValue', input.value);
      if (!input.value || input.value === nativeInputValue.value) return;
      input.value = nativeInputValue.value;
    };


    const handleBlur = (event: FocusEvent) => {
      state.focused = false;
      ctx.emit('blur', event);
      if (props.validateEvent) qFormItem?.validateField('blur');
    }

    const handleFocus = (event: FocusEvent) => {
      state.focused = true;
      ctx.emit('focus', event);
    }

    const handlePasswordVisible = (): void =>  {
      state.passwordVisible = !state.passwordVisible;
      this.focus();
    }

    const handleInput = (event: InputEvent) =>  {
      ctx.emit('input', event.target?.value, event);
      // ensure native input value is controlled
      nextTick(setNativeInputValue);
    }


    const handleChange = (event: EventTarget) =>  {
      ctx.emit('change', event?.target?.value);
    }

    const handleClearClick = (event: Event) =>  {
      console.log('handleClearClick');
      
      ctx.emit('change', '');
      ctx.emit('clear', event);
    }

    const select = () => input.select()

    onMounted(setNativeInputValue)

    const { value, type } = toRefs(props);

    console.log(props.value, value);
    
    watch(value, () => {
      if (props.validateEvent) qFormItem?.validateField('change');
    })

    watch(type, () => {
      nextTick(setNativeInputValue);
    });

    watch(nativeInputValue, setNativeInputValue);

    watch(isClearButtonShown, () => {
      console.log(isClearButtonShown);
    })

    return {
      // computed
      state,
      classes,
      inputDisabled: props.disabled,
      nativeInputValue: nativeInputValue,
      isPasswordShown: isPasswordShown,
      nativeInputType: nativeInputType,
      isSuffixVisible: isSuffixVisible,
      isClearButtonShown: isClearButtonShown,
      isSymbolLimitShown: isSymbolLimitShown,
      upperLimit: upperLimit,
      textLength: textLength,
      // refs
      input,
      // methods
      setNativeInputValue,
      handleBlur,
      handleFocus,
      handlePasswordVisible,
      handleInput,
      handleChange,
      handleClearClick,
      select
    }
  },

  ////
  methods: {
    ///
    focus() {
      this.input.focus();
    },

    select() {
      this.input.select();
    },
  },
  created() {
    this.$eventHub.on('inputSelect', this.select);
  },
};
</script>

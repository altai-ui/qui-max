<template>
  <div
    :class="classes"
    @mouseenter="state.hovering = true"
    @mouseleave="state.hovering = false"
  >
    <div
      v-if="isSymbolLimitShown"
      class="q-textarea__count"
    >
      {{ t('QTextarea.charNumber') }}: {{ textLength }}/{{ upperLimit }}
    </div>
    <textarea
      v-bind="$attrs"
      ref="textarea"
      class="q-textarea__inner"
      :disabled="isDisabled"
      :style="textareaStyle"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  ref,
  watch,
  reactive,
  PropType
} from 'vue';
import {
  computeDisabled,
  computeSymbolLimitVisibility
} from '@/qComponents/composables/inputs';
import { QFormProvider } from '@/qComponents/QForm';
import { QFormItemProvider } from '@/qComponents/QFormItem';
import { useI18n } from 'vue-i18n';
import emitter from '../../mixins/emitter';
import calcTextareaHeight from './calcTextareaHeight';

export default defineComponent({
  name: 'QTextarea',
  componentName: 'QTextarea',

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
     * control the resizability
     */
    resize: {
      type: String,
      default: 'vertical',
      validator: (value: string) =>
        ['vertical', 'horizontal', 'both', 'none'].includes(value)
    },
    /**
     * whether textarea is disabled
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
     * whether textarea has an adaptive height. Can accept an object, e.g. { minRows: 2, maxRows: 6 }
     */
    autosize: {
      type: [Boolean, Object] as PropType<
        boolean | { minRows: number; maxRows: number }
      >,
      default: true
    },

    /** validate parent form if present */
    validateEvent: {
      type: Boolean,
      default: true
    }
  },

  emits: ['blur', 'focus', 'input', 'change', 'update:modelValue'],

  setup(props, ctx) {
    const textareaCalcStyle = ref({});
    const qForm = inject<QFormProvider | null>('qForm', null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const textarea = ref<HTMLTextAreaElement | null>(null);
    const state = reactive({
      hovering: false,
      focused: false,
      isPasswordVisible: false // state of passwordSwitch
    });

    const isDisabled = computeDisabled({
      componentDisabled: props.disabled,
      formDisabled: qForm?.disabled ?? false
    });

    const upperLimit = computed(() => ctx.attrs.maxlength);
    const textLength = computed(() => props.modelValue?.length ?? 0);

    const isSymbolLimitShown = computeSymbolLimitVisibility(
      {
        showSymbolLimit: props.showSymbolLimit
      },
      {
        maxlength: ctx.attrs.maxlength,
        readonly: ctx.attrs.readonly
      },
      isDisabled
    );

    const classes = computed(() => {
      const mainClass = 'q-textarea';

      return [
        mainClass,
        {
          [`${mainClass}_disabled`]: isDisabled.value
        }
      ];
    });

    const textareaStyle = computed(() => ({
      ...textareaCalcStyle.value,
      resize: props.resize
    }));

    const updateModel = (event: Event) => {
      const target = event.target as HTMLInputElement;
      ctx.emit('update:modelValue', target.value ?? '');
    };

    const handleInput = (event: Event) => {
      ctx.emit('input', event);
      updateModel(event);
    };

    const handleChange = (event: Event) => {
      ctx.emit('change', event);
      updateModel(event);
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

    const resizeTextarea = () => {
      const { autosize } = props;

      if (!autosize) {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight
        };
        return;
      }

      const minRows = autosize === true ? 1 : autosize.minRows;
      const maxRows = autosize === true ? null : autosize.maxRows;

      textareaCalcStyle.value = calcTextareaHeight(
        textarea.value,
        minRows,
        maxRows
      );
    };

    watch(
      () => props.modelValue,
      () => {
        nextTick(() => resizeTextarea());
        if (props.validateEvent) qFormItem?.validateField('change');
      }
    );

    onMounted(() => {
      resizeTextarea();
    });

    const { t } = useI18n();

    return {
      t,
      state,
      textareaCalcStyle,
      classes,
      textarea,
      textareaStyle,
      isDisabled,
      isSymbolLimitShown,
      updateModel,
      handleBlur,
      handleFocus,
      handleInput,
      handleChange,
      upperLimit,
      textLength
    };
  }
});
</script>

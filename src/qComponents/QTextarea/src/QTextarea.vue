<template>
  <div :class="classes">
    <div
      v-if="isSymbolLimitShown"
      class="q-textarea__count"
    >
      {{ t('QTextarea.charNumber') }}: {{ textLength }}/{{ $attrs.maxlength }}
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
  PropType
} from 'vue';
import { QFormProvider } from '@/qComponents/QForm';
import { QFormItemProvider } from '@/qComponents/QFormItem';
import { useI18n } from 'vue-i18n';
import calcTextareaHeight from './calcTextareaHeight';

export default defineComponent({
  name: 'QTextarea',
  componentName: 'QTextarea',

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
      type: String as PropType<'vertical' | 'horizontal' | 'both' | 'none'>,
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
    const textareaCalcStyle = ref<{ minHeight?: string, height?: string, resize?: string}>({});
    const qForm = inject<QFormProvider | null>('qForm', null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const textarea = ref<HTMLTextAreaElement | null>(null);

    const isDisabled = computed(() => props.disabled || (qForm?.disabled ?? false)) 

    const isSymbolLimitShown = computed(
      () =>
        props.showSymbolLimit &&
        ctx.attrs.maxlength &&
        !isDisabled.value &&
        !ctx.attrs.readonly
    );

    const textLength = computed(() => props.modelValue?.length ?? 0);

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
      ctx.emit('blur', event);
      if (props.validateEvent) qFormItem?.validateField('blur');
    };

    const handleFocus = (event: FocusEvent) => {
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
      textLength
    };
  }
});
</script>

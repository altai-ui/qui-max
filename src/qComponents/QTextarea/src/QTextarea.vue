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
import { useI18n } from 'vue-i18n';

import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import calcTextareaHeight from './calcTextareaHeight';
import type {
  QTextareaProps,
  QTextareaPropResize,
  QTextareaPropAutosize
} from './types';

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
      type: String as PropType<QTextareaPropResize>,
      default: 'vertical',
      validator: (value: string): boolean =>
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
      type: [Boolean, Object] as PropType<QTextareaPropAutosize>,
      default: true
    },
    /** validate parent form if present */
    validateEvent: {
      type: Boolean,
      default: true
    }
  },

  emits: ['blur', 'focus', 'input', 'change', 'update:modelValue'],

  setup(props: QTextareaProps, ctx) {
    const textareaCalcStyle = ref<{
      minHeight?: string;
      height?: string;
      resize?: string;
    }>({});
    const qForm = inject<QFormProvider | null>('qForm', null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const textarea = ref<HTMLTextAreaElement | null>(null);

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled ?? false)
    );

    const isSymbolLimitShown = computed<boolean>(() =>
      Boolean(
        props.showSymbolLimit &&
          ctx.attrs.maxlength &&
          !isDisabled.value &&
          !ctx.attrs.readonly
      )
    );

    const textLength = computed<number>(() => props.modelValue?.length ?? 0);

    const classes = computed<(string | Record<string, boolean>)[]>(() => {
      const mainClass = 'q-textarea';

      return [
        mainClass,
        {
          [`${mainClass}_disabled`]: isDisabled.value
        }
      ];
    });

    const textareaStyle = computed<Record<string, string>>(() => ({
      ...textareaCalcStyle.value,
      resize: props.resize
    }));

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
      ctx.emit('blur', event);
      if (props.validateEvent) qFormItem?.validateField('blur');
    };

    const handleFocus = (event: FocusEvent): void => {
      ctx.emit('focus', event);
    };

    const resizeTextarea = (): void => {
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

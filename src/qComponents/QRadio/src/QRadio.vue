<template>
  <label
    class="q-radio"
    :class="wrapClass"
    role="radio"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keyup.space="handleSpaceKeyUp"
  >
    <span class="q-radio__input">
      <span class="q-radio__inner" />
      <input
        v-bind="$attrs"
        class="q-radio__original"
        type="radio"
        aria-hidden="true"
        tabindex="-1"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        @change="handleChange"
      />
    </span>
    <span
      class="q-radio__label"
      :class="labelClass"
      @keydown.stop
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import type { PropType } from 'vue';

import { validateArray } from '@/qComponents/helpers';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QRadioGroupProvider } from '@/qComponents/QRadioGroup';

import type { Nullable, ClassValue } from '#/helpers';

import type {
  QRadioProps,
  QRadioInstance,
  QRadioPropLabelSize,
  QRadioPropLabel,
  QRadioPropValue,
  QRadioPropChecked,
  QRadioPropDisabled
} from './types';

export default defineComponent({
  name: 'QRadio',
  componentName: 'QRadio',

  inheritAttrs: false,

  props: {
    /**
     * the value of Radio label
     */
    label: {
      type: String as PropType<QRadioPropLabel>,
      default: null
    },
    /**
     * binding value
     */
    value: {
      type: [String, Number, Boolean] as PropType<QRadioPropValue>,
      default: null
    },
    /**
     * whether Radio is checked
     */
    checked: {
      type: Boolean as PropType<QRadioPropChecked>,
      default: false
    },
    /**
     * whether Radio is disabled
     */
    disabled: {
      type: Boolean as PropType<QRadioPropDisabled>,
      default: false
    },
    /**
     * label size
     */
    labelSize: {
      type: String as PropType<QRadioPropLabelSize>,
      default: 'regular',
      validator: validateArray<QRadioPropLabelSize>(['regular', 'small'])
    }
  },

  emits: [
    /**
     * triggers when value updates
     */
    'change'
  ],

  setup(props: QRadioProps, ctx): QRadioInstance {
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);
    const qRadioGroup = inject<Nullable<QRadioGroupProvider>>(
      'qRadioGroup',
      null
    );

    const isGroup = computed<boolean>(() => Boolean(qRadioGroup));

    const isChecked = computed<boolean>(() =>
      isGroup.value
        ? qRadioGroup?.modelValue.value === props.value
        : Boolean(props.checked)
    );

    const isDisabled = computed<boolean>(
      () =>
        props.disabled ||
        (qForm?.disabled.value ?? false) ||
        (qRadioGroup?.disabled.value ?? false)
    );

    const wrapClass = computed<ClassValue>(() => ({
      'q-radio_disabled': isDisabled.value,
      'q-radio_checked': isChecked.value
    }));

    const tabIndex = computed<-1 | 0>(() =>
      isDisabled.value || (isGroup.value && !isChecked.value) ? -1 : 0
    );

    const labelClass = computed<ClassValue>(
      () => `q-radio__label_size_${props.labelSize ?? 'regular'}`
    );

    const handleSpaceKeyUp = (): void => {
      if (isGroup.value) return;

      ctx.emit('change', props.value);
    };

    const handleChange = (): void => {
      /**
       * triggers when the value changes
       */
      ctx.emit('change', props.value);

      if (isGroup.value) {
        qRadioGroup?.changeValue(props.value);
      }
    };

    return {
      isChecked,
      isDisabled,
      wrapClass,
      tabIndex,
      handleSpaceKeyUp,
      handleChange,
      labelClass
    };
  }
});
</script>

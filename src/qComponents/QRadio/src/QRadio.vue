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
      @keydown.stop
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';

import type { QFormProvider } from '@/qComponents/QForm';
import type { QRadioGroupProvider } from '@/qComponents/QRadioGroup';
import type { QRadioProps } from './types';

const CHANGE_EVENT = 'change';

export default defineComponent({
  name: 'QRadio',
  componentName: 'QRadio',

  inheritAttrs: false,

  props: {
    /**
     * the value of Radio label
     */
    label: { type: String, default: '' },
    /**
     * binding value
     */
    value: { type: [String, Number, Boolean], default: '' },
    checked: { type: Boolean, default: false },
    /**
     * whether Radio is disabled
     */
    disabled: { type: Boolean, default: false }
  },

  emits: [CHANGE_EVENT],

  setup(props: QRadioProps, ctx) {
    const qForm = inject<QFormProvider | null>('qForm', null);
    const qRadioGroup = inject<QRadioGroupProvider | null>('qRadioGroup', null);

    const isGroup = computed<boolean>(() => Boolean(qRadioGroup));

    const isChecked = computed<boolean>(() =>
      isGroup.value
        ? qRadioGroup?.modelValue.value === props.value
        : Boolean(props.checked)
    );

    const isDisabled = computed<boolean>(
      () =>
        props.disabled ||
        (qForm?.disabled ?? false) ||
        (qRadioGroup?.disabled.value ?? false)
    );

    const wrapClass = computed<Record<string, boolean>>(() => ({
      'q-radio_disabled': isDisabled.value,
      'q-radio_checked': isChecked.value
    }));

    const tabIndex = computed<-1 | 0>(() =>
      isDisabled.value || (isGroup.value && !isChecked.value) ? -1 : 0
    );

    const handleSpaceKeyUp = (): void => {
      if (isGroup.value) return;

      ctx.emit(CHANGE_EVENT, props.value);
    };

    const handleChange = (): void => {
      /**
       * triggers when the value changes
       */
      ctx.emit(CHANGE_EVENT, props.value);

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
      handleChange
    };
  }
});
</script>

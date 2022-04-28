<template>
  <label
    class="q-switch"
    :class="classes"
    :tabindex="tabIndex"
    :aria-disabled="isDisabled"
    @keyup.enter="handleKeyUp"
    @keyup.space.prevent="handleKeyUp"
    @click.prevent="handleSwitcherClick"
  >
    <input
      class="q-switch__checkbox"
      type="checkbox"
      :checked="isChecked"
      tabindex="-1"
    />
    <div class="q-switch__wrapper">
      <div class="q-switch__handle">
        <div
          v-if="loading"
          class="q-icon-reverse"
        />
      </div>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed, inject, watch } from 'vue';

import type { QFormItemProvider, QFormProvider } from '@/qComponents';
import type { ClassValue, Nullable } from '#/helpers';

import type { QSwitchProps, QSwitchInstance } from './types';

export default /* #__PURE__ */ defineComponent({
  name: 'QSwitch',
  componentName: 'QSwitch',

  props: {
    /**
     * default to v-model
     */
    modelValue: {
      type: [Boolean, String, Number],
      default: false
    },
    /**
     * value for active QSwitch state
     */
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    /**
     * value for inactive QSwitch state
     */
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    /**
     * whether QSwitch is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether to show loader inside the QSwitch
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * validate parent form if present
     */
    validateEvent: {
      type: Boolean,
      default: true
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
    'change'
  ],

  setup(props: QSwitchProps, ctx): QSwitchInstance {
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);

    const isChecked = computed<boolean>(
      () => props.modelValue === props.activeValue
    );

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const tabIndex = computed<-1 | 0>(() => (props.disabled ? -1 : 0));

    const classes = computed<ClassValue>(() => ({
      'q-switch_active': isChecked.value,
      'q-switch_disabled': isDisabled.value,
      'q-switch_loading': Boolean(props.loading)
    }));

    const emitChange = (): void => {
      if (props.disabled || props.loading) return;

      if (isChecked.value) {
        ctx.emit('update:modelValue', props.inactiveValue);
        ctx.emit('change', props.inactiveValue);
        return;
      }

      ctx.emit('update:modelValue', props.activeValue);
      ctx.emit('change', props.activeValue);
    };

    const handleSwitcherClick = (): void => {
      emitChange();
    };

    const handleKeyUp = (): void => {
      emitChange();
    };

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) qFormItem?.validateField('change');
      }
    );

    return {
      isChecked,
      tabIndex,
      classes,
      isDisabled,
      handleKeyUp,
      handleSwitcherClick
    };
  }
});
</script>

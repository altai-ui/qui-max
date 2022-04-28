<template>
  <label
    class="q-switcher"
    :class="classes"
    :tabindex="tabIndex"
    :aria-disabled="isDisabled"
    @keyup.enter="handleKeyUp"
    @keyup.space.prevent="handleKeyUp"
    @click.prevent="handleSwitcherClick"
  >
    <input
      v-bind="$attrs"
      class="q-switcher__checkbox"
      type="checkbox"
      :checked="isChecked"
      tabindex="-1"
    />
    <div class="q-switcher__wrapper">
      <div class="q-switcher__slider">
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

import type { QSwitcherInstance, QSwitcherProps } from './types';

export default /* #__PURE__ */ defineComponent({
  name: 'QSwitcher',
  componentName: 'QSwitcher',

  props: {
    /**
     * default to v-model
     */
    modelValue: {
      type: [Boolean, String, Number],
      default: false
    },
    /**
     * value for active QSwitcher state
     */
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    /**
     * value for inactive QSwitcher state
     */
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    /**
     * whether QSwitcher is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether to show loader inside the slider
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

  setup(props: QSwitcherProps, ctx): QSwitcherInstance {
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
      'q-switcher_active': isChecked.value,
      'q-switcher_disabled': isDisabled.value,
      'q-switcher_loading': Boolean(props.loading)
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

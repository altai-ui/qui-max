<template>
  <div
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
      <div class="q-switcher__slider" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, inject, watch } from 'vue';

import type { QFormItemProvider, QFormProvider } from '@/qComponents';
import type { ClassValue, Nullable } from '#/helpers';

export default /* #__PURE__ */ defineComponent({
  name: 'QSwitcher',
  componentName: 'QSwitcher',

  // TODO: комменты к пропсам
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      required: true
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },

  emits: ['update:modelValue', 'change'],

  // TODO: типизация
  setup(props, ctx) {
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);

    const label = ref(null);

    const isChecked = computed<boolean>(
      () => props.modelValue === props.activeValue
    );

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const tabIndex = computed<-1 | 0>(() => (props.disabled ? -1 : 0));

    const classes = computed<ClassValue>(() => ({
      'q-switcher_active': isChecked.value,
      'q-switcher_disabled': isDisabled.value
    }));

    const emitChange = (): void => {
      if (props.disabled) return;

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
      label,
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

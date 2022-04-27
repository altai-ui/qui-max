<template>
  <label
    class="q-switcher"
    :class="classes"
    :tabindex="tabIndex"
    :aria-disabled="disabled"
    @keyup.enter="handleKeyUp"
    @keyup.space="handleKeyUp"
  >
    <input
      v-bind="$attrs"
      class="q-switcher__checkbox"
      type="checkbox"
      :checked="isChecked"
      @change="handleCheckboxChange"
    />
    <div class="q-switcher__wrapper">
      <div class="q-switcher__circle" />
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import type { ClassValue } from '#/helpers';

export default /* #__PURE__ */ defineComponent({
  name: 'QSwitcher',

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

  emits: ['update:modelValue'],

  // TODO: типизация
  setup(props, ctx) {
    const isChecked = computed<boolean>(
      () => props.modelValue === props.activeValue
    );

    const emitChange = (): void => {
      if (props.disabled) return;

      if (isChecked.value) {
        ctx.emit('update:modelValue', props.inactiveValue);
        return;
      }

      ctx.emit('update:modelValue', props.activeValue);
    };

    const handleCheckboxChange = (): void => {
      emitChange();
    };

    const handleKeyUp = (): void => {
      emitChange();
    };

    const tabIndex = computed<-1 | 0>(() => (props.disabled ? -1 : 0));

    const classes = computed<ClassValue>(() => ({
      'q-switcher_active': isChecked.value,
      'q-switcher_disabled': props.disabled
    }));

    return {
      isChecked,
      tabIndex,
      classes,
      handleKeyUp,
      handleCheckboxChange
    };
  }
});
</script>

<template>
  <button
    class="q-button"
    :disabled="isDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="classList"
  >
    <span
      v-if="loading"
      class="q-icon-reverse"
    />
    <span
      v-if="icon && !loading"
      :class="icon"
    />
    <span
      v-if="$slots.default"
      class="q-button__inner"
    >
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, inject } from 'vue';

import { QFormProvider } from '@/qComponents/QForm';
import type {
  QButtonProps,
  QButtonPropType,
  QButtonPropTheme,
  QButtonPropSize
} from './types';

export default defineComponent({
  name: 'QButton',
  componentName: 'QButton',

  props: {
    type: {
      type: String as PropType<QButtonPropType>,
      default: 'default',
      validator: (value: string): boolean => ['default', 'icon'].includes(value)
    },
    theme: {
      type: String as PropType<QButtonPropTheme>,
      default: 'primary',
      validator: (value: string): boolean =>
        ['primary', 'secondary', 'link'].includes(value)
    },
    size: {
      type: String as PropType<QButtonPropSize>,
      default: 'medium',
      validator: (value: string): boolean => ['small', 'medium'].includes(value)
    },
    /**
     * any q-icon
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * as native button type
     */
    nativeType: {
      type: String,
      default: 'button'
    },
    /**
     * whether to show loader inside button
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * whether the button is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * as native button autofocus
     */
    autofocus: {
      type: Boolean,
      default: false
    },
    /**
     * change button's shape to circle (use with type icon)
     */
    circle: {
      type: Boolean,
      default: false
    },
    /**
     * sets button width to 100%
     */
    fullWidth: {
      type: Boolean,
      default: false
    }
  },

  setup(props: QButtonProps) {
    const qForm = inject<QFormProvider | null>('qForm', null);

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled ?? false)
    );

    const classList = computed<(string | Record<string, boolean>)[]>(() => {
      const classes: (string | Record<string, boolean>)[] = Object.entries({
        theme: props.theme,
        type: props.type,
        size: props.size
      })
        .filter(([, value]) => Boolean(value))
        .map(([key, value]) => `q-button_${key}_${value}`);

      classes.push({
        'q-button_disabled': isDisabled.value,
        'q-button_loading': Boolean(props.loading),
        'q-button_circle': Boolean(props.circle),
        'q-button_full-width': Boolean(props.fullWidth)
      });

      return classes;
    });

    return {
      classList,
      isDisabled
    };
  }
});
</script>

<template>
  <button
    class="q-button"
    :disabled="isDisabled || isLoading"
    :autofocus="Boolean(autofocus)"
    :type="nativeType ?? 'button'"
    :class="classList"
  >
    <span
      v-if="isLoading"
      class="q-button__spinner-icon q-icon-reverse"
    />
    <span
      v-else-if="icon"
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
import { defineComponent, computed, inject } from 'vue';
import type { PropType } from 'vue';

import { validateArray } from '@/qComponents/helpers';
import type { QFormProvider } from '@/qComponents/QForm';

import type { Nullable, ClassValue } from '#/helpers';

import type {
  QButtonProps,
  QButtonPropType,
  QButtonPropTheme,
  QButtonPropSize,
  QButtonPropIcon,
  QButtonPropNativeType,
  QButtonPropLoading,
  QButtonPropDisabled,
  QButtonPropAutofocus,
  QButtonPropCircle,
  QButtonPropFullWidth,
  QButtonInstance
} from './types';

const defaultPropTypeValue = 'default';
const defaultPropThemeValue = 'primary';
const defaultPropSizeValue = 'medium';

export default defineComponent({
  name: 'QButton',

  componentName: 'QButton',

  props: {
    type: {
      type: String as PropType<QButtonPropType>,
      default: defaultPropTypeValue,
      validator: validateArray<QButtonPropType>(['default', 'icon'])
    },

    theme: {
      type: String as PropType<QButtonPropTheme>,
      default: defaultPropThemeValue,
      validator: validateArray<QButtonPropTheme>([
        'primary',
        'secondary',
        'link'
      ])
    },

    size: {
      type: String as PropType<QButtonPropSize>,
      default: defaultPropSizeValue,
      validator: validateArray<QButtonPropSize>(['small', 'medium'])
    },

    /**
     * any q-icon
     */
    icon: {
      type: String as PropType<QButtonPropIcon>,
      default: null
    },

    /**
     * as native button type
     */
    nativeType: {
      type: String as PropType<QButtonPropNativeType>,
      default: 'button',
      validator: validateArray<QButtonPropNativeType>([
        'button',
        'submit',
        'reset'
      ])
    },

    /**
     * whether to show loader inside button
     */
    loading: {
      type: Boolean as PropType<QButtonPropLoading>,
      default: false
    },

    /**
     * whether the button is disabled
     */
    disabled: {
      type: Boolean as PropType<QButtonPropDisabled>,
      default: false
    },

    /**
     * as native button autofocus
     */
    autofocus: {
      type: Boolean as PropType<QButtonPropAutofocus>,
      default: false
    },

    /**
     * change button's shape to circle (use with type icon)
     */
    circle: {
      type: Boolean as PropType<QButtonPropCircle>,
      default: false
    },

    /**
     * sets button width to 100%
     */
    fullWidth: {
      type: Boolean as PropType<QButtonPropFullWidth>,
      default: false
    }
  },

  setup(props: QButtonProps): QButtonInstance {
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const isLoading = computed<boolean>(() => Boolean(props.loading));

    const isIconType = computed<boolean>(() => props.type === 'icon');

    const isCircle = computed<boolean>(
      () => Boolean(props.circle) && isIconType.value
    );

    const classList = computed<ClassValue[]>(() => {
      const classes: ClassValue[] = Object.entries({
        theme: props.theme ?? defaultPropThemeValue,
        type: props.type ?? defaultPropTypeValue,
        size: props.size ?? defaultPropSizeValue
      })
        .filter(([, value]) => Boolean(value))
        .map(([key, value]) => `q-button_${key}_${value}`);

      classes.push({
        'q-button_disabled': isDisabled.value && !isLoading.value,
        'q-button_loading': isLoading.value,
        'q-button_circle': isCircle.value,
        'q-button_full-width': Boolean(props.fullWidth) && !isCircle.value
      });

      return classes;
    });

    return {
      isDisabled,
      isLoading,
      classList
    };
  }
});
</script>

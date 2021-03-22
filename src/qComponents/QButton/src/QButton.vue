<template>
  <button
    class="q-button"
    :disabled="isButtonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="classes"
    @click="handleClick"
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
import { defineComponent, reactive, computed, inject } from 'vue';
import QFormProvider from '../../QForm';

export default defineComponent({
  name: 'QButton',
  componentName: 'QButton',

  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value: string) => ['default', 'icon'].includes(value)
    },
    theme: {
      type: String,
      default: 'primary',
      validator: (value: string) =>
        ['primary', 'secondary', 'link'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium'].includes(value)
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

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);
    const qForm = inject<typeof QFormProvider | null>('qForm', null);
    
    const isButtonDisabled = computed(() => {
      return props.disabled || (qForm?.disabled ?? false)
    })

    function handleClick(event: MouseEvent): void {
      emit('click', event);      
    }

    return {
      classes: computed(() => {
        const classes: Array<string | any> = Object.entries({
          theme: props.theme,
          type: props.type,
          size: props.size
        })
          .filter(([, value]) => Boolean(value))
          .map(([key, value]) => `q-button_${key}_${value}`);

        classes.push({
          'q-button_disabled': isButtonDisabled.value,
          'q-button_loading': props.loading,
          'q-button_circle': props.circle,
          'q-button_full-width': props.fullWidth
        });
        return classes;
      }),
      isButtonDisabled,
      handleClick
    };
  },

});
</script>
